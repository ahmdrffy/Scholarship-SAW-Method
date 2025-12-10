import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { criteria, students } from '@/data/scholarshipData';
import { TrendingUp, Users, Target, Scale } from 'lucide-react';

export default function Requirements() {
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Persyaratan Beasiswa</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Seleksi beasiswa didasarkan pada 5 kriteria berbobot. Setiap kriteria memiliki rubrik 
            dengan skor dari 1 hingga 5, dan semua kriteria diklasifikasikan sebagai faktor benefit.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{criteria.length}</p>
                  <p className="text-sm text-muted-foreground">Kriteria Evaluasi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{(totalWeight * 100).toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">Total Bobot</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-sm text-muted-foreground">Kandidat</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Criteria Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Kriteria Evaluasi & Rubrik</h2>
          <div className="grid gap-6">
            {criteria.map((criterion, index) => (
              <Card key={criterion.id} className="glass-card animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {criterion.id}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{criterion.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          Bobot: <span className="font-semibold text-foreground">{(criterion.weight * 100).toFixed(0)}%</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant="default"
                      className="bg-success hover:bg-success/90"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Benefit
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Skor</TableHead>
                        <TableHead>Deskripsi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {criterion.rubric.map((rubric) => (
                        <TableRow key={rubric.score}>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {rubric.score}
                            </Badge>
                          </TableCell>
                          <TableCell>{rubric.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Input Data Preview */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Data Input Mahasiswa (Contoh)</h2>
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">NIM</TableHead>
                      <TableHead className="font-semibold">Nama</TableHead>
                      {criteria.map((c) => (
                        <TableHead key={c.id} className="font-semibold text-center">
                          {c.id}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-mono text-sm">{student.id}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        {criteria.map((c) => (
                          <TableCell key={c.id} className="text-center">
                            <Badge variant="outline" className="font-mono">
                              {student.scores[c.id]}
                            </Badge>
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
      </div>
    </Layout>
  );
}
