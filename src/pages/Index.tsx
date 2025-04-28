
import { Link } from "react-router-dom";
import { 
  FileText, 
  Image, 
  Video, 
  QrCode, 
  FileMinus, 
  FileUp, 
  ImageIcon, 
  Crop,
  VideoIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ui/tool-card";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 heading-gradient">
            Fast Online Tools for Everyone
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Simple, powerful, free online tools for all your file needs.
            No login required. No data stored on our servers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/tools/pdf/merge">
                Start with PDF Tools
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="#categories">
                Explore All Tools
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToolCard 
              title="Merge PDF Files" 
              description="Combine multiple PDF files into one document easily."
              icon={FileUp}
              to="/tools/pdf/merge"
            />
            <ToolCard 
              title="Split PDF" 
              description="Extract pages from a PDF or split into multiple files."
              icon={FileMinus}
              to="/tools/pdf/split"
            />
            <ToolCard 
              title="Resize Images" 
              description="Change image dimensions while preserving quality."
              icon={ImageIcon}
              to="/tools/image/resize"
            />
            <ToolCard 
              title="QR Code Generator" 
              description="Create custom QR codes for URLs, text, and more."
              icon={QrCode}
              to="/tools/utils/qr-generator"
            />
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section id="categories" className="py-16 bg-muted/50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Tool Categories</h2>
          
          {/* PDF Tools */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-semibold">PDF Tools</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard 
                title="Merge PDF" 
                description="Combine multiple PDF files into one document."
                icon={FileUp}
                to="/tools/pdf/merge"
              />
              <ToolCard 
                title="Split PDF" 
                description="Extract pages or split PDF into multiple files."
                icon={FileMinus}
                to="/tools/pdf/split"
              />
            </div>
          </div>
          
          {/* Image Tools */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Image className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-semibold">Image Tools</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard 
                title="Resize Image" 
                description="Change the dimensions of your images."
                icon={ImageIcon}
                to="/tools/image/resize"
              />
              <ToolCard 
                title="Compress Image" 
                description="Reduce image file size while preserving quality."
                icon={Image}
                to="/tools/image/compress"
              />
              <ToolCard 
                title="Crop Image" 
                description="Crop unwanted parts from your images."
                icon={Crop}
                to="/tools/image/crop"
              />
            </div>
          </div>
          
          {/* Video Tools */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Video className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-semibold">Video Tools</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard 
                title="Compress Video" 
                description="Reduce video file size for easier sharing."
                icon={VideoIcon}
                to="/tools/video/compress"
              />
            </div>
          </div>
          
          {/* Utilities */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <QrCode className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-semibold">Utilities</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard 
                title="QR Code Generator" 
                description="Generate QR codes for various types of content."
                icon={QrCode}
                to="/tools/utils/qr-generator"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-8">Why Use UKZON Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">Fast & Free</h3>
              <p className="text-muted-foreground">All tools are completely free to use with no hidden charges or limits.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">Privacy Focused</h3>
              <p className="text-muted-foreground">Your files are processed locally. We don't store your files on our servers.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">No Login Required</h3>
              <p className="text-muted-foreground">Use all tools instantly without creating an account or signing up.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
