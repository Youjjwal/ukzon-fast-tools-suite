
import { useState, useRef, useEffect } from "react";
import { ImageIcon, Upload, Download, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const ResizeImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [originalWidth, setOriginalWidth] = useState(800);
  const [originalHeight, setOriginalHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(90);
  const [resizing, setResizing] = useState(false);
  const aspectRatio = originalWidth / originalHeight;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      setFile(selectedFile);
      
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      // Get original dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = objectUrl;
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    setWidth(newWidth);
    
    if (maintainAspectRatio) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };
  
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value);
    setHeight(newHeight);
    
    if (maintainAspectRatio) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const handleResize = () => {
    if (!file || !preview) return;
    
    setResizing(true);
    
    const img = new Image();
    img.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to blob and download
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `resized-${file.name}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }
              setResizing(false);
              toast.success("Image resized successfully!");
            },
            file.type,
            quality / 100
          );
        }
      }
    };
    img.src = preview;
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Resize Image</h1>
        <p className="text-muted-foreground mb-8">
          Change the dimensions of your images while preserving quality.
        </p>
        
        {!file ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Upload an Image to Resize</h2>
            <p className="text-muted-foreground mb-6">
              Supports JPG, PNG, GIF, and WEBP
            </p>
            <div className="flex justify-center">
              <label htmlFor="file-upload">
                <Button as="div">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
                <div className="font-medium mb-2">Original Image</div>
                <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded border border-border bg-background/50">
                  {preview && (
                    <img 
                      src={preview} 
                      alt="Original" 
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {originalWidth} × {originalHeight} pixels • {file.type.split('/')[1].toUpperCase()}
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
                <div className="font-medium mb-2">Preview</div>
                <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded border border-border bg-background/50">
                  {preview && (
                    <div style={{ width: `${Math.min(100, (width / originalWidth) * 100)}%` }}>
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {width} × {height} pixels
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium">Resize Settings</h3>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                      id="aspect-ratio"
                    />
                    <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
                    {maintainAspectRatio ? (
                      <Lock className="h-4 w-4 text-primary" />
                    ) : (
                      <Unlock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setWidth(originalWidth);
                    setHeight(originalHeight);
                  }}
                >
                  Reset
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="width">Width (pixels)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={handleWidthChange}
                    className="mt-1"
                    min={1}
                    max={10000}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (pixels)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={handleHeightChange}
                    className="mt-1"
                    min={1}
                    max={10000}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="quality">Quality: {quality}%</Label>
                </div>
                <Slider
                  id="quality"
                  min={10}
                  max={100}
                  step={1}
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Lower quality, smaller file</span>
                  <span>Higher quality, larger file</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <label htmlFor="replace-file">
                <Button variant="outline" as="div">
                  Change Image
                </Button>
                <input
                  id="replace-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <Button 
                onClick={handleResize}
                disabled={resizing}
                className="ml-auto"
              >
                {resizing ? "Processing..." : "Download Resized Image"}
                {!resizing && <Download className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </>
        )}
      </div>
    </div>
  );
};

export default ResizeImage;
