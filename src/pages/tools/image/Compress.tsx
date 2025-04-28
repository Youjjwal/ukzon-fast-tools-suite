
import { useState, useRef } from "react";
import { Image, Upload, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { API_KEYS } from "@/config/api-keys";

const CompressImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [compressing, setCompressing] = useState(false);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      setFile(selectedFile);
      setCompressedSize(null);
      setCompressedUrl(null);
      
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleCompress = async () => {
    if (!file || !preview) return;
    
    setCompressing(true);
    
    try {
      // Local compression fallback using canvas
      const img = new Image();
      img.onload = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            
            // Get the compressed image
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  setCompressedSize(blob.size);
                  const url = URL.createObjectURL(blob);
                  setCompressedUrl(url);
                }
                setCompressing(false);
                toast.success("Image compressed successfully!");
              },
              file.type,
              quality / 100
            );
          }
        }
      };
      img.src = preview;
      
    } catch (error) {
      console.error("Error compressing image:", error);
      setCompressing(false);
      toast.error("Failed to compress image. Please try again.");
    }
  };
  
  const handleDownload = () => {
    if (!compressedUrl || !file) return;
    
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const compressionRate = file && compressedSize 
    ? 100 - Math.round((compressedSize / file.size) * 100) 
    : null;

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Compress Image</h1>
        <p className="text-muted-foreground mb-8">
          Reduce image file size while preserving quality.
        </p>
        
        {!file ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Image className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Upload an Image to Compress</h2>
            <p className="text-muted-foreground mb-6">
              Supports JPG and PNG images
            </p>
            <div className="flex justify-center">
              <label htmlFor="file-upload">
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/jpeg, image/png"
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
                <div className="flex-1 flex items-center justify-center overflow-hidden rounded border border-border bg-background/50">
                  {preview && (
                    <img 
                      src={preview} 
                      alt="Original" 
                      className="max-w-full max-h-[300px] object-contain"
                    />
                  )}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {formatSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
                <div className="font-medium mb-2">Compressed Image</div>
                <div className="flex-1 flex items-center justify-center overflow-hidden rounded border border-border bg-background/50">
                  {compressedUrl ? (
                    <img 
                      src={compressedUrl} 
                      alt="Compressed" 
                      className="max-w-full max-h-[300px] object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
                      <ArrowRight className="h-8 w-8 mb-2" />
                      <p>Compressed preview will appear here</p>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {compressedSize ? (
                    <>
                      {formatSize(compressedSize)} • 
                      {compressionRate !== null && compressionRate > 0 ? (
                        <span className="text-green-600 font-medium"> {compressionRate}% smaller</span>
                      ) : (
                        <span> No size reduction</span>
                      )}
                    </>
                  ) : (
                    "Waiting for compression"
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="quality">Compression Level: {100 - quality}%</Label>
                </div>
                <Slider
                  id="quality"
                  min={30}
                  max={95}
                  step={1}
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>More compression, lower quality</span>
                  <span>Less compression, higher quality</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <label htmlFor="replace-file">
                <Button variant="outline">
                  Change Image
                </Button>
                <input
                  id="replace-file"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              
              {!compressedUrl ? (
                <Button 
                  onClick={handleCompress}
                  disabled={compressing}
                  className="ml-auto"
                >
                  {compressing ? "Compressing..." : "Compress Image"}
                </Button>
              ) : (
                <Button 
                  onClick={handleDownload}
                  className="ml-auto"
                >
                  Download Compressed Image
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </>
        )}
      </div>
    </div>
  );
};

export default CompressImage;
