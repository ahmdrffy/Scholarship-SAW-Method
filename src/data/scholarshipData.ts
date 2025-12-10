// Criteria definitions with weights and rubrics
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
    name: 'Academic Performance (GPA)',
    weight: 0.30,
    type: 'benefit',
    rubric: [
      { score: 1, description: 'GPA < 2.0' },
      { score: 2, description: 'GPA 2.0 - 2.49' },
      { score: 3, description: 'GPA 2.5 - 2.99' },
      { score: 4, description: 'GPA 3.0 - 3.49' },
      { score: 5, description: 'GPA ≥ 3.5' },
    ],
  },
  {
    id: 'C2',
    name: 'Family Income',
    weight: 0.25,
    type: 'cost',
    rubric: [
      { score: 1, description: '> $100,000/year' },
      { score: 2, description: '$75,000 - $100,000/year' },
      { score: 3, description: '$50,000 - $74,999/year' },
      { score: 4, description: '$25,000 - $49,999/year' },
      { score: 5, description: '< $25,000/year' },
    ],
  },
  {
    id: 'C3',
    name: 'Extracurricular Activities',
    weight: 0.15,
    type: 'benefit',
    rubric: [
      { score: 1, description: 'No participation' },
      { score: 2, description: '1-2 activities' },
      { score: 3, description: '3-4 activities' },
      { score: 4, description: '5-6 activities with leadership' },
      { score: 5, description: '7+ activities with significant leadership' },
    ],
  },
  {
    id: 'C4',
    name: 'Community Service Hours',
    weight: 0.15,
    type: 'benefit',
    rubric: [
      { score: 1, description: '0-10 hours' },
      { score: 2, description: '11-25 hours' },
      { score: 3, description: '26-50 hours' },
      { score: 4, description: '51-100 hours' },
      { score: 5, description: '> 100 hours' },
    ],
  },
  {
    id: 'C5',
    name: 'Distance from Campus',
    weight: 0.15,
    type: 'cost',
    rubric: [
      { score: 1, description: '< 5 km' },
      { score: 2, description: '5-15 km' },
      { score: 3, description: '16-30 km' },
      { score: 4, description: '31-50 km' },
      { score: 5, description: '> 50 km' },
    ],
  },
];

// Dummy student data
export interface Student {
  id: string;
  name: string;
  scores: Record<string, number>; // criterion id -> score (1-5)
}

export const students: Student[] = [
  { id: 'S001', name: 'Alice Johnson', scores: { C1: 5, C2: 4, C3: 4, C4: 5, C5: 3 } },
  { id: 'S002', name: 'Bob Smith', scores: { C1: 4, C2: 5, C3: 3, C4: 4, C5: 4 } },
  { id: 'S003', name: 'Carol Williams', scores: { C1: 3, C2: 3, C3: 5, C4: 3, C5: 2 } },
  { id: 'S004', name: 'David Brown', scores: { C1: 5, C2: 2, C3: 4, C4: 4, C5: 5 } },
  { id: 'S005', name: 'Eva Martinez', scores: { C1: 4, C2: 4, C3: 3, C4: 5, C5: 3 } },
  { id: 'S006', name: 'Frank Lee', scores: { C1: 3, C2: 5, C3: 2, C4: 3, C5: 4 } },
  { id: 'S007', name: 'Grace Kim', scores: { C1: 5, C2: 3, C3: 5, C4: 4, C5: 2 } },
  { id: 'S008', name: 'Henry Chen', scores: { C1: 4, C2: 4, C3: 4, C4: 3, C5: 3 } },
  { id: 'S009', name: 'Iris Patel', scores: { C1: 2, C2: 5, C3: 3, C4: 4, C5: 5 } },
  { id: 'S010', name: 'Jack Wilson', scores: { C1: 5, C2: 3, C3: 4, C4: 5, C5: 4 } },
];

// SAW Calculation Functions
export function normalizeMatrix(students: Student[], criteria: Criterion[]): Record<string, Record<string, number>> {
  const normalized: Record<string, Record<string, number>> = {};
  
  criteria.forEach(criterion => {
    const scores = students.map(s => s.scores[criterion.id]);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    
    students.forEach(student => {
      if (!normalized[student.id]) normalized[student.id] = {};
      
      if (criterion.type === 'benefit') {
        // Benefit: higher is better, normalize by max
        normalized[student.id][criterion.id] = student.scores[criterion.id] / max;
      } else {
        // Cost: lower is better, normalize by min/value
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
      passed: student.sawScore >= 0.7, // Threshold for passing
    }));
}
