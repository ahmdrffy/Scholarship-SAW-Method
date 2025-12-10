import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, ClipboardList, Trophy, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: ClipboardList,
    title: 'Define Requirements',
    description: 'Set up 5 weighted criteria with rubrics ranging from 1 to 5 for fair evaluation.',
  },
  {
    icon: Calculator,
    title: 'SAW Calculation',
    description: 'Apply Simple Additive Weighting method with cost/benefit normalization.',
  },
  {
    icon: Trophy,
    title: 'View Results',
    description: 'See ranked candidates with detailed statistics and pass/fail status.',
  },
];

const sawSteps = [
  'Define criteria and assign weights (total = 100%)',
  'Collect student data and assign scores (1-5)',
  'Normalize matrix based on cost/benefit type',
  'Calculate weighted sum for each candidate',
  'Rank candidates by final score',
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4" />
              Simple Additive Weighting Method
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Scholarship Selection
              <span className="block text-secondary">Made Transparent</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A fair and systematic approach to selecting scholarship recipients using the 
              Simple Additive Weighting (SAW) method. Evaluate candidates based on multiple 
              criteria with weighted scoring.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/requirements">
                  View Requirements
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/results">See Results</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our scholarship review system follows a structured process to ensure fair evaluation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SAW Method Explanation */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Simple Additive Weighting (SAW) Method
              </h2>
              <p className="text-muted-foreground mb-6">
                SAW is one of the most widely used multi-criteria decision-making methods. 
                It evaluates each alternative by calculating the weighted sum of all attribute values.
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-2">The Formula</h3>
                <code className="text-sm bg-background px-3 py-2 rounded block">
                  V<sub>i</sub> = Σ (W<sub>j</sub> × r<sub>ij</sub>)
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Where V is the final score, W is the weight, and r is the normalized value.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Normalization Types:</h3>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 bg-success/10 rounded-lg p-3">
                    <div className="h-6 w-6 rounded bg-success/20 flex items-center justify-center text-success text-xs font-bold">B</div>
                    <div>
                      <p className="font-medium text-sm">Benefit (Higher is Better)</p>
                      <code className="text-xs text-muted-foreground">r = value / max(values)</code>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-warning/10 rounded-lg p-3">
                    <div className="h-6 w-6 rounded bg-warning/20 flex items-center justify-center text-warning text-xs font-bold">C</div>
                    <div>
                      <p className="font-medium text-sm">Cost (Lower is Better)</p>
                      <code className="text-xs text-muted-foreground">r = min(values) / value</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Calculation Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {sawSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">
            Check out the requirements, see how the system calculates scores, 
            and view the final results.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link to="/systems">View Calculation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10">
              <Link to="/results">View Results</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
