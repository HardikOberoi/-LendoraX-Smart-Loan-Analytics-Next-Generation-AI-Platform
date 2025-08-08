import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataSourceBanner, EmptyDataState } from '@/components/ui/data-source-banner';
import { 
  Target, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Briefcase,
  DollarSign,
  BarChart3,
  Activity,
  Zap,
  CheckCircle
} from 'lucide-react';

const RiskAssessmentDashboard = () => {
  const [isUsingDemoData, setIsUsingDemoData] = useState(true);
  const [hasUserData] = useState(false);

  const portfolioMetrics = [
    { label: 'Default Rate', value: '2.1%', target: '<3%', status: 'good' },
    { label: 'Loss Given Default', value: '45%', target: '<50%', status: 'good' },
    { label: 'Exposure at Default', value: '$12.3M', target: '<$15M', status: 'good' },
    { label: 'Risk-Adjusted Return', value: '8.7%', target: '>8%', status: 'excellent' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'default';
      case 'good':
        return 'secondary';
      case 'moderate':
        return 'outline';
      default:
        return 'destructive';
    }
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
        lastSync="1 minute ago"
      />

      {/* Header */}
      <Card className="gradient-warning text-white shadow-strong">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Advanced Risk Assessment</h2>
              <p className="text-white/90">
                AI-powered risk scoring with portfolio management capabilities
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold">76</div>
                <div className="text-white/80 text-sm">Risk Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">2.1%</div>
                <div className="text-white/80 text-sm">Default Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">$12.3M</div>
                <div className="text-white/80 text-sm">Exposure</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="scoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scoring">AI Risk Scoring</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Management</TabsTrigger>
        </TabsList>

        <TabsContent value="scoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>AI Risk Scoring Model</CardTitle>
                <CardDescription>
                  Advanced machine learning model for real-time risk assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Credit Score Weight</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <Progress value={35} />
                  
                  <div className="flex justify-between items-center">
                    <span>Income Stability</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <Progress value={25} />
                  
                  <div className="flex justify-between items-center">
                    <span>Debt-to-Income Ratio</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <Progress value={20} />
                  
                  <div className="flex justify-between items-center">
                    <span>Payment History</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <Progress value={15} />
                  
                  <div className="flex justify-between items-center">
                    <span>Market Conditions</span>
                    <span className="font-semibold">5%</span>
                  </div>
                  <Progress value={5} />
                </div>
                
                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    Model accuracy: 94.2% | Last updated: 2 hours ago
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Risk Threshold Management</CardTitle>
                <CardDescription>
                  Configure risk acceptance levels and automatic decision rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Low Risk (85-100)</span>
                      <Badge variant="default" className="bg-success text-white">Auto Approve</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Automatic approval with standard terms
                    </div>
                  </div>
                  
                  <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Medium Risk (60-84)</span>
                      <Badge variant="outline" className="border-warning text-warning">Manual Review</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Requires underwriter approval with adjusted terms
                    </div>
                  </div>
                  
                  <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">High Risk (0-59)</span>
                      <Badge variant="destructive">Auto Reject</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Automatic rejection with appeal process option
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Portfolio Risk Distribution</span>
              </CardTitle>
              <CardDescription>
                Comprehensive view of risk across the entire loan portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">By Risk Level</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Low Risk</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span>Medium Risk</span>
                      <span className="font-semibold">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span>High Risk</span>
                      <span className="font-semibold">7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">By Loan Type</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Personal</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span>Business</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span>Mortgage</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Geographic Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Urban</span>
                      <span className="font-semibold">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span>Suburban</span>
                      <span className="font-semibold">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span>Rural</span>
                      <span className="font-semibold">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                {portfolioMetrics.map((metric, index) => (
                  <Card key={index} className="shadow-soft">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <Badge variant={getStatusBadge(metric.status)} className="text-xs">
                          {metric.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAssessmentDashboard;