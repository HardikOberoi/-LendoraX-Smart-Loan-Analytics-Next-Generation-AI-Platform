import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Database, Clock, ToggleLeft, ToggleRight, Upload } from 'lucide-react';

interface DataSourceBannerProps {
  isUsingDemoData: boolean;
  onToggle?: () => void;
  showToggle?: boolean;
  lastSync?: string;
  hasUserData?: boolean;
}

export const DataSourceBanner = ({ 
  isUsingDemoData, 
  onToggle, 
  showToggle = true,
  lastSync = "5 minutes ago",
  hasUserData = false 
}: DataSourceBannerProps) => {
  if (isUsingDemoData) {
    return (
      <Alert className="border-warning/50 bg-warning/5">
        <Database className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <span className="font-medium">Using demo data from Kaggle Loan Approval Dataset</span>
            <Badge variant="outline" className="text-warning border-warning/50">
              Demo Data
            </Badge>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Last synced: {lastSync}</span>
            </div>
          </div>
          {showToggle && hasUserData && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onToggle}
              className="flex items-center space-x-2"
            >
              <ToggleLeft className="h-4 w-4" />
              <span>Switch to Your Data</span>
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-success/50 bg-success/5">
      <Database className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <span className="font-medium">Using your uploaded data</span>
          <Badge variant="outline" className="text-success border-success/50">
            User Data
          </Badge>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Last updated: {lastSync}</span>
          </div>
        </div>
        {showToggle && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggle}
            className="flex items-center space-x-2"
          >
            <ToggleRight className="h-4 w-4" />
            <span>Switch to Demo Data</span>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export const EmptyDataState = ({ onUpload }: { onUpload?: () => void }) => {
  return (
    <Card className="shadow-soft">
      <CardContent className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Your Data to Get Started</h3>
          <p className="text-muted-foreground mb-6">
            Upload your loan application data to see personalized analytics and insights. 
            Currently showing demo data for preview purposes.
          </p>
          <div className="space-y-3">
            <Button onClick={onUpload} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Data
            </Button>
            <p className="text-sm text-muted-foreground">
              Supported formats: CSV, Excel, JSON
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};