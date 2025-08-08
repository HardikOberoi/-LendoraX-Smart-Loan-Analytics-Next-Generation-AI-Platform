import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency } from './CurrencySelector';

interface LoanCalculatorProps {
  loanAmount: number;
  loanTerm: number;
  currency: string;
  creditScore: number;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  loanAmount,
  loanTerm,
  currency,
  creditScore
}) => {
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    // Calculate interest rate based on credit score
    let rate = 3.5; // Base rate
    if (creditScore < 600) rate = 8.5;
    else if (creditScore < 650) rate = 6.5;
    else if (creditScore < 700) rate = 5.0;
    else if (creditScore < 750) rate = 4.0;
    else if (creditScore >= 750) rate = 3.2;

    setInterestRate(rate);

    // Calculate monthly payment
    if (loanAmount > 0 && loanTerm > 0) {
      const monthlyRate = rate / 100 / 12;
      const totalMonths = loanTerm * 12;
      
      if (monthlyRate > 0) {
        const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                       (Math.pow(1 + monthlyRate, totalMonths) - 1);
        setMonthlyPayment(payment);
        setTotalInterest((payment * totalMonths) - loanAmount);
      } else {
        setMonthlyPayment(loanAmount / totalMonths);
        setTotalInterest(0);
      }
    }
  }, [loanAmount, loanTerm, creditScore]);

  const getRateColor = (score: number) => {
    if (score >= 750) return 'text-success';
    if (score >= 700) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className="border shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-primary" />
          <span>Loan Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Estimated Interest Rate</Label>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getRateColor(creditScore)}>
                {interestRate.toFixed(2)}% APR
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Credit Score Impact</Label>
            <Badge variant={creditScore >= 700 ? "default" : creditScore >= 600 ? "secondary" : "destructive"}>
              {creditScore >= 700 ? "Excellent" : creditScore >= 600 ? "Good" : "Fair"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Monthly Payment</Label>
            </div>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(monthlyPayment, currency)}
            </p>
          </div>

          <div className="bg-warning/5 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-warning" />
              <Label className="text-sm font-medium">Total Interest</Label>
            </div>
            <p className="text-2xl font-bold text-warning">
              {formatCurrency(totalInterest, currency)}
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Total Amount</Label>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(loanAmount + totalInterest, currency)}
            </p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground pt-2 border-t">
          * Rates are estimates based on credit score. Actual rates may vary based on additional factors.
        </div>
      </CardContent>
    </Card>
  );
};