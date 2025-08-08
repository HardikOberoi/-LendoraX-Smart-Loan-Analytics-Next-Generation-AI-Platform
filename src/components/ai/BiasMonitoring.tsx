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
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Eye,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const BiasMonitoring = () => {
  const [selectedMetric, setSelectedMetric] = useState('demographic_parity');
  const [timeRange, setTimeRange] = useState('7d');
  const [isUsingDemoData, setIsUsingDemoData] = useState(true);
  const [hasUserData] = useState(false);

  const biasMetrics = {
    demographic_parity: {
      name: 'Demographic Parity',
      description: 'Equal approval rates across protected groups',
      current: 0.02,
      threshold: 0.05,
      status: 'pass',
      trend: 'stable'
    },
    equal_opportunity: {
      name: 'Equal Opportunity',
      description: 'Equal true positive rates for qualified applicants',
      current: 0.01,
      threshold: 0.03,
      status: 'pass',
      trend: 'improving'
    },
    equalized_odds: {
      name: 'Equalized Odds',
      description: 'Equal true positive and false positive rates',
      current: 0.04,
      threshold: 0.05,
      status: 'warning',
      trend: 'monitoring'
    },
    disparate_impact: {
      name: 'Disparate Impact',
      description: 'Ratio of approval rates between groups',
      current: 0.95,
      threshold: 0.80,
      status: 'pass',
      trend: 'stable'
    }
  };

  const protectedGroups = [
    {
      attribute: 'Gender',
      groups: [
        { name: 'Male', approvalRate: 73.2, applications: 1247, approved: 913 },
        { name: 'Female', approvalRate: 71.8, applications: 1356, approved: 974 },
        { name: 'Other', approvalRate: 72.5, applications: 89, approved: 65 }
      ],
      biasScore: 0.02,
      status: 'pass'
    },
    {
      attribute: 'Age',
      groups: [
        { name: '18-30', approvalRate: 69.4, applications: 823, approved: 571 },
        { name: '31-45', approvalRate: 75.1, applications: 1134, approved: 852 },
        { name: '46-60', approvalRate: 74.8, applications: 567, approved: 424 },
        { name: '60+', approvalRate: 68.2, applications: 168, approved: 115 }
      ],
      biasScore: 0.07,
      status: 'warning'
    },
    {
      attribute: 'Ethnicity',
      groups: [
        { name: 'White', approvalRate: 73.5, applications: 1456, approved: 1070 },
        { name: 'Black', approvalRate: 71.2, applications: 487, approved: 347 },
        { name: 'Hispanic', approvalRate: 72.8, applications: 398, approved: 290 },
        { name: 'Asian', approvalRate: 74.1, applications: 351, approved: 260 }
      ],
      biasScore: 0.03,
      status: 'pass'
    },
    {
      attribute: 'Geography',
      groups: [
        { name: 'Urban', approvalRate: 73.8, applications: 1923, approved: 1419 },
        { name: 'Suburban', approvalRate: 72.1, applications: 634, approved: 457 },
        { name: 'Rural', approvalRate: 70.9, applications: 135, approved: 96 }
      ],
      biasScore: 0.03,
      status: 'pass'
    }
  ];

  const mitigationStrategies = [
    {
      strategy: 'Threshold Optimization',
      description: 'Adjust decision thresholds per group to ensure fairness',
      status: 'active',
      impact: 'Reduced bias by 23% for age groups',
      lastApplied: '2024-01-18'
    },
    {
      strategy: 'Feature Debiasing',
      description: 'Remove or transform biased features in preprocessing',
      status: 'scheduled',
      impact: 'Expected 15% bias reduction',
      lastApplied: null
    },
    {
      strategy: 'Adversarial Training',
      description: 'Train model to be invariant to protected attributes',
      status: 'testing',
      impact: 'Under evaluation in A/B test',
      lastApplied: '2024-01-15'
    }
  ];

  const alerts = [
    {
      id: 1,
      severity: 'medium',
      title: 'Age Bias Detected',
      description: 'Approval rates for 60+ age group show 5% lower rate than expected',
      timestamp: '2024-01-20 14:30',
      status: 'investigating',
      affectedGroup: 'Age: 60+',
      metric: 'Equal Opportunity'
    },
    {
      id: 2,
      severity: 'low',
      title: 'Geographic Variance',
      description: 'Minor variance in approval rates between urban and rural areas',
      timestamp: '2024-01-19 09:15',
      status: 'resolved',
      affectedGroup: 'Geography: Rural',
      metric: 'Demographic Parity'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'status-approved';
      case 'warning':
        return 'status-pending';
      case 'fail':
        return 'status-rejected';
      default:
        return '';
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
      <Card className="gradient-success text-white shadow-strong">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">AI Bias Monitoring & Mitigation</h2>
              <p className="text-white/90">
                Real-time detection and mitigation of algorithmic bias across all protected groups
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">0.02</div>
                <div className="text-white/80 text-sm">Overall Bias Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">97.8%</div>
                <div className="text-white/80 text-sm">Fairness Score</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="metrics">Fairness Metrics</TabsTrigger>
          <TabsTrigger value="groups">Protected Groups</TabsTrigger>
          <TabsTrigger value="alerts">Bias Alerts</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Metric Selector */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Metric Selection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Fairness Metric</label>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(biasMetrics).map(([key, metric]) => (
                        <SelectItem key={key} value={key}>{metric.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Time Range</label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Metrics are calculated in real-time and updated every hour.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Current Metric Details */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>{biasMetrics[selectedMetric as keyof typeof biasMetrics].name}</span>
                  </CardTitle>
                  <CardDescription>
                    {biasMetrics[selectedMetric as keyof typeof biasMetrics].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      {getStatusIcon(biasMetrics[selectedMetric as keyof typeof biasMetrics].status)}
                      <div className="text-3xl font-bold">
                        {biasMetrics[selectedMetric as keyof typeof biasMetrics].current.toFixed(3)}
                      </div>
                      <Badge variant="outline" className={getStatusColor(biasMetrics[selectedMetric as keyof typeof biasMetrics].status)}>
                        {biasMetrics[selectedMetric as keyof typeof biasMetrics].status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-4">
                      Threshold: {biasMetrics[selectedMetric as keyof typeof biasMetrics].threshold.toFixed(3)}
                    </div>
                    
                    <Progress 
                      value={(biasMetrics[selectedMetric as keyof typeof biasMetrics].current / biasMetrics[selectedMetric as keyof typeof biasMetrics].threshold) * 100} 
                      className="mb-4"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold text-success">Pass</div>
                      <div className="text-xs text-muted-foreground">Current Status</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold">Stable</div>
                      <div className="text-xs text-muted-foreground">7-day Trend</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold">4</div>
                      <div className="text-xs text-muted-foreground">Groups Monitored</div>
                    </div>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      This metric is well within acceptable thresholds across all protected groups.
                      Continuous monitoring ensures early detection of any bias emergence.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* All Metrics Overview */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>All Fairness Metrics Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(biasMetrics).map(([key, metric]) => (
                  <div key={key} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{metric.name}</span>
                      {getStatusIcon(metric.status)}
                    </div>
                    <div className="text-2xl font-bold mb-1">{metric.current.toFixed(3)}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Threshold: {metric.threshold.toFixed(3)}
                    </div>
                    <Progress value={(metric.current / metric.threshold) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid gap-6">
            {protectedGroups.map((group, index) => (
              <Card key={index} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>{group.attribute} Analysis</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getStatusColor(group.status)}>
                        {group.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-semibold">
                        Bias Score: {group.biasScore.toFixed(3)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {group.groups.map((subgroup, subIndex) => (
                      <div key={subIndex} className="p-4 bg-muted/50 rounded-lg">
                        <div className="font-semibold mb-2">{subgroup.name}</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Approval Rate:</span>
                            <span className="font-semibold">{subgroup.approvalRate.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Applications:</span>
                            <span>{subgroup.applications.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Approved:</span>
                            <span>{subgroup.approved.toLocaleString()}</span>
                          </div>
                          <Progress value={subgroup.approvalRate} className="mt-2" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      <strong>Analysis:</strong> {
                        group.status === 'pass' 
                          ? `Approval rates across ${group.attribute.toLowerCase()} groups show minimal variance (${group.biasScore.toFixed(3)} bias score), indicating fair treatment.`
                          : `Some variance detected in approval rates across ${group.attribute.toLowerCase()} groups. Monitoring closely for any systematic bias.`
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Alerts */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Bias Detection Alerts</span>
                  </CardTitle>
                  <CardDescription>
                    Automated alerts for potential bias in loan decisions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert) => (
                    <Card key={alert.id} className="border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <span className="font-semibold">{alert.title}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">{alert.description}</div>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Affected: {alert.affectedGroup}</span>
                              <span>Metric: {alert.metric}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{alert.timestamp}</span>
                          <Badge variant="outline" className={
                            alert.status === 'resolved' ? 'text-success' : 'text-warning'
                          }>
                            {alert.status}
                          </Badge>
                        </div>

                        <div className="mt-3 pt-3 border-t">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Apply Mitigation
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Alert Summary */}
            <div>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Alert Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-destructive/10 rounded-lg">
                      <div className="text-lg font-semibold text-destructive">0</div>
                      <div className="text-xs text-muted-foreground">High Severity</div>
                    </div>
                    <div className="text-center p-3 bg-warning/10 rounded-lg">
                      <div className="text-lg font-semibold text-warning">1</div>
                      <div className="text-xs text-muted-foreground">Medium Severity</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold">1</div>
                      <div className="text-xs text-muted-foreground">Low Severity</div>
                    </div>
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <div className="text-lg font-semibold text-success">47</div>
                      <div className="text-xs text-muted-foreground">Resolved (30d)</div>
                    </div>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Next bias audit scheduled for tomorrow at 3:00 AM.
                    </AlertDescription>
                  </Alert>

                  <Button className="w-full gradient-primary text-white">
                    Run Manual Bias Check
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mitigation Strategies */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Active Mitigation Strategies</span>
                </CardTitle>
                <CardDescription>
                  Automated and manual bias correction techniques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mitigationStrategies.map((strategy, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold">{strategy.strategy}</span>
                        <Badge variant={
                          strategy.status === 'active' ? 'default' : 
                          strategy.status === 'scheduled' ? 'secondary' : 'outline'
                        }>
                          {strategy.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Impact:</span>
                          <span className="font-medium">{strategy.impact}</span>
                        </div>
                        {strategy.lastApplied && (
                          <div className="flex justify-between text-sm">
                            <span>Last Applied:</span>
                            <span>{strategy.lastApplied}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <Button size="sm" variant="outline" className="w-full">
                          {strategy.status === 'active' ? 'Configure' : 'Activate'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Mitigation Impact */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Mitigation Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-success mb-2">23%</div>
                  <div className="text-sm text-muted-foreground">Bias Reduction (30 days)</div>
                  <Progress value={77} className="mt-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Age Bias Reduction</span>
                    <span className="font-semibold text-success">-23%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gender Parity Improvement</span>
                    <span className="font-semibold text-success">+12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Geographic Fairness</span>
                    <span className="font-semibold text-success">+8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Fairness Score</span>
                    <span className="font-semibold text-success">97.8%</span>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Mitigation strategies are working effectively. All bias metrics within acceptable ranges.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Schedule A/B Test
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export Impact Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Bias Monitoring Reports</CardTitle>
                <CardDescription>
                  Comprehensive bias analysis and compliance reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Daily Bias Monitoring Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Protected Groups Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Fairness Metrics Summary
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Bias Trend Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Alert History Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Fair Credit Reporting Act</span>
                    <Badge variant="outline" className="text-success">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Equal Credit Opportunity Act</span>
                    <Badge variant="outline" className="text-success">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>EU AI Act</span>
                    <Badge variant="outline" className="text-success">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Internal Ethics Guidelines</span>
                    <Badge variant="outline" className="text-success">Compliant</Badge>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    All bias metrics meet regulatory requirements. Next compliance audit: March 15, 2024.
                  </AlertDescription>
                </Alert>

                <Button className="w-full gradient-success text-white">
                  Generate Compliance Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BiasMonitoring;