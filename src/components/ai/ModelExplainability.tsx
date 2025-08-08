import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataSourceBanner, EmptyDataState } from '@/components/ui/data-source-banner';
import { 
  Brain, 
  Eye, 
  TrendingUp, 
  BarChart3, 
  Info, 
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';

const ModelExplainability = () => {
  const [selectedApplication, setSelectedApplication] = useState('APP-2024-001');
  const [isUsingDemoData, setIsUsingDemoData] = useState(true);
  const [hasUserData] = useState(false);
  
  const applications = [
    {
      id: 'APP-2024-001',
      decision: 'approved',
      confidence: 0.92,
      applicant: 'John Doe',
      amount: 50000,
      features: {
        credit_score: 780,
        annual_income: 85000,
        employment_type: 'full-time',
        debt_to_income: 0.32,
        loan_amount: 50000,
        employment_years: 8,
        existing_loans: 2,
        collateral: 'home'
      }
    },
    {
      id: 'APP-2024-002', 
      decision: 'rejected',
      confidence: 0.87,
      applicant: 'Jane Smith',
      amount: 75000,
      features: {
        credit_score: 620,
        annual_income: 42000,
        employment_type: 'part-time',
        debt_to_income: 0.68,
        loan_amount: 75000,
        employment_years: 2,
        existing_loans: 4,
        collateral: 'none'
      }
    },
    {
      id: 'APP-2024-003',
      decision: 'approved',
      confidence: 0.85,
      applicant: 'Michael Johnson',
      amount: 25000,
      features: {
        credit_score: 720,
        annual_income: 62000,
        employment_type: 'full-time',
        debt_to_income: 0.38,
        loan_amount: 25000,
        employment_years: 5,
        existing_loans: 1,
        collateral: 'vehicle'
      }
    },
    {
      id: 'APP-2024-004',
      decision: 'rejected',
      confidence: 0.91,
      applicant: 'Sarah Wilson',
      amount: 100000,
      features: {
        credit_score: 580,
        annual_income: 35000,
        employment_type: 'self-employed',
        debt_to_income: 0.75,
        loan_amount: 100000,
        employment_years: 1,
        existing_loans: 5,
        collateral: 'none'
      }
    },
    {
      id: 'APP-2024-005',
      decision: 'approved',
      confidence: 0.88,
      applicant: 'David Chen',
      amount: 40000,
      features: {
        credit_score: 740,
        annual_income: 78000,
        employment_type: 'full-time',
        debt_to_income: 0.35,
        loan_amount: 40000,
        employment_years: 6,
        existing_loans: 1,
        collateral: 'savings'
      }
    },
    {
      id: 'APP-2024-006',
      decision: 'rejected',
      confidence: 0.82,
      applicant: 'Lisa Garcia',
      amount: 60000,
      features: {
        credit_score: 640,
        annual_income: 45000,
        employment_type: 'part-time',
        debt_to_income: 0.62,
        loan_amount: 60000,
        employment_years: 3,
        existing_loans: 3,
        collateral: 'none'
      }
    }
  ];

  const currentApp = applications.find(app => app.id === selectedApplication);
  
  // Dynamic SHAP values based on selected application
  const getShapValues = (app: any) => {
    if (app?.decision === 'approved') {
      return [
        { feature: 'Credit Score', value: 0.34, impact: 'positive', description: `Excellent credit score (${app.features.credit_score}) strongly supports approval` },
        { feature: 'Debt-to-Income Ratio', value: 0.22, impact: 'positive', description: `Low DTI (${(app.features.debt_to_income * 100).toFixed(0)}%) indicates good financial management` },
        { feature: 'Annual Income', value: 0.18, impact: 'positive', description: `Stable income ($${app.features.annual_income.toLocaleString()}) provides repayment confidence` },
        { feature: 'Employment Stability', value: 0.12, impact: 'positive', description: `${app.features.employment_years} years employment shows job security` },
        { feature: 'Loan Amount', value: -0.08, impact: 'negative', description: `Loan amount ($${app.features.loan_amount.toLocaleString()}) increases risk slightly` },
        { feature: 'Existing Loans', value: -0.06, impact: 'negative', description: `${app.features.existing_loans} existing loans add minor risk factor` }
      ];
    } else {
      return [
        { feature: 'Credit Score', value: -0.28, impact: 'negative', description: `Low credit score (${app.features.credit_score}) indicates higher risk` },
        { feature: 'Debt-to-Income Ratio', value: -0.35, impact: 'negative', description: `High DTI (${(app.features.debt_to_income * 100).toFixed(0)}%) suggests financial strain` },
        { feature: 'Employment Type', value: -0.15, impact: 'negative', description: `${app.features.employment_type} employment increases uncertainty` },
        { feature: 'Existing Loans', value: -0.12, impact: 'negative', description: `${app.features.existing_loans} existing loans increase debt burden` },
        { feature: 'Annual Income', value: -0.08, impact: 'negative', description: `Limited income ($${app.features.annual_income.toLocaleString()}) for loan amount` },
        { feature: 'Loan Amount', value: -0.18, impact: 'negative', description: `Large loan amount ($${app.features.loan_amount.toLocaleString()}) vs income ratio` }
      ];
    }
  };

  const shapValues = getShapValues(currentApp);

  const limeExplanation = [
    { feature: 'credit_score >= 750', probability: 0.78, description: 'High credit score is strongest predictor' },
    { feature: 'debt_to_income <= 0.4', probability: 0.65, description: 'Low debt ratio supports approval' },
    { feature: 'employment_type = full-time', probability: 0.52, description: 'Stable employment reduces risk' },
    { feature: 'annual_income >= 60000', probability: 0.48, description: 'Sufficient income for repayment' }
  ];

  const counterfactuals = [
    {
      scenario: 'Minimum Requirements',
      changes: [
        'Credit Score: 720 (from 780)',
        'Income: $60,000 (from $85,000)',
        'DTI: 0.45 (from 0.32)'
      ],
      outcome: 'Still Approved',
      confidence: 0.74
    },
    {
      scenario: 'Borderline Case',
      changes: [
        'Credit Score: 650 (from 780)',
        'Employment: Part-time (from Full-time)',
        'DTI: 0.55 (from 0.32)'
      ],
      outcome: 'Rejected',
      confidence: 0.83
    }
  ];

  const modelArchitecture = {
    ensemble: [
      { model: 'Logistic Regression', weight: 0.3, accuracy: 89.2, explainability: 'High' },
      { model: 'Random Forest', weight: 0.4, accuracy: 92.7, explainability: 'Medium' },
      { model: 'XGBoost', weight: 0.3, accuracy: 94.1, explainability: 'Medium' }
    ],
    features: [
      { name: 'Credit Score', importance: 0.28, type: 'Numerical' },
      { name: 'Debt-to-Income', importance: 0.22, type: 'Numerical' },
      { name: 'Annual Income', importance: 0.18, type: 'Numerical' },
      { name: 'Employment Type', importance: 0.12, type: 'Categorical' },
      { name: 'Employment Years', importance: 0.10, type: 'Numerical' },
      { name: 'Loan Amount', importance: 0.10, type: 'Numerical' }
    ]
  };

  const handleToggleDataSource = () => {
    setIsUsingDemoData(!isUsingDemoData);
  };

  const handleUploadData = () => {
    console.log('Upload data clicked');
  };

  if (!hasUserData && !isUsingDemoData) {
    return (
      <div className="space-y-6">
        <DataSourceBanner 
          isUsingDemoData={false} 
          hasUserData={false}
          showToggle={false}
        />
        <EmptyDataState onUpload={handleUploadData} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Data Source Banner */}
      <DataSourceBanner 
        isUsingDemoData={isUsingDemoData}
        onToggle={handleToggleDataSource}
        hasUserData={hasUserData}
        lastSync="30 seconds ago"
      />

      {/* Header */}
      <Card className="gradient-tech text-white shadow-strong">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">AI Model Explainability</h2>
              <p className="text-white/90">
                Comprehensive explanations for every loan decision using SHAP, LIME, and counterfactual analysis
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-white/80">Explainable</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Selector */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Select Application to Explain</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Select value={selectedApplication} onValueChange={setSelectedApplication}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {applications.map((app) => (
                  <SelectItem key={app.id} value={app.id}>
                    {app.id} - {app.applicant} (${app.amount.toLocaleString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {currentApp && (
              <div className="flex items-center space-x-4">
                <Badge variant={currentApp.decision === 'approved' ? 'default' : 'destructive'}>
                  {currentApp.decision.toUpperCase()}
                </Badge>
                <div className="text-sm">
                  <span className="text-muted-foreground">Confidence: </span>
                  <span className="font-semibold">{(currentApp.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="shap" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="shap">SHAP Analysis</TabsTrigger>
          <TabsTrigger value="lime">LIME Explanation</TabsTrigger>
          <TabsTrigger value="counterfactual">What-If Analysis</TabsTrigger>
          <TabsTrigger value="model">Model Architecture</TabsTrigger>
          <TabsTrigger value="global">Global Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="shap" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SHAP Values */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>SHAP Feature Impact</span>
                </CardTitle>
                <CardDescription>
                  Individual feature contributions to the final decision
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {shapValues.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.feature}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-semibold ${
                          item.impact === 'positive' ? 'text-success' : 'text-destructive'
                        }`}>
                          {item.impact === 'positive' ? '+' : ''}{(item.value * 100).toFixed(1)}%
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          item.impact === 'positive' ? 'bg-success' : 'bg-destructive'
                        }`}></div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.impact === 'positive' ? 'bg-success' : 'bg-destructive'
                        }`}
                        style={{ width: `${Math.abs(item.value) * 100}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Decision Summary */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Decision Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`text-center p-6 bg-gradient-to-br ${
                  currentApp?.decision === 'approved' 
                    ? 'from-success/10 to-success/5' 
                    : 'from-destructive/10 to-destructive/5'
                } rounded-lg`}>
                  <div className={`text-3xl font-bold mb-2 ${
                    currentApp?.decision === 'approved' ? 'text-success' : 'text-destructive'
                  }`}>
                    {currentApp?.decision.toUpperCase()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Confidence: {currentApp && (currentApp.confidence * 100).toFixed(1)}%
                  </div>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {currentApp?.decision === 'approved' 
                        ? `Strong credit profile with excellent score (${currentApp.features.credit_score}) and low debt-to-income ratio (${(currentApp.features.debt_to_income * 100).toFixed(0)}%) strongly supports approval for this $${currentApp?.amount.toLocaleString()} loan.`
                        : `Risk factors including credit score (${currentApp?.features.credit_score}) and high debt-to-income ratio (${(currentApp?.features.debt_to_income * 100).toFixed(0)}%) indicate elevated risk for this $${currentApp?.amount.toLocaleString()} loan.`
                      }
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Factors:</h4>
                  <div className="space-y-2">
                    {currentApp?.decision === 'approved' ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-sm">Excellent credit score ({currentApp.features.credit_score})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-sm">Low debt-to-income ratio ({(currentApp.features.debt_to_income * 100).toFixed(0)}%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-sm">Stable employment ({currentApp.features.employment_years} years)</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          <span className="text-sm">Low credit score ({currentApp?.features.credit_score})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          <span className="text-sm">High debt-to-income ratio ({(currentApp?.features.debt_to_income * 100).toFixed(0)}%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          <span className="text-sm">High existing debt ({currentApp?.features.existing_loans} loans)</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lime" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>LIME Local Explanations</span>
              </CardTitle>
              <CardDescription>
                Local interpretable model-agnostic explanations for this specific decision
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  LIME creates a simple, interpretable model around this specific prediction to explain 
                  why the AI made this decision.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Local Feature Rules</h4>
                  {limeExplanation.map((rule, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{rule.feature}</span>
                        <span className="text-sm font-semibold text-success">
                          {(rule.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={rule.probability * 100} className="mb-2" />
                      <p className="text-xs text-muted-foreground">{rule.description}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Interpretation</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm mb-3">
                      The local linear model shows that for applications similar to this one:
                    </p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Credit score is the strongest predictor (78% confidence)</li>
                      <li>• Debt-to-income ratio is second most important</li>
                      <li>• Employment type and income level provide additional support</li>
                      <li>• No single factor would change the decision alone</li>
                    </ul>
                  </div>

                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      This explanation is specific to this application and may differ for other cases.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="counterfactual" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Counterfactual Analysis</span>
              </CardTitle>
              <CardDescription>
                What would need to change for a different decision?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Counterfactual explanations show the minimal changes needed to flip the decision, 
                  helping understand decision boundaries.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {counterfactuals.map((scenario, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{scenario.scenario}</h4>
                        <Badge variant={scenario.outcome === 'Still Approved' ? 'default' : 'destructive'}>
                          {scenario.outcome}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        {scenario.changes.map((change, changeIndex) => (
                          <div key={changeIndex} className="text-sm text-muted-foreground">
                            • {change}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Confidence:</span>
                        <span className="font-semibold">{(scenario.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-3">Key Insights:</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• This application has a strong approval profile - minor changes wouldn't affect the decision</li>
                  <li>• Credit score could drop to 720 and still maintain approval</li>
                  <li>• Multiple significant changes would be needed to result in rejection</li>
                  <li>• The model shows robust decision-making for this risk profile</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ensemble Model Composition */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Ensemble Model</span>
                </CardTitle>
                <CardDescription>
                  Weighted combination of multiple algorithms for robust predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {modelArchitecture.ensemble.map((model, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{model.model}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{model.explainability}</Badge>
                        <span className="text-sm font-semibold">{model.weight * 100}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={model.weight * 100} className="flex-1" />
                      <span className="text-sm text-muted-foreground">
                        {model.accuracy}% accuracy
                      </span>
                    </div>
                  </div>
                ))}
                
                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Ensemble approach combines interpretable and high-performance models for optimal 
                    balance of accuracy and explainability.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Feature Importance */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Global Feature Importance</span>
                </CardTitle>
                <CardDescription>
                  Overall importance of features across all decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {modelArchitecture.features.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{feature.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{feature.type}</Badge>
                        <span className="text-sm font-semibold">
                          {(feature.importance * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={feature.importance * 100} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="global" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Model Behavior Insights</CardTitle>
                <CardDescription>
                  Understanding how the AI makes decisions across all applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="font-semibold text-success mb-1">Most Important Factor</div>
                    <div className="text-sm">Credit Score accounts for 28% of all decisions</div>
                  </div>
                  
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="font-semibold text-primary mb-1">Risk Threshold</div>
                    <div className="text-sm">Model approval threshold set at 65% confidence</div>
                  </div>
                  
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <div className="font-semibold text-warning mb-1">Decision Boundary</div>
                    <div className="text-sm">Clear separation between approval/rejection cases</div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Global analysis reveals consistent, fair decision patterns across all demographic groups.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Explainability Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">100%</div>
                    <div className="text-xs text-muted-foreground">Decisions Explained</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">94.2%</div>
                    <div className="text-xs text-muted-foreground">Explanation Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">0.85</div>
                    <div className="text-xs text-muted-foreground">Stability Score</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">2.3s</div>
                    <div className="text-xs text-muted-foreground">Explanation Time</div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <Button className="w-full gradient-primary text-white">
                    Generate Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelExplainability;