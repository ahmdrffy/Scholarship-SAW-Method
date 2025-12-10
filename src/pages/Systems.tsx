import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { criteria, students, normalizeMatrix, calculateSAWScores, getRankedStudents } from '@/data/scholarshipData';
import { ArrowRight, Calculator, Grid3X3, Trophy } from 'lucide-react';

export default function Systems() {
  const normalizedData = normalizeMatrix(students, criteria);
  const sawScores = calculateSAWScores(normalizedData, criteria);
  const rankedStudents = getRankedStudents(students, criteria);

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">SAW Calculation System</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Step-by-step demonstration of the Simple Additive Weighting method, 
            from raw scores to final rankings.
          </p>
        </div>

        {/* Step 1: Original Matrix */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold">Original Decision Matrix</h2>
              <p className="text-muted-foreground">Raw scores from student evaluations</p>
            </div>
          </div>
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Student</TableHead>
                      {criteria.map((c) => (
                        <TableHead key={c.id} className="font-semibold text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span>{c.id}</span>
                            <Badge variant="outline" className="text-xs">
                              W={c.weight}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        {criteria.map((c) => (
                          <TableCell key={c.id} className="text-center font-mono">
                            {student.scores[c.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-8">
          <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-secondary rotate-90" />
          </div>
        </div>

        {/* Step 2: Normalized Matrix */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold">Normalized Matrix</h2>
              <p className="text-muted-foreground">Values normalized using benefit/cost formulas</p>
            </div>
          </div>
          
          {/* Normalization Formulas */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-success/5 border-success/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4 text-success" />
                  Benefit Normalization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm">r<sub>ij</sub> = X<sub>ij</sub> / max(X<sub>j</sub>)</code>
              </CardContent>
            </Card>
            <Card className="bg-warning/5 border-warning/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4 text-warning" />
                  Cost Normalization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm">r<sub>ij</sub> = min(X<sub>j</sub>) / X<sub>ij</sub></code>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Student</TableHead>
                      {criteria.map((c) => (
                        <TableHead key={c.id} className="font-semibold text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span>{c.id}</span>
                            <Badge 
                              className={c.type === 'benefit' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}
                              variant="outline"
                            >
                              {c.type}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        {criteria.map((c) => (
                          <TableCell key={c.id} className="text-center font-mono text-sm">
                            {normalizedData[student.id][c.id].toFixed(4)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-8">
          <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-secondary rotate-90" />
          </div>
        </div>

        {/* Step 3: Weighted Sum & Ranking */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              3
            </div>
            <div>
              <h2 className="text-2xl font-bold">SAW Score & Final Ranking</h2>
              <p className="text-muted-foreground">V<sub>i</sub> = Σ (W<sub>j</sub> × r<sub>ij</sub>) with threshold ≥ 0.70 to pass</p>
            </div>
          </div>

          {/* Weights Summary */}
          <Card className="mb-6 bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Criteria Weights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {criteria.map((c) => (
                  <div key={c.id} className="flex items-center gap-2 bg-background rounded-lg px-3 py-2">
                    <span className="font-semibold">{c.id}:</span>
                    <span className="text-muted-foreground">{(c.weight * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-center w-20">Rank</TableHead>
                      <TableHead className="font-semibold">Student</TableHead>
                      {criteria.map((c) => (
                        <TableHead key={c.id} className="font-semibold text-center">
                          W×r ({c.id})
                        </TableHead>
                      ))}
                      <TableHead className="font-semibold text-center">SAW Score</TableHead>
                      <TableHead className="font-semibold text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankedStudents.map((student) => (
                      <TableRow key={student.id} className={student.passed ? 'bg-success/5' : ''}>
                        <TableCell className="text-center">
                          <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold ${
                            student.rank <= 3 ? 'bg-secondary text-secondary-foreground' : 'bg-muted'
                          }`}>
                            {student.rank}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        {criteria.map((c) => (
                          <TableCell key={c.id} className="text-center font-mono text-xs">
                            {(student.normalizedScores[c.id] * c.weight).toFixed(4)}
                          </TableCell>
                        ))}
                        <TableCell className="text-center">
                          <span className="font-bold text-lg">{student.sawScore.toFixed(4)}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={student.passed ? 'default' : 'secondary'} 
                            className={student.passed ? 'bg-success hover:bg-success/90' : ''}>
                            {student.passed ? (
                              <>
                                <Trophy className="h-3 w-3 mr-1" />
                                Passed
                              </>
                            ) : 'Not Passed'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculation Example */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculation Example: {rankedStudents[0]?.name}
            </CardTitle>
            <CardDescription>
              Step-by-step calculation for the top-ranked student
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm whitespace-nowrap">
                  V = {criteria.map((c, i) => (
                    <span key={c.id}>
                      ({c.weight} × {rankedStudents[0]?.normalizedScores[c.id].toFixed(4)})
                      {i < criteria.length - 1 ? ' + ' : ''}
                    </span>
                  ))}
                </code>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <code className="text-sm">
                  V = {criteria.map((c, i) => (
                    <span key={c.id}>
                      {(c.weight * rankedStudents[0]?.normalizedScores[c.id]).toFixed(4)}
                      {i < criteria.length - 1 ? ' + ' : ''}
                    </span>
                  ))} = <strong>{rankedStudents[0]?.sawScore.toFixed(4)}</strong>
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
