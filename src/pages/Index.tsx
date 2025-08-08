import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, TrendingUp, Users, FileText, AlertTriangle, LogOut, Settings, X } from 'lucide-react';
import { FunctionalityChecker } from '@/components/ui/functionality-checker';

// Import components
import LoanApplicationForm from '@/components/loan/LoanApplicationForm';
import ApplicantDashboard from '@/components/dashboards/ApplicantDashboard';
import RiskAssessmentDashboard from '@/components/dashboards/RiskAssessmentDashboard';
import BusinessDashboard from '@/components/dashboards/BusinessDashboard';
import ModelExplainability from '@/components/ai/ModelExplainability';

import DataPipeline from '@/components/ai/DataPipeline';
import MLOpsMonitoring from '@/components/ai/MLOpsMonitoring';

interface IndexProps {
  session: Session;
}

const Index: React.FC<IndexProps> = ({ session }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFunctionalityChecker, setShowFunctionalityChecker] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Decisions',
      description: 'Real-time loan approvals with explainable AI models',
      color: 'gradient-primary'
    },
    {
      icon: Shield,
      title: 'Bias Detection',
      description: 'Continuous monitoring and mitigation of algorithmic bias',
      color: 'gradient-success'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Comprehensive metrics and business intelligence',
      color: 'gradient-warning'
    },
    {
      icon: Users,
      title: 'Advanced Risk Assessment',
      description: 'Real-time risk analysis with intelligent predictions and monitoring',
      color: 'gradient-tech'
    }
  ];

  const stats = [
    { label: 'Loan Applications Processed', value: '156,847', change: '+12.5%', icon: FileText },
    { label: 'Average Decision Time', value: '2.3s', change: '-45.2%', icon: Brain },
    { label: 'Model Accuracy', value: '94.2%', change: '+2.1%', icon: TrendingUp },
    { label: 'Bias Score (Lower is Better)', value: '0.02', change: '-85.3%', icon: Shield }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-mesh opacity-20 animate-aurora"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-subtle"></div>
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="border-b glass-card backdrop-blur-xl sticky top-0 z-50 border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow animate-glow-pulse">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display gradient-text">
                  LendoraX: Smart Loan Analytics & Fairness Suite
                </h1>
                <p className="text-sm text-muted-foreground">Welcome, {session.user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <Badge variant="outline" className="text-success border-success bg-success/10 animate-pulse">
                <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
                System Active
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFunctionalityChecker(true)}
                className="flex items-center space-x-2 hover-scale transition-spring glass-card border-white/20"
              >
                <Settings className="h-4 w-4" />
                <span>System Check</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2 hover-scale transition-spring glass-card border-white/20"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-7 lg:w-fit bg-white dark:bg-gray-900 shadow-floating rounded-xl border border-gray-200 dark:border-gray-700 animate-scale-up">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-900 dark:text-gray-100 font-medium transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100">Overview</TabsTrigger>
            <TabsTrigger value="apply" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-900 dark:text-gray-100 font-medium transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100">Apply</TabsTrigger>
            <TabsTrigger value="applicant" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-900 dark:text-gray-100 font-medium transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100">Applicant</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-900 dark:text-gray-100 font-medium transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100">Risk Assessment</TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-900 dark:text-gray-100 font-medium transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100">Business</TabsTrigger>
            <TabsTrigger value="explainability" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-900 dark:text-gray-100 font-medium transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100">AI Explain</TabsTrigger>
            <TabsTrigger value="mlops" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-900 dark:text-gray-100 font-medium transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100">MLOps</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Hero Section */}
            <Card className="overflow-hidden shadow-dramatic hover-lift animate-fade-in glass-card border border-white/10">
              <CardContent className="p-0">
                <div className="gradient-hero text-white p-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-slide-in-left">
                      <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white font-medium text-sm mb-6 animate-glow-pulse">
                        🚀 Revolutionary AI Technology
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
                        End-to-End Explainable AI for Loan Approvals
                      </h2>
                      <p className="text-white/90 mb-8 text-xl leading-relaxed">
                        Comprehensive AI system that automates loan decisions with full explainability, 
                        bias monitoring, and regulatory compliance. Built for speed, fairness, and transparency.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button 
                          variant="secondary"
                          onClick={() => setActiveTab('apply')}
                          className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover-scale transition-spring px-8 py-3 text-lg font-medium"
                        >
                          Try Demo Application
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setActiveTab('explainability')}
                          className="border-white/30 text-white hover:bg-white/10 hover-scale transition-spring px-8 py-3 text-lg"
                        >
                          View AI Explanations
                        </Button>
                      </div>
                    </div>
                    <div className="relative animate-slide-in-right">
                      <div className="glass-card rounded-2xl p-8 backdrop-blur-sm animate-scale-in border border-white/20">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-white/90 font-semibold text-lg">Real-time Processing</span>
                            <div className="flex items-center space-x-2">
                              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                              <span className="text-white font-bold">Active</span>
                            </div>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-4">
                            <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 h-4 rounded-full w-4/5 animate-pulse shadow-glow"></div>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-white/10 rounded-xl text-center hover-scale transition-spring">
                              <div className="text-3xl font-bold text-white font-display mb-1">2.3s</div>
                              <div className="text-white/80 text-sm font-medium">Avg Decision Time</div>
                            </div>
                            <div className="p-4 bg-white/10 rounded-xl text-center hover-scale transition-spring">
                              <div className="text-3xl font-bold text-white font-display mb-1">94.2%</div>
                              <div className="text-white/80 text-sm font-medium">Accuracy</div>
                            </div>
                          </div>
                          <div className="pt-4 border-t border-white/20">
                            <div className="text-center">
                              <div className="text-white/80 text-sm mb-2">Processing Status</div>
                              <div className="flex justify-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-soft hover-lift transition-smooth border-l-4 border-l-primary animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        stat.change.startsWith('+') ? 'bg-success/10 text-success' : 
                        stat.change.startsWith('-') && stat.label.includes('Time') ? 'bg-success/10 text-success' :
                        stat.change.startsWith('-') && stat.label.includes('Bias') ? 'bg-success/10 text-success' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
                    </div>
                    <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-soft hover-lift transition-smooth overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth`}>
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold font-display text-foreground mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* System Architecture */}
            <Card className="shadow-soft hover-lift transition-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-display">
                  <FileText className="h-6 w-6" />
                  <span>System Architecture</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Comprehensive end-to-end pipeline covering all aspects of responsible AI deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-4 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                    <h4 className="font-semibold font-display text-foreground text-lg">Data & Privacy</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Real-time data ingestion via Kaggle API</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Privacy-preserving preprocessing</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Automated data validation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Bias detection in raw data</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4 p-4 bg-gradient-to-br from-success/5 to-success/10 rounded-lg">
                    <h4 className="font-semibold font-display text-foreground text-lg">AI & Explainability</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></span>
                        <span>Ensemble modeling (LR + XGBoost)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></span>
                        <span>SHAP & LIME explanations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></span>
                        <span>Real-time inference API</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></span>
                        <span>Fairness-aware training</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4 p-4 bg-gradient-to-br from-warning/5 to-warning/10 rounded-lg">
                    <h4 className="font-semibold font-display text-foreground text-lg">MLOps & Monitoring</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0"></span>
                        <span>Continuous model monitoring</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0"></span>
                        <span>Automated bias detection</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0"></span>
                        <span>A/B testing framework</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0"></span>
                        <span>Regulatory compliance reports</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              
              {/* Real-time System Status */}
              <div className="border-t bg-gradient-to-r from-muted/30 to-muted/50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                      <span className="text-muted-foreground font-medium">System Status: Operational</span>
                    </div>
                    <div className="text-muted-foreground">
                      Last Updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-muted-foreground">API Response: 23ms</span>
                    <span className="text-muted-foreground">Uptime: 99.9%</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="apply">
            <LoanApplicationForm session={session} />
          </TabsContent>

          <TabsContent value="applicant">
            <ApplicantDashboard session={session} />
          </TabsContent>

          <TabsContent value="risk">
            <RiskAssessmentDashboard />
          </TabsContent>

          <TabsContent value="business">
            <BusinessDashboard />
          </TabsContent>

          <TabsContent value="explainability">
            <ModelExplainability />
          </TabsContent>


          <TabsContent value="mlops">
            <div className="grid gap-6">
              <DataPipeline />
              <MLOpsMonitoring />
            </div>
          </TabsContent>
        </Tabs>

        {/* Functionality Checker Modal */}
        {showFunctionalityChecker && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-6xl max-h-[90vh] bg-card rounded-2xl shadow-dramatic border overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between bg-gradient-subtle">
                <h2 className="text-xl font-bold font-display flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Functionality Check
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFunctionalityChecker(false)}
                  className="hover-scale transition-spring"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <FunctionalityChecker onClose={() => setShowFunctionalityChecker(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;