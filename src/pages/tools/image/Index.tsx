
import { Image, CropIcon, ImageMinus } from "lucide-react";
import { ToolCard } from "@/components/ui/tool-card";

const ImageTools = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Image Tools</h1>
        <p className="text-muted-foreground mb-8">
          Free tools to modify, convert, and optimize your images
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            title="Compress Image"
            description="Reduce image file size while preserving quality"
            icon={ImageMinus}
            to="/tools/image/compress"
          />
          <ToolCard
            title="Resize Image"
            description="Change dimensions of your images easily"
            icon={CropIcon}
            to="/tools/image/resize"
          />
          {/* Additional image tools can be added here */}
        </div>
      </div>
    </div>
  );
};

export default ImageTools;
