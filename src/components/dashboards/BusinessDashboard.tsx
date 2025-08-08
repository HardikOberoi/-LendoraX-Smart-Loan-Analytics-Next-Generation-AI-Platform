import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataSourceBanner, EmptyDataState } from '@/components/ui/data-source-banner';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  Target, 
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const BusinessDashboard = () => {
  const [isUsingDemoData, setIsUsingDemoData] = useState(true);
  const [hasUserData] = useState(false);
  const kpis = [
    { 
      label: 'Total Loan Volume', 
      value: '$12.8M', 
      change: '+23.5%', 
      trend: 'up',
      description: 'This month' 
    },
    { 
      label: 'Approval Rate', 
      value: '73.2%', 
      change: '+5.1%', 
      trend: 'up',
      description: 'AI automation impact' 
    },
    { 
      label: 'Avg Decision Time', 
      value: '2.3s', 
      change: '-67.2%', 
      trend: 'up',
      description: 'vs manual process' 
    },
    { 
      label: 'Default Rate', 
      value: '2.1%', 
      change: '-0.8%', 
      trend: 'up',
      description: 'Risk reduction' 
    }
  ];

  const loanTypes = [
    { type: 'Personal', volume: 4200000, count: 847, avgAmount: 4962 },
    { type: 'Auto', volume: 3800000, count: 423, avgAmount: 8982 },
    { type: 'Home', volume: 3600000, count: 86, avgAmount: 41860 },
    { type: 'Business', volume: 1200000, count: 34, avgAmount: 35294 }
  ];

  const riskMetrics = [
    { category: 'Low Risk', percentage: 68, count: 2847, color: 'bg-success' },
    { category: 'Medium Risk', percentage: 24, count: 1004, color: 'bg-warning' },
    { category: 'High Risk', percentage: 8, count: 335, color: 'bg-destructive' }
  ];

  const monthlyTrends = [
    { month: 'Jan', applications: 1847, approvals: 1352, volume: 8400000, approvalRate: 73.2 },
    { month: 'Feb', applications: 2156, approvals: 1578, volume: 9800000, approvalRate: 73.2 },
    { month: 'Mar', applications: 2834, approvals: 2074, volume: 12800000, approvalRate: 73.2 },
    { month: 'Apr', applications: 2654, approvals: 1986, volume: 14200000, approvalRate: 74.8 },
    { month: 'May', applications: 2891, approvals: 2145, volume: 15100000, approvalRate: 74.2 },
    { month: 'Jun', applications: 3124, approvals: 2287, volume: 16800000, approvalRate: 73.2 }
  ];

  const handleToggleDataSource = () => {
    setIsUsingDemoData(!isUsingDemoData);
  };

  const handleUploadData = () => {
    // Handle data upload logic here
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
        lastSync="3 minutes ago"
      />

      {/* Header */}
      <Card className="gradient-warning text-white shadow-strong">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Business Intelligence Dashboard</h2>
              <p className="text-white/90">
                Real-time analytics and performance metrics for AI-powered loan decisions
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">$12.8M</div>
              <div className="text-white/80">Monthly Volume</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="shadow-soft transition-smooth hover:shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-muted-foreground">{kpi.label}</div>
                <div className={`p-1 rounded-full ${
                  kpi.trend === 'up' ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-success" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-destructive" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-muted-foreground">{kpi.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Portfolio Breakdown */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Loan Portfolio Breakdown</span>
                </CardTitle>
                <CardDescription>
                  Distribution by loan type and volume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loanTypes.map((loan, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <div>
                        <div className="font-medium">{loan.type} Loans</div>
                        <div className="text-sm text-muted-foreground">
                          {loan.count} applications
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${(loan.volume / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Avg: ${loan.avgAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Risk Distribution</span>
                </CardTitle>
                <CardDescription>
                  Portfolio risk categorization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskMetrics.map((risk, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{risk.category}</span>
                      <span className="text-sm font-semibold">{risk.percentage}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={risk.percentage} 
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground">
                        {risk.count} loans
                      </span>
                    </div>
                  </div>
                ))}
                
                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    68% of portfolio classified as low risk - well within target parameters.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Performance Metrics */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>AI Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">94.2%</div>
                  <div className="text-sm text-muted-foreground">Model Accuracy</div>
                  <Progress value={94.2} className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">2.3s</div>
                    <div className="text-xs text-muted-foreground">Avg Decision</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">99.1%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                </div>

                <Alert>
                  <Activity className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    AI system processing 847 applications per day with 94.2% accuracy.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Operational Efficiency */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Efficiency Gains</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Processing Speed</span>
                    <span className="font-semibold text-success">+2,847%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cost Reduction</span>
                    <span className="font-semibold text-success">-78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Human Hours Saved</span>
                    <span className="font-semibold text-success">1,847/month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error Rate</span>
                    <span className="font-semibold text-success">-94%</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">$2.4M</div>
                    <div className="text-sm text-muted-foreground">Annual Savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Satisfaction */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Customer Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">4.8★</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                  <Progress value={96} className="mt-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Speed Satisfaction</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Process Clarity</span>
                    <span className="font-semibold">96%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Fair Treatment</span>
                    <span className="font-semibold">97%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Risk Assessment Accuracy</CardTitle>
                <CardDescription>
                  AI model performance in risk prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-lg font-semibold text-success">97.2%</div>
                    <div className="text-xs text-muted-foreground">Low Risk Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-warning/10 rounded-lg">
                    <div className="text-lg font-semibold text-warning">89.8%</div>
                    <div className="text-xs text-muted-foreground">Medium Risk Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-destructive/10 rounded-lg">
                    <div className="text-lg font-semibold text-destructive">94.1%</div>
                    <div className="text-xs text-muted-foreground">High Risk Accuracy</div>
                  </div>
                </div>

                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    Risk prediction accuracy has improved 23% since AI implementation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Portfolio Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Current Default Rate</span>
                    <span className="font-semibold text-success">2.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Industry Average</span>
                    <span className="font-semibold text-muted-foreground">3.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Risk-Adjusted Return</span>
                    <span className="font-semibold text-primary">8.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Portfolio Diversification</span>
                    <span className="font-semibold text-success">Optimal</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">$847K</div>
                    <div className="text-sm text-muted-foreground">Risk-Prevented Losses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Monthly Performance Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold">{month.month} 2024</div>
                      <div className="text-sm text-muted-foreground">
                        {month.approvalRate.toFixed(1)}% approval rate
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Applications</div>
                        <div className="text-lg font-semibold">{month.applications.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Approvals</div>
                        <div className="text-lg font-semibold">{month.approvals.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Volume</div>
                        <div className="text-lg font-semibold">
                          ${(month.volume / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default BusinessDashboard;