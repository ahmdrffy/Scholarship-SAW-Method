import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { criteria, Student } from '@/data/scholarshipData';
import { Plus, Edit } from 'lucide-react';

interface StudentFormProps {
  student?: Student;
  onSubmit: (student: Student) => void;
  mode: 'add' | 'edit';
}

export function StudentForm({ student, onSubmit, mode }: StudentFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Student>(
    student || {
      id: '',
      name: '',
      scores: { C1: 1, C2: 1, C3: 1, C4: 1, C5: 1 },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    if (mode === 'add') {
      setFormData({
        id: '',
        name: '',
        scores: { C1: 1, C2: 1, C3: 1, C4: 1, C5: 1 },
      });
    }
  };

  const handleScoreChange = (criterionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [criterionId]: parseInt(value),
      },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'add' ? (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Mahasiswa
          </Button>
        ) : (
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Tambah Mahasiswa Baru' : 'Edit Data Mahasiswa'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Masukkan data mahasiswa dan nilai setiap kriteria' 
              : 'Perbarui data mahasiswa'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nim">NIM</Label>
            <Input
              id="nim"
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              placeholder="Contoh: M011"
              required
              disabled={mode === 'edit'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Contoh: Ahmad Rizki"
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label>Nilai Kriteria (1-5)</Label>
            {criteria.map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="w-20 text-sm font-medium">{c.id}:</span>
                <Select
                  value={formData.scores[c.id]?.toString() || '1'}
                  onValueChange={(value) => handleScoreChange(c.id, value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {c.rubric.map((r) => (
                      <SelectItem key={r.score} value={r.score.toString()}>
                        {r.score} - {r.description.split(' - ')[0]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Tambah' : 'Simpan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
