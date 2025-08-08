import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, TrendingUp, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthPageProps {
  onAuthChange: (session: Session | null) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        onAuthChange(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [onAuthChange]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Successfully signed in!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Account created successfully! Please check your email to confirm your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-aurora animate-aurora opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full gradient-mesh opacity-20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Enhanced Marketing Content */}
        <div className="text-center lg:text-left space-y-8 animate-slide-in-left">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm animate-glow-pulse">
                ✨ Next-Generation AI Platform
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight">
              <span className="gradient-text animate-shimmer bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]">
                LendoraX
              </span>
              <br />
              <span className="text-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Smart Loan Analytics
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed animate-slide-up" style={{ animationDelay: '0.5s' }}>
              Experience next-generation loan processing with artificial intelligence, 
              complete transparency, and instant decisions powered by advanced ML algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center space-y-4 p-6 glass-card rounded-2xl border border-white/10 hover-lift transition-spring group animate-scale-up" style={{ animationDelay: '0.7s' }}>
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-spring">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold font-display text-lg text-foreground">AI Decision Engine</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Advanced machine learning algorithms for accurate, instant loan assessments
              </p>
            </div>
            <div className="text-center space-y-4 p-6 glass-card rounded-2xl border border-white/10 hover-lift transition-spring group animate-scale-up" style={{ animationDelay: '0.9s' }}>
              <div className="mx-auto w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-spring">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold font-display text-lg text-foreground">Bias-Free Processing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Continuously monitored for fairness and ethical lending practices
              </p>
            </div>
            <div className="text-center space-y-4 p-6 glass-card rounded-2xl border border-white/10 hover-lift transition-spring group animate-scale-up" style={{ animationDelay: '1.1s' }}>
              <div className="mx-auto w-16 h-16 bg-gradient-warning rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-spring">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold font-display text-lg text-foreground">Real-Time Analytics</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete transparency with explainable AI decisions and insights
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Auth Form */}
        <div className="w-full max-w-lg mx-auto animate-slide-in-right">
          <Card className="border-0 shadow-dramatic glass-card backdrop-blur-xl hover-lift transition-spring overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
            <CardHeader className="text-center relative z-10 pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-floating mb-4 animate-glow-pulse">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-display gradient-text mb-2">Welcome Back</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Access your AI-powered loan platform
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 px-8 pb-8">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20">
                  <TabsTrigger 
                    value="signin" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white transition-spring font-medium"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white transition-spring font-medium"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-6 animate-fade-in">
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="signin-email" className="text-sm font-medium text-foreground">Email Address</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="h-12 bg-white/10 border-white/20 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary transition-spring"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signin-password" className="text-sm font-medium text-foreground">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-12 bg-white/10 border-white/20 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary transition-spring"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-primary text-white font-medium hover-scale transition-spring group shadow-floating relative overflow-hidden"
                      disabled={loading}
                    >
                      <span className="relative z-10">
                        {loading ? 'Signing In...' : 'Sign In to Platform'}
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6 animate-fade-in">
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="first-name" className="text-sm font-medium text-foreground">First Name</Label>
                        <Input
                          id="first-name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First name"
                          className="h-12 bg-white/10 border-white/20 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary transition-spring"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="last-name" className="text-sm font-medium text-foreground">Last Name</Label>
                        <Input
                          id="last-name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last name"
                          className="h-12 bg-white/10 border-white/20 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary transition-spring"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">Email Address</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="h-12 bg-white/10 border-white/20 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary transition-spring"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a secure password"
                        className="h-12 bg-white/10 border-white/20 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary transition-spring"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-primary text-white font-medium hover-scale transition-spring group shadow-floating relative overflow-hidden"
                      disabled={loading}
                    >
                      <span className="relative z-10">
                        {loading ? 'Creating Account...' : 'Create Your Account'}
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};