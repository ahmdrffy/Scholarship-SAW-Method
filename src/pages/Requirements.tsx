import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { criteria } from '@/data/scholarshipData';
import { useStudents } from '@/contexts/StudentContext';
import { StudentForm } from '@/components/StudentForm';
import { TrendingUp, Users, Target, Scale, Trash2, RotateCcw } from 'lucide-react';

export default function Requirements() {
  const { students, addStudent, updateStudent, deleteStudent, resetToDefault } = useStudents();
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

        {/* Input Data */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Data Input Mahasiswa</h2>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset ke Data Awal?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ini akan menghapus semua perubahan dan mengembalikan data mahasiswa ke kondisi awal.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={resetToDefault}>Reset</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <StudentForm mode="add" onSubmit={addStudent} />
            </div>
          </div>
          
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
                      <TableHead className="font-semibold text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={criteria.length + 3} className="text-center py-8 text-muted-foreground">
                          Belum ada data mahasiswa. Klik "Tambah Mahasiswa" untuk menambahkan.
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map((student) => (
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
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <StudentForm
                                mode="edit"
                                student={student}
                                onSubmit={(updated) => updateStudent(student.id, updated)}
                              />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Hapus Mahasiswa?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Apakah Anda yakin ingin menghapus data {student.name}? Tindakan ini tidak dapat dibatalkan.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteStudent(student.id)} className="bg-destructive hover:bg-destructive/90">
                                      Hapus
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
