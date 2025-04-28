
import { useState } from "react";
import { Video, Upload, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

type Quality = "high" | "medium" | "low";

const CompressVideo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>("medium");
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [processing, setProcessing] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.startsWith('video/')) {
        toast.error("Please select a video file");
        return;
      }
      
      setFile(selectedFile);
      setVideoSrc(URL.createObjectURL(selectedFile));
    }
  };
  
  const handleCompress = () => {
    if (!file) return;
    
    setProcessing(true);
    
    // In a real application, we would use a library like FFmpeg.wasm
    // to compress the video client-side. For this demo, we'll simulate it.
    toast.info("Starting video compression...");
    
    // Simulate processing time
    setTimeout(() => {
      toast.success("Video compressed successfully!");
      setProcessing(false);
      // In a real app, we would provide the compressed video for download
    }, 3000);
  };
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Compress Video</h1>
        <p className="text-muted-foreground mb-8">
          Reduce video file size while maintaining acceptable quality.
        </p>
        
        {!file ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Upload a Video to Compress</h2>
            <p className="text-muted-foreground mb-6">
              Supports MP4, MOV, AVI, and other common formats
            </p>
            <div className="flex justify-center">
              <label htmlFor="file-upload">
                <Button as="div">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Video
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {videoSrc && (
                  <video 
                    src={videoSrc} 
                    controls 
                    className="w-full h-full"
                  ></video>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {file.name} • {(file.size / (1024 * 1024)).toFixed(2)} MB
                </div>
                <label htmlFor="replace-video">
                  <Button variant="outline" size="sm" as="div">
                    Change Video
                  </Button>
                  <input
                    id="replace-video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Compression Settings</h3>
              </div>
              
              <div className="mb-6">
                <div className="font-medium mb-2">Quality Preset</div>
                <RadioGroup
                  value={quality}
                  onValueChange={(value) => setQuality(value as Quality)}
                  className="flex flex-wrap gap-2"
                >
                  <div>
                    <RadioGroupItem
                      value="high"
                      id="quality-high"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="quality-high"
                      className="flex px-3 py-2 border border-border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                    >
                      High Quality
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="medium"
                      id="quality-medium"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="quality-medium"
                      className="flex px-3 py-2 border border-border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                    >
                      Medium Quality
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="low"
                      id="quality-low"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="quality-low"
                      className="flex px-3 py-2 border border-border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                    >
                      Low Quality
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="compression">Compression Level: {compressionLevel}%</Label>
                </div>
                <Slider
                  id="compression"
                  min={20}
                  max={80}
                  step={1}
                  value={[compressionLevel]}
                  onValueChange={(value) => setCompressionLevel(value[0])}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Larger file size, better quality</span>
                  <span>Smaller file size, lower quality</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleCompress}
                disabled={processing} 
              >
                {processing ? "Compressing..." : "Compress Video"}
                {!processing && <Download className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </>
        )}
        
        <div className="mt-12 bg-muted/30 rounded-lg p-6">
          <h3 className="font-medium mb-4">Note about Video Compression</h3>
          <p className="text-muted-foreground text-sm">
            This is a client-side demo of UKZON's video compression tool. In a real implementation, 
            we would use WebAssembly libraries like FFmpeg.wasm to perform actual compression 
            entirely in your browser. No videos are uploaded to our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompressVideo;
