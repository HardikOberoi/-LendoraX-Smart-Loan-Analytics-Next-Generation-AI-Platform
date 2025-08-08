import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LoanApplication {
  personalInfo: {
    fullName: string;
    age: number;
    employment: string;
    income: number;
    experience: number;
  };
  loanDetails: {
    amount: number;
    purpose: string;
    term: number;
    currency: string;
  };
  financialInfo: {
    creditScore: number;
    existingLoans: number;
    existingLoanDetails: Array<{ type: string; amount: number }>;
    collateral: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { application }: { application: LoanApplication } = await req.json();

    // Calculate additional metrics
    const loanToIncomeRatio = application.loanDetails.amount / (application.personalInfo.income || 1);
    const existingDebt = application.financialInfo.existingLoanDetails.reduce((sum, loan) => sum + loan.amount, 0);
    const debtToIncomeRatio = existingDebt / (application.personalInfo.income || 1);
    const monthlyPayment = (application.loanDetails.amount / application.loanDetails.term) / 12;
    const paymentToIncomeRatio = (monthlyPayment * 12) / application.personalInfo.income;

    const prompt = `
You are an expert loan underwriter with 20+ years of experience. Analyze this loan application and provide a comprehensive assessment.

APPLICATION DATA:
- Applicant: ${application.personalInfo.fullName}, Age: ${application.personalInfo.age}
- Employment: ${application.personalInfo.employment} (${application.personalInfo.experience} years experience)
- Annual Income: $${application.personalInfo.income.toLocaleString()}
- Credit Score: ${application.financialInfo.creditScore}
- Loan Amount: $${application.loanDetails.amount.toLocaleString()}
- Loan Purpose: ${application.loanDetails.purpose}
- Loan Term: ${application.loanDetails.term} months
- Existing Loans: ${application.financialInfo.existingLoans} loans totaling $${existingDebt.toLocaleString()}
- Collateral: ${application.financialInfo.collateral}

CALCULATED RATIOS:
- Loan-to-Income Ratio: ${loanToIncomeRatio.toFixed(2)}x
- Debt-to-Income Ratio: ${(debtToIncomeRatio * 100).toFixed(1)}%
- Payment-to-Income Ratio: ${(paymentToIncomeRatio * 100).toFixed(1)}%

ASSESSMENT REQUIREMENTS:
1. Provide a DECISION: "APPROVED" or "REJECTED"
2. Calculate CONFIDENCE SCORE (0-100%)
3. Calculate RISK SCORE (0-100%, where higher = more risky)
4. List KEY RISK FACTORS (positive and negative)
5. Provide detailed REASONING
6. Give specific RECOMMENDATIONS

LENDING CRITERIA:
- Credit Score: 580+ (minimum), 700+ (preferred)
- Debt-to-Income: <40% (maximum), <30% (preferred)
- Loan-to-Income: <5x (maximum), <3x (preferred)
- Payment-to-Income: <28% (maximum), <20% (preferred)
- Employment: Stable employment preferred
- Age: 18-65 for standard terms

Consider fraud indicators, income stability, industry risk, and regional economic factors.

Return ONLY a valid JSON object with this exact structure:
{
  "decision": "APPROVED" | "REJECTED",
  "confidence": number,
  "riskScore": number,
  "reasoning": "detailed explanation",
  "factors": [
    {
      "name": "factor name",
      "impact": number,
      "status": "positive" | "negative" | "neutral",
      "description": "explanation"
    }
  ],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert loan underwriter. Always respond with valid JSON only. Be thorough in risk assessment and consider all financial factors.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse the AI response
    let assessment;
    try {
      assessment = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      throw new Error('Invalid AI response format');
    }

    // Validate the response structure
    if (!assessment.decision || !assessment.confidence || !assessment.riskScore) {
      throw new Error('Incomplete AI assessment');
    }

    // Apply confidence threshold (reject if confidence < 50%)
    if (assessment.confidence < 50) {
      assessment.decision = 'REJECTED';
      assessment.reasoning = `${assessment.reasoning} Additionally, AI confidence (${assessment.confidence}%) is below the 50% threshold required for approval.`;
    }

    return new Response(JSON.stringify(assessment), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-loan-assessment function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        decision: 'REJECTED',
        confidence: 0,
        riskScore: 100,
        reasoning: 'Technical error occurred during assessment. Application rejected for safety.',
        factors: [],
        recommendations: ['Please resubmit your application', 'Contact support if the issue persists']
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});