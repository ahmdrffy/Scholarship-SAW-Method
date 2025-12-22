import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { criteria, getRankedStudents } from '@/data/scholarshipData';
import { useStudents } from '@/contexts/StudentContext';
import { Trophy, Users, CheckCircle, XCircle, BarChart3, Medal, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Results() {
  const { students } = useStudents();

  if (students.length === 0) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Belum Ada Data</h2>
            <p className="text-muted-foreground">
              Silakan tambahkan data mahasiswa di halaman Persyaratan terlebih dahulu.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const rankedStudents = getRankedStudents(students, criteria);
  const passedStudents = rankedStudents.filter(s => s.passed);
  const failedStudents = rankedStudents.filter(s => !s.passed);
  
  const averageScore = rankedStudents.reduce((sum, s) => sum + s.sawScore, 0) / rankedStudents.length;
  const highestScore = Math.max(...rankedStudents.map(s => s.sawScore));
  const lowestScore = Math.min(...rankedStudents.map(s => s.sawScore));

  const chartData = rankedStudents.map(s => ({
    name: s.name.split(' ')[0],
    score: parseFloat(s.sawScore.toFixed(4)),
    passed: s.passed,
  }));

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Hasil Seleksi Beasiswa</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Statistik ringkasan dan peringkat akhir semua kandidat berdasarkan perhitungan SAW.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-sm text-muted-foreground">Total Kandidat</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{passedStudents.length}</p>
                  <p className="text-sm text-muted-foreground">Lolos (≥0.70)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{failedStudents.length}</p>
                  <p className="text-sm text-muted-foreground">Tidak Lolos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{(passedStudents.length / students.length * 100).toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">Tingkat Kelulusan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Score Summary */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Distribusi Skor
              </CardTitle>
              <CardDescription>Skor SAW untuk semua kandidat (threshold: 0.70)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis domain={[0, 1]} className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.passed ? 'hsl(var(--success))' : 'hsl(var(--muted-foreground))'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Statistik Skor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Skor Tertinggi</span>
                  <span className="font-bold text-success">{highestScore.toFixed(4)}</span>
                </div>
                <Progress value={highestScore * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Skor Rata-rata</span>
                  <span className="font-bold">{averageScore.toFixed(4)}</span>
                </div>
                <Progress value={averageScore * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Skor Terendah</span>
                  <span className="font-bold text-destructive">{lowestScore.toFixed(4)}</span>
                </div>
                <Progress value={lowestScore * 100} className="h-2" />
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Threshold</span>
                  <span className="font-bold text-secondary">0.7000</span>
                </div>
                <Progress value={70} className="h-2 bg-muted [&>div]:bg-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top 3 Winners */}
        {passedStudents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-secondary" />
              Penerima Beasiswa Teratas
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {rankedStudents.slice(0, 3).map((student, index) => (
                <Card key={student.id} className={`glass-card relative overflow-hidden ${
                  index === 0 ? 'ring-2 ring-secondary' : ''
                }`}>
                  <div className="absolute top-0 right-0 p-3">
                    <Medal className={`h-8 w-8 ${
                      index === 0 ? 'text-yellow-500' : 
                      index === 1 ? 'text-gray-400' : 'text-amber-600'
                    }`} />
                  </div>
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold mb-2">
                      #{student.rank}
                    </div>
                    <CardTitle>{student.name}</CardTitle>
                    <CardDescription>NIM: {student.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Skor SAW</span>
                          <span className="font-bold">{student.sawScore.toFixed(4)}</span>
                        </div>
                        <Progress value={student.sawScore * 100} className="h-2" />
                      </div>
                      <Badge className="bg-success hover:bg-success/90">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Beasiswa Diberikan
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Full Rankings Table */}
        <Card className="glass-card overflow-hidden">
          <CardHeader>
            <CardTitle>Peringkat Lengkap</CardTitle>
            <CardDescription>Semua kandidat diurutkan berdasarkan skor SAW</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold text-center w-20">Peringkat</TableHead>
                    <TableHead className="font-semibold">NIM</TableHead>
                    <TableHead className="font-semibold">Nama</TableHead>
                    {criteria.map((c) => (
                      <TableHead key={c.id} className="font-semibold text-center">{c.id}</TableHead>
                    ))}
                    <TableHead className="font-semibold text-center">Skor SAW</TableHead>
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
                      <TableCell className="font-mono text-sm">{student.id}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      {criteria.map((c) => (
                        <TableCell key={c.id} className="text-center">
                          <Badge variant="outline" className="font-mono">
                            {student.scores[c.id]}
                          </Badge>
                        </TableCell>
                      ))}
                      <TableCell className="text-center">
                        <span className="font-bold">{student.sawScore.toFixed(4)}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={student.passed ? 'default' : 'secondary'}
                          className={student.passed ? 'bg-success hover:bg-success/90' : ''}>
                          {student.passed ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Lolos
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Tidak Lolos
                            </>
                          )}
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
    </Layout>
  );
}
