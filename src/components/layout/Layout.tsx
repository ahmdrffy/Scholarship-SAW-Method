import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Sistem Penerimaan Beasiswa Djarum Plus - Metode Simple Additive Weighting (SAW)
            </p>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Dikembangkan oleh:</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Ahmad Raffy (1512623028)</span>
                <span>Deni Merdiansyah (1512623050)</span>
                <span>Muhammad Farid (1512623016)</span>
                <span>Muhammad Hisyam Fikri Fadhillah (1512623024)</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Universitas Negeri Jakarta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
