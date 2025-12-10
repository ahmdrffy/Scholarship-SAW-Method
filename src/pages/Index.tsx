import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, ClipboardList, Trophy, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import unjLogo from '@/assets/unj-logo.png';

const features = [
  {
    icon: ClipboardList,
    title: 'Tentukan Kriteria',
    description: 'Tetapkan 5 kriteria berbobot dengan rubrik penilaian dari 1 hingga 5 untuk evaluasi yang adil.',
  },
  {
    icon: Calculator,
    title: 'Perhitungan SAW',
    description: 'Terapkan metode Simple Additive Weighting dengan normalisasi benefit.',
  },
  {
    icon: Trophy,
    title: 'Lihat Hasil',
    description: 'Lihat peringkat kandidat dengan statistik detail dan status lolos/tidak lolos.',
  },
];

const sawSteps = [
  'Tentukan kriteria dan tetapkan bobot (total = 100%)',
  'Kumpulkan data mahasiswa dan berikan skor (1-5)',
  'Normalisasi matriks berdasarkan tipe benefit',
  'Hitung jumlah tertimbang untuk setiap kandidat',
  'Rangking kandidat berdasarkan skor akhir',
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="flex justify-center mb-6">
              <img src={unjLogo} alt="Logo UNJ" className="h-24 w-24 object-contain" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4" />
              Metode Simple Additive Weighting
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Sistem Penerimaan
              <span className="block text-secondary">Beasiswa Djarum Plus</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pendekatan yang adil dan sistematis untuk menyeleksi penerima beasiswa menggunakan 
              metode Simple Additive Weighting (SAW). Evaluasi kandidat berdasarkan multiple 
              kriteria dengan penilaian berbobot.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/requirements">
                  Lihat Persyaratan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/results">Lihat Hasil</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cara Kerja Sistem</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sistem review beasiswa kami mengikuti proses terstruktur untuk memastikan evaluasi yang adil.
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
                Metode Simple Additive Weighting (SAW)
              </h2>
              <p className="text-muted-foreground mb-6">
                SAW adalah salah satu metode pengambilan keputusan multi-kriteria yang paling banyak digunakan. 
                Metode ini mengevaluasi setiap alternatif dengan menghitung jumlah tertimbang dari semua nilai atribut.
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-2">Formula</h3>
                <code className="text-sm bg-background px-3 py-2 rounded block">
                  V<sub>i</sub> = Σ (W<sub>j</sub> × r<sub>ij</sub>)
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Dimana V adalah skor akhir, W adalah bobot, dan r adalah nilai yang dinormalisasi.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Tipe Normalisasi:</h3>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 bg-success/10 rounded-lg p-3">
                    <div className="h-6 w-6 rounded bg-success/20 flex items-center justify-center text-success text-xs font-bold">B</div>
                    <div>
                      <p className="font-medium text-sm">Benefit (Semakin Tinggi Semakin Baik)</p>
                      <code className="text-xs text-muted-foreground">r = nilai / max(nilai)</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Langkah Perhitungan</CardTitle>
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
          <h2 className="text-3xl font-bold mb-4">Siap untuk Menjelajahi?</h2>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">
            Lihat persyaratan, pelajari cara sistem menghitung skor, 
            dan lihat hasil akhir.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link to="/systems">Lihat Perhitungan</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10">
              <Link to="/results">Lihat Hasil</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
