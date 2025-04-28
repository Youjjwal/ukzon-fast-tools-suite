
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">UKZON</h3>
            <p className="text-muted-foreground">
              Free online tools to make your work easier.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">PDF Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/pdf/merge" className="text-muted-foreground hover:text-primary transition-colors">Merge PDF</Link></li>
              <li><Link to="/tools/pdf/split" className="text-muted-foreground hover:text-primary transition-colors">Split PDF</Link></li>
              <li><Link to="/tools/pdf/compress" className="text-muted-foreground hover:text-primary transition-colors">Compress PDF</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Image Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/image/resize" className="text-muted-foreground hover:text-primary transition-colors">Resize Image</Link></li>
              <li><Link to="/tools/image/compress" className="text-muted-foreground hover:text-primary transition-colors">Compress Image</Link></li>
              <li><Link to="/tools/image/convert" className="text-muted-foreground hover:text-primary transition-colors">Convert Image</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Video Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/video/compress" className="text-muted-foreground hover:text-primary transition-colors">Compress Video</Link></li>
              <li><Link to="/tools/video/convert" className="text-muted-foreground hover:text-primary transition-colors">Convert Video</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} UKZON. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
