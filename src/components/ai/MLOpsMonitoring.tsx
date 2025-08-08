import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataSourceBanner, EmptyDataState } from '@/components/ui/data-source-banner';
import { 
  Activity, 
  TrendingUp, 
  GitBranch, 
  Server, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Settings,
  BarChart3,
  Target,
  RefreshCw
} from 'lucide-react';

const MLOpsMonitoring = () => {
  const [isUsingDemoData, setIsUsingDemoData] = useState(true);
  const [hasUserData] = useState(false);
  const modelVersions = [
    {
      version: 'v2.1.3',
      status: 'production',
      accuracy: 94.2,
      deployedDate: '2024-01-15',
      traffic: 100,
      description: 'Current production model with bias mitigation'
    },
    {
      version: 'v2.1.4',
      status: 'staging',
      accuracy: 94.8,
      deployedDate: '2024-01-20',
      traffic: 0,
      description: 'Enhanced model with improved fairness metrics'
    },
    {
      version: 'v2.1.2',
      status: 'archived',
      accuracy: 93.1,
      deployedDate: '2024-01-10',
      traffic: 0,
      description: 'Previous production version'
    }
  ];

  const performanceMetrics = [
    { metric: 'Accuracy', current: 94.2, target: 94.0, trend: 'up', change: '+0.3%' },
    { metric: 'Precision', current: 92.8, target: 92.0, trend: 'up', change: '+1.2%' },
    { metric: 'Recall', current: 95.1, target: 94.0, trend: 'up', change: '+0.8%' },
    { metric: 'F1 Score', current: 93.9, target: 93.0, trend: 'up', change: '+0.5%' },
    { metric: 'Latency (ms)', current: 23, target: 50, trend: 'down', change: '-8.2%' },
    { metric: 'Throughput (req/s)', current: 847, target: 800, trend: 'up', change: '+5.9%' }
  ];

  const driftMetrics = [
    { 
      type: 'Data Drift', 
      status: 'normal', 
      score: 0.02, 
      threshold: 0.05,
      description: 'Input feature distributions stable'
    },
    { 
      type: 'Concept Drift', 
      status: 'normal', 
      score: 0.01, 
      threshold: 0.03,
      description: 'Target variable relationship unchanged'
    },
    { 
      type: 'Performance Drift', 
      status: 'monitoring', 
      score: 0.04, 
      threshold: 0.05,
      description: 'Model performance within expected range'
    }
  ];

  const infrastructure = [
    { 
      component: 'API Gateway', 
      status: 'healthy', 
      uptime: 99.9, 
      latency: '12ms',
      description: 'Load balancing and rate limiting'
    },
    { 
      component: 'Model Servers', 
      status: 'healthy', 
      uptime: 99.8, 
      latency: '23ms',
      description: '3 instances running behind load balancer'
    },
    { 
      component: 'Feature Store', 
      status: 'healthy', 
      uptime: 99.7, 
      latency: '8ms',
      description: 'Redis-backed feature caching'
    },
    { 
      component: 'Monitoring Stack', 
      status: 'healthy', 
      uptime: 100.0, 
      latency: '45ms',
      description: 'Prometheus + Grafana monitoring'
    }
  ];

  const abTests = [
    {
      name: 'Bias Mitigation v2.1.4',
      status: 'running',
      traffic: '20%',
      startDate: '2024-01-18',
      metric: 'Fairness Score',
      control: 97.8,
      variant: 98.4,
      significance: 0.95
    },
    {
      name: 'Feature Engineering Update',
      status: 'completed',
      traffic: '50%',
      startDate: '2024-01-10',
      metric: 'Accuracy',
      control: 93.8,
      variant: 94.2,
      significance: 0.99
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production':
      case 'healthy':
      case 'normal':
        return 'text-success';
      case 'staging':
      case 'monitoring':
        return 'text-warning';
      case 'archived':
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'production':
      case 'healthy':
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'staging':
      case 'monitoring':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Activity className="h-4 w-4" />;
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

      <Card className="shadow-soft">
        <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Server className="h-5 w-5" />
          <span>MLOps Monitoring & Deployment</span>
        </CardTitle>
        <CardDescription>
          Comprehensive monitoring of model performance, infrastructure, and deployment pipeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="drift">Drift Detection</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <div className={`text-xs font-semibold ${
                        metric.trend === 'up' ? 'text-success' : 'text-primary'
                      }`}>
                        {metric.change}
                      </div>
                    </div>
                    
                    <div className="text-2xl font-bold mb-2">{metric.current}
                      {metric.metric === 'Latency (ms)' ? 'ms' : 
                       metric.metric === 'Throughput (req/s)' ? '/s' : '%'}
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-2">
                      Target: {metric.target}
                      {metric.metric === 'Latency (ms)' ? 'ms' : 
                       metric.metric === 'Throughput (req/s)' ? '/s' : '%'}
                    </div>
                    
                    <Progress 
                      value={metric.metric === 'Latency (ms)' ? 
                        ((metric.target - metric.current) / metric.target) * 100 :
                        (metric.current / metric.target) * 100
                      } 
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Real-time Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">847</div>
                      <div className="text-sm text-muted-foreground">Requests/sec</div>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">23ms</div>
                      <div className="text-sm text-muted-foreground">Avg Latency</div>
                    </div>
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">99.8%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                    <div className="text-center p-3 bg-warning/10 rounded-lg">
                      <div className="text-2xl font-bold text-warning">0.02%</div>
                      <div className="text-sm text-muted-foreground">Error Rate</div>
                    </div>
                  </div>

                  <Alert>
                    <Activity className="h-4 w-4" />
                    <AlertDescription>
                      All performance metrics within SLA targets. System operating normally.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>SLA Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Uptime SLA (99.5%)</span>
                      <Badge variant="outline" className="text-success">Met</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Latency SLA (&lt;50ms)</span>
                      <Badge variant="outline" className="text-success">Met</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accuracy SLA (&gt;94%)</span>
                      <Badge variant="outline" className="text-success">Met</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Error Rate SLA (&lt;0.1%)</span>
                      <Badge variant="outline" className="text-warning">Warning</Badge>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">97.5%</div>
                      <div className="text-sm text-muted-foreground">Overall SLA Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="space-y-4">
              {modelVersions.map((model, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <GitBranch className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <span className="font-semibold">{model.version}</span>
                          <div className="text-sm text-muted-foreground">{model.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={
                          model.status === 'production' ? 'default' :
                          model.status === 'staging' ? 'secondary' : 'outline'
                        }>
                          {model.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm font-semibold">{model.traffic}% traffic</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-lg font-semibold">{model.accuracy}%</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-lg font-semibold">{model.deployedDate}</div>
                        <div className="text-xs text-muted-foreground">Deployed</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-lg font-semibold">{model.traffic}%</div>
                        <div className="text-xs text-muted-foreground">Traffic</div>
                      </div>
                      <div className="flex items-center justify-center">
                        {model.status === 'production' ? (
                          <Button size="sm" variant="outline">Monitor</Button>
                        ) : model.status === 'staging' ? (
                          <Button size="sm" className="gradient-primary text-white">Promote</Button>
                        ) : (
                          <Button size="sm" variant="outline">Restore</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert>
              <GitBranch className="h-4 w-4" />
              <AlertDescription>
                Model v2.1.4 ready for production deployment. A/B test shows 0.6% accuracy improvement.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="drift" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {driftMetrics.map((drift, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">{drift.type}</span>
                      {getStatusIcon(drift.status)}
                    </div>
                    
                    <div className="text-2xl font-bold mb-2">{drift.score.toFixed(3)}</div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Threshold: {drift.threshold.toFixed(3)}
                    </div>
                    
                    <Progress value={(drift.score / drift.threshold) * 100} className="mb-3" />
                    
                    <p className="text-xs text-muted-foreground">{drift.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Drift Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    All drift metrics within acceptable thresholds. Model performance remains stable.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Feature Drift Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Credit Score Distribution</span>
                        <span className="text-success">Stable</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Income Distribution</span>
                        <span className="text-success">Stable</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Age Distribution</span>
                        <span className="text-warning">Minor Shift</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Employment Type</span>
                        <span className="text-success">Stable</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Retraining Schedule</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Last Retrain:</span>
                        <span>7 days ago</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Next Scheduled:</span>
                        <span>23 days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Trigger Threshold:</span>
                        <span>0.05 drift score</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Trigger Manual Retrain
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {infrastructure.map((component, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(component.status)}
                        <span className="font-semibold">{component.component}</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(component.status)}>
                        {component.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="text-lg font-semibold">{component.uptime}%</div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="text-lg font-semibold">{component.latency}</div>
                        <div className="text-xs text-muted-foreground">Latency</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Resource Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage:</span>
                        <span className="font-semibold">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage:</span>
                        <span className="font-semibold">72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Disk Usage:</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <Progress value={45} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Network I/O:</span>
                        <span className="font-semibold">34%</span>
                      </div>
                      <Progress value={34} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>System Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Activity className="h-4 w-4 mr-2" />
                      Health Check
                    </Button>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Restart Services
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Scaling
                    </Button>
                    <Button variant="outline" className="w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Detailed Logs
                    </Button>
                  </div>

                  <Alert>
                    <Server className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      All infrastructure components healthy. Auto-scaling enabled.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="experiments" className="space-y-6">
            <div className="space-y-4">
              {abTests.map((test, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-semibold">{test.name}</span>
                        <div className="text-sm text-muted-foreground">
                          Started: {test.startDate} • Traffic: {test.traffic}
                        </div>
                      </div>
                      <Badge variant={test.status === 'running' ? 'default' : 'secondary'}>
                        {test.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-lg font-semibold">{test.metric}</div>
                        <div className="text-xs text-muted-foreground">Testing Metric</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-lg font-semibold">{test.control}</div>
                        <div className="text-xs text-muted-foreground">Control</div>
                      </div>
                      <div className="text-center p-3 bg-success/10 rounded-lg">
                        <div className="text-lg font-semibold text-success">{test.variant}</div>
                        <div className="text-xs text-muted-foreground">Variant</div>
                      </div>
                      <div className="text-center p-3 bg-primary/10 rounded-lg">
                        <div className="text-lg font-semibold text-primary">{(test.significance * 100).toFixed(0)}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <div className="flex space-x-2">
                        {test.status === 'running' ? (
                          <>
                            <Button size="sm" variant="outline">View Results</Button>
                            <Button size="sm" className="gradient-success text-white">Stop Test</Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline">View Report</Button>
                            <Button size="sm" variant="outline">Clone Test</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert>
              <Target className="h-4 w-4" />
              <AlertDescription>
                Bias Mitigation v2.1.4 test showing positive results with 98.4% fairness score vs 97.8% control.
              </AlertDescription>
            </Alert>

            <div className="flex justify-center">
              <Button className="gradient-primary text-white">
                <Zap className="h-4 w-4 mr-2" />
                Create New A/B Test
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    </div>
  );
};

export default MLOpsMonitoring;