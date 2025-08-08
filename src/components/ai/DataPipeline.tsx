import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataSourceBanner } from '@/components/ui/data-source-banner';
import { 
  Database, 
  Download, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Activity,
  Clock,
  Zap,
  Filter,
  BarChart3
} from 'lucide-react';

const DataPipeline = () => {
  const [isUsingDemoData] = useState(true);
  const pipelineStages = [
    {
      name: 'Data Ingestion',
      status: 'active',
      description: 'Real-time data collection from Kaggle API and internal systems',
      lastRun: '2 minutes ago',
      throughput: '1,247 records/hour',
      success_rate: 99.8
    },
    {
      name: 'Privacy Compliance',
      status: 'active',
      description: 'GDPR anonymization and data privacy protection',
      lastRun: '2 minutes ago',
      throughput: '1,247 records/hour',
      success_rate: 100.0
    },
    {
      name: 'Data Validation',
      status: 'active',
      description: 'Schema validation and quality checks',
      lastRun: '2 minutes ago',
      throughput: '1,205 records/hour',
      success_rate: 96.6
    },
    {
      name: 'Feature Engineering',
      status: 'active',
      description: 'Automated feature creation and transformation',
      lastRun: '3 minutes ago',
      throughput: '1,205 records/hour',
      success_rate: 98.2
    },
    {
      name: 'Bias Detection',
      status: 'active',
      description: 'Real-time bias monitoring in incoming data',
      lastRun: '1 minute ago',
      throughput: '1,205 records/hour',
      success_rate: 99.1
    },
    {
      name: 'Model Serving',
      status: 'active',
      description: 'Real-time inference and decision making',
      lastRun: '30 seconds ago',
      throughput: '1,183 decisions/hour',
      success_rate: 99.9
    }
  ];

  const dataQuality = {
    completeness: 97.8,
    accuracy: 94.2,
    consistency: 96.1,
    timeliness: 99.2,
    validity: 95.8
  };

  const dataStats = [
    { label: 'Total Records Processed', value: '2.4M', change: '+12.5%' },
    { label: 'Real-time Throughput', value: '1,247/hr', change: '+8.2%' },
    { label: 'Data Quality Score', value: '96.6%', change: '+2.1%' },
    { label: 'Pipeline Uptime', value: '99.8%', change: '+0.3%' }
  ];

  const kaggleIntegration = {
    status: 'connected',
    dataset: 'architsharma01/loan-approval-prediction-dataset',
    lastSync: '5 minutes ago',
    recordsIngested: 156847,
    dataFreshness: 'Real-time',
    version: 'v2.1.3'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Source Banner */}
      <DataSourceBanner 
        isUsingDemoData={isUsingDemoData}
        showToggle={false}
        lastSync="5 minutes ago"
      />

      <Card className="shadow-soft">
        <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Data Pipeline & Processing</span>
        </CardTitle>
        <CardDescription>
          Real-time data ingestion, processing, and quality monitoring with Kaggle API integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pipeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dataStats.map((stat, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</div>
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <span className="text-sm font-medium text-success">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kaggle API Integration */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Kaggle API Integration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="outline" className="text-success border-success">
                  <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
                  Connected
                </Badge>
                <span className="text-sm text-muted-foreground">Live data feed</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Dataset:</span>
                  <span className="font-medium">{kaggleIntegration.dataset}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Version:</span>
                  <span className="font-medium">{kaggleIntegration.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Records Ingested:</span>
                  <span className="font-medium">{kaggleIntegration.recordsIngested.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Sync:</span>
                  <span className="font-medium">{kaggleIntegration.lastSync}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Data Freshness:</span>
                  <span className="font-medium text-success">{kaggleIntegration.dataFreshness}</span>
                </div>
              </div>

              <Alert>
                <Download className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Auto-sync enabled. New data automatically processed and integrated into the pipeline.
                </AlertDescription>
              </Alert>

              <Button variant="outline" className="w-full">
                Configure Kaggle API
              </Button>
            </CardContent>
          </Card>

          {/* Data Quality Metrics */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Data Quality Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary mb-2">96.6%</div>
                <div className="text-sm text-muted-foreground">Overall Quality Score</div>
              </div>

              <div className="space-y-3">
                {Object.entries(dataQuality).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{key}:</span>
                      <span className="font-semibold">{value.toFixed(1)}%</span>
                    </div>
                    <Progress value={value} />
                  </div>
                ))}
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  All quality metrics above 94% threshold. Data is suitable for ML training and inference.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Stages */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pipeline Stages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineStages.map((stage, index) => (
              <Card key={index} className="border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    {getStatusIcon(stage.status)}
                    <span className="font-semibold">{stage.name}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{stage.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Success Rate:</span>
                      <span className="font-semibold text-success">{stage.success_rate}%</span>
                    </div>
                    <Progress value={stage.success_rate} className="h-1" />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Throughput: {stage.throughput}</span>
                      <span>Last run: {stage.lastRun}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pipeline Controls */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Pipeline Status: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Uptime: 7d 14h 23m</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Configure Filters
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Manual Trigger
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default DataPipeline;