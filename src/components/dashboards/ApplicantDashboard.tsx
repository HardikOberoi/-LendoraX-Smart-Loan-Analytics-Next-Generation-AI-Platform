import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Clock, FileText, CreditCard, AlertCircle, TrendingUp, User, Calendar } from 'lucide-react';

interface ApplicantDashboardProps {
  session: Session;
}

const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({ session }) => {
  const [profile, setProfile] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [session]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      // Fetch loan applications
      const { data: applicationsData } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      setProfile(profileData);
      setApplications(applicationsData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const creditProfile = {
    score: profile?.credit_score || 650,
    factors: [
      { name: 'Payment History', score: 95, impact: 'Excellent' },
      { name: 'Credit Utilization', score: 20, impact: 'Excellent' },
      { name: 'Credit Age', score: 85, impact: 'Good' },
      { name: 'Credit Mix', score: 75, impact: 'Good' },
      { name: 'New Credit', score: 90, impact: 'Excellent' }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="gradient-primary text-white shadow-strong">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {profile?.first_name} {profile?.last_name}
              </h2>
              <p className="text-white/90">
                Manage your loan applications and track your credit profile
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{creditProfile.score}</div>
              <div className="text-white/80">Credit Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Your Applications</span>
              </CardTitle>
              <CardDescription>
                Track the status of your loan applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {applications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No loan applications yet</p>
                  <p className="text-sm">Start by submitting your first application</p>
                </div>
              ) : (
                applications.map((app) => (
                  <Card key={app.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(app.status)}
                          <div>
                            <div className="font-semibold">
                              {app.id?.substring(0, 8) || 'APP-' + app.id?.substring(0, 6)}
                            </div>
                            <div className="text-sm text-muted-foreground">{app.loan_purpose}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${Number(app.loan_amount).toLocaleString()}</div>
                          <Badge variant="outline" className={getStatusColor(app.status)}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      
                      <Alert className="mb-3">
                        <AlertDescription className="text-sm">
                          {app.ai_decision || app.explanation || "Application is being processed"}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Submitted: {new Date(app.created_at).toLocaleDateString()}</span>
                        {app.updated_at !== app.created_at && (
                          <span>Updated: {new Date(app.updated_at).toLocaleDateString()}</span>
                        )}
                      </div>

                      {app.status === 'approved' && (
                        <div className="mt-3 pt-3 border-t">
                          <Button size="sm" className="gradient-success text-white">
                            View Loan Terms
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Credit Profile Sidebar */}
        <div className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Credit Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{creditProfile.score}</div>
                <div className="text-sm text-muted-foreground">Excellent Credit</div>
                <Progress value={(creditProfile.score / 850) * 100} className="mt-2" />
              </div>

              <div className="space-y-3">
                {creditProfile.factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{factor.name}</div>
                      <div className="text-xs text-muted-foreground">{factor.impact}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{factor.score}%</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                View Full Credit Report
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Your credit utilization is excellent. Consider applying for a higher credit limit.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  You're pre-qualified for premium loan rates due to your excellent credit profile.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="font-medium">Member since</div>
                <div className="text-muted-foreground">January 2020</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Verification status</div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-success">Fully Verified</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;