// Definisi kriteria dengan bobot dan rubrik
export interface Criterion {
  id: string;
  name: string;
  weight: number;
  type: 'benefit' | 'cost';
  rubric: {
    score: number;
    description: string;
  }[];
}

export const criteria: Criterion[] = [
  {
    id: 'C1',
    name: 'IPK (Indeks Prestasi Kumulatif)',
    weight: 0.30,
    type: 'benefit',
    rubric: [
      { score: 5, description: 'IPK 3.8 - 4.0' },
      { score: 4, description: 'IPK 3.5 - 3.79' },
      { score: 3, description: 'IPK 3.0 - 3.49' },
      { score: 2, description: 'IPK 2.5 - 2.99' },
      { score: 1, description: 'IPK < 2.49' },
    ],
  },
  {
    id: 'C2',
    name: 'Keaktifan Organisasi',
    weight: 0.20,
    type: 'benefit',
    rubric: [
      { score: 5, description: 'Sangat Tinggi - Pimpinan Tingkat Universitas/Nasional' },
      { score: 4, description: 'Tinggi - Pimpinan Tingkat Fakultas/Prodi' },
      { score: 3, description: 'Cukup - Staf Inti Tingkat Universitas/Fakultas' },
      { score: 2, description: 'Rendah - Staf Inti (Tingkat Prodi) atau Anggota dan Panitia Aktif' },
      { score: 1, description: 'Sangat Rendah - Anggota Pasif atau Tidak Aktif' },
    ],
  },
  {
    id: 'C3',
    name: 'Prestasi',
    weight: 0.20,
    type: 'benefit',
    rubric: [
      { score: 5, description: 'Sangat Tinggi - > 5 Prestasi' },
      { score: 4, description: 'Tinggi - 4 s.d. 5 Prestasi' },
      { score: 3, description: 'Cukup - 2 s.d. 3 Prestasi' },
      { score: 2, description: 'Rendah - 1 Prestasi' },
      { score: 1, description: 'Sangat Rendah - 0 Prestasi' },
    ],
  },
  {
    id: 'C4',
    name: 'Hasil Tes Tulis',
    weight: 0.15,
    type: 'benefit',
    rubric: [
      { score: 5, description: 'Sangat Tinggi - Nilai 85 - 100' },
      { score: 4, description: 'Tinggi - Nilai 70 - 84' },
      { score: 3, description: 'Cukup - Nilai 55 - 69' },
      { score: 2, description: 'Rendah - Nilai 45 - 54' },
      { score: 1, description: 'Sangat Rendah - Nilai ≤ 44' },
    ],
  },
  {
    id: 'C5',
    name: 'Hasil Tes Wawancara',
    weight: 0.15,
    type: 'benefit',
    rubric: [
      { score: 5, description: 'Sangat Tinggi - Nilai 85 - 100' },
      { score: 4, description: 'Tinggi - Nilai 70 - 84' },
      { score: 3, description: 'Cukup - Nilai 55 - 69' },
      { score: 2, description: 'Rendah - Nilai 45 - 54' },
      { score: 1, description: 'Sangat Rendah - Nilai ≤ 44' },
    ],
  },
];

// Data mahasiswa dummy
export interface Student {
  id: string;
  name: string;
  scores: Record<string, number>; // criterion id -> score (1-5)
}

export const students: Student[] = [
  { id: 'M001', name: 'Ahmad Fauzan', scores: { C1: 5, C2: 4, C3: 4, C4: 5, C5: 4 } },
  { id: 'M002', name: 'Siti Nurhaliza', scores: { C1: 4, C2: 5, C3: 3, C4: 4, C5: 5 } },
  { id: 'M003', name: 'Budi Santoso', scores: { C1: 3, C2: 3, C3: 5, C4: 3, C5: 3 } },
  { id: 'M004', name: 'Dewi Lestari', scores: { C1: 5, C2: 3, C3: 4, C4: 4, C5: 5 } },
  { id: 'M005', name: 'Rizky Pratama', scores: { C1: 4, C2: 4, C3: 3, C4: 5, C5: 4 } },
  { id: 'M006', name: 'Putri Ayu', scores: { C1: 3, C2: 5, C3: 2, C4: 3, C5: 4 } },
  { id: 'M007', name: 'Muhammad Ridwan', scores: { C1: 5, C2: 4, C3: 5, C4: 4, C5: 3 } },
  { id: 'M008', name: 'Nurul Hidayah', scores: { C1: 4, C2: 4, C3: 4, C4: 3, C5: 4 } },
  { id: 'M009', name: 'Andi Wijaya', scores: { C1: 2, C2: 5, C3: 3, C4: 4, C5: 5 } },
  { id: 'M010', name: 'Fitri Handayani', scores: { C1: 5, C2: 3, C3: 4, C4: 5, C5: 4 } },
];

// Fungsi Perhitungan SAW
export function normalizeMatrix(students: Student[], criteria: Criterion[]): Record<string, Record<string, number>> {
  const normalized: Record<string, Record<string, number>> = {};
  
  criteria.forEach(criterion => {
    const scores = students.map(s => s.scores[criterion.id]);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    
    students.forEach(student => {
      if (!normalized[student.id]) normalized[student.id] = {};
      
      if (criterion.type === 'benefit') {
        // Benefit: semakin tinggi semakin baik, normalisasi dengan max
        normalized[student.id][criterion.id] = student.scores[criterion.id] / max;
      } else {
        // Cost: semakin rendah semakin baik, normalisasi dengan min/value
        normalized[student.id][criterion.id] = min / student.scores[criterion.id];
      }
    });
  });
  
  return normalized;
}

export function calculateSAWScores(
  normalizedMatrix: Record<string, Record<string, number>>,
  criteria: Criterion[]
): Record<string, number> {
  const sawScores: Record<string, number> = {};
  
  Object.keys(normalizedMatrix).forEach(studentId => {
    let totalScore = 0;
    criteria.forEach(criterion => {
      totalScore += normalizedMatrix[studentId][criterion.id] * criterion.weight;
    });
    sawScores[studentId] = totalScore;
  });
  
  return sawScores;
}

export function getRankedStudents(students: Student[], criteria: Criterion[]) {
  const normalized = normalizeMatrix(students, criteria);
  const sawScores = calculateSAWScores(normalized, criteria);
  
  return students
    .map(student => ({
      ...student,
      normalizedScores: normalized[student.id],
      sawScore: sawScores[student.id],
    }))
    .sort((a, b) => b.sawScore - a.sawScore)
    .map((student, index) => ({
      ...student,
      rank: index + 1,
      passed: student.sawScore >= 0.7, // Threshold untuk lolos
    }));
}
