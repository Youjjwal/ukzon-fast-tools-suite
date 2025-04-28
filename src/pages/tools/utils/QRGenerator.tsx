
import { useState, useRef, useEffect } from "react";
import { QrCode, Download, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type QRType = "url" | "text" | "email" | "phone";
type QRColor = "black" | "primary" | "blue" | "green" | "red";

const colorMap = {
  black: "#000000",
  primary: "#9b87f5",
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444"
};

const QRGenerator = () => {
  const [qrType, setQrType] = useState<QRType>("url");
  const [qrText, setQrText] = useState("https://ukzon.com");
  const [qrSize, setQrSize] = useState(200);
  const [qrColor, setQrColor] = useState<QRColor>("black");
  const [includeMargin, setIncludeMargin] = useState(true);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file for the logo");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearLogo = () => {
    setLogoImage(null);
  };
  
  const generateQR = () => {
    // In a real application, we would use a library like qrcode.react
    // to generate the QR code. For this demo, we'll simulate it.
    
    // This would be the code to generate a real QR code:
    // <QRCode
    //   value={qrText}
    //   size={qrSize}
    //   fgColor={colorMap[qrColor]}
    //   includeMargin={includeMargin}
    //   level="H" // allows for logo embedding
    //   imageSettings={logoImage ? {
    //     src: logoImage,
    //     width: qrSize * 0.2,
    //     height: qrSize * 0.2,
    //     excavate: true,
    //   } : undefined}
    // />
    
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = qrSize;
    canvas.height = qrSize;
    
    // Clear the canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, qrSize, qrSize);
    
    // Simulate QR code (just for demo)
    const margin = includeMargin ? qrSize * 0.1 : 0;
    const size = qrSize - margin * 2;
    
    ctx.fillStyle = colorMap[qrColor];
    
    // Draw a simulated QR pattern
    const blockSize = size / 25;
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if (
          // Position detection patterns (corners)
          (i < 7 && j < 7) || 
          (i < 7 && j > 17) || 
          (i > 17 && j < 7) || 
          // Random blocks to simulate QR pattern
          Math.random() > 0.65
        ) {
          ctx.fillRect(
            margin + i * blockSize, 
            margin + j * blockSize, 
            blockSize, 
            blockSize
          );
        }
      }
    }
    
    // Draw position detection patterns (white squares in corners)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(margin + 2 * blockSize, margin + 2 * blockSize, 3 * blockSize, 3 * blockSize);
    ctx.fillRect(margin + 2 * blockSize, margin + (25 - 5) * blockSize, 3 * blockSize, 3 * blockSize);
    ctx.fillRect(margin + (25 - 5) * blockSize, margin + 2 * blockSize, 3 * blockSize, 3 * blockSize);
    
    // Draw logo if provided
    if (logoImage) {
      const img = new Image();
      img.onload = () => {
        const logoSize = qrSize * 0.2;
        const logoX = (qrSize - logoSize) / 2;
        const logoY = (qrSize - logoSize) / 2;
        
        // Draw white background for logo
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
        
        // Draw the logo
        ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
      };
      img.src = logoImage;
    }
  };
  
  useEffect(() => {
    generateQR();
  }, [qrText, qrSize, qrColor, includeMargin, logoImage]);
  
  const downloadQR = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'ukzon-qrcode.png';
    link.href = canvasRef.current.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR code downloaded successfully!");
  };
  
  const handleTextChange = (value: string) => {
    setQrText(value);
    
    // Add prefix based on QR type if needed
    if (qrType === "email" && !value.startsWith("mailto:") && value.includes("@")) {
      setQrText(`mailto:${value}`);
    } else if (qrType === "phone" && !value.startsWith("tel:")) {
      // Remove non-digit characters for phone
      const digits = value.replace(/\D/g, '');
      if (digits) {
        setQrText(`tel:${digits}`);
      }
    }
  };
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
        <p className="text-muted-foreground mb-8">
          Create custom QR codes for URLs, text, contact information, and more.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <Tabs defaultValue="url" onValueChange={(value) => setQrType(value as QRType)}>
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                  <TabsContent value="url" className="mt-0">
                    <Label htmlFor="url-input">Website URL</Label>
                    <Input
                      id="url-input"
                      placeholder="https://example.com"
                      value={qrText}
                      onChange={(e) => setQrText(e.target.value)}
                      className="mt-1"
                    />
                  </TabsContent>
                  <TabsContent value="text" className="mt-0">
                    <Label htmlFor="text-input">Text Content</Label>
                    <Input
                      id="text-input"
                      placeholder="Enter your text here"
                      value={qrText}
                      onChange={(e) => setQrText(e.target.value)}
                      className="mt-1"
                    />
                  </TabsContent>
                  <TabsContent value="email" className="mt-0">
                    <Label htmlFor="email-input">Email Address</Label>
                    <Input
                      id="email-input"
                      type="email"
                      placeholder="example@email.com"
                      value={qrText.replace('mailto:', '')}
                      onChange={(e) => handleTextChange(e.target.value)}
                      className="mt-1"
                    />
                  </TabsContent>
                  <TabsContent value="phone" className="mt-0">
                    <Label htmlFor="phone-input">Phone Number</Label>
                    <Input
                      id="phone-input"
                      type="tel"
                      placeholder="+1234567890"
                      value={qrText.replace('tel:', '')}
                      onChange={(e) => handleTextChange(e.target.value)}
                      className="mt-1"
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-6">Customize QR Code</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="size-slider">Size: {qrSize}px</Label>
                  <Slider
                    id="size-slider"
                    min={100}
                    max={400}
                    step={10}
                    value={[qrSize]}
                    onValueChange={(value) => setQrSize(value[0])}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Color</Label>
                  <RadioGroup
                    value={qrColor}
                    onValueChange={(value) => setQrColor(value as QRColor)}
                    className="flex gap-3"
                  >
                    <div>
                      <RadioGroupItem
                        value="black"
                        id="color-black"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="color-black"
                        className="w-8 h-8 bg-black rounded-full cursor-pointer ring-2 ring-offset-2 ring-transparent peer-data-[state=checked]:ring-primary"
                      />
                    </div>
                    <div>
                      <RadioGroupItem
                        value="primary"
                        id="color-primary"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="color-primary"
                        className="w-8 h-8 bg-primary rounded-full cursor-pointer ring-2 ring-offset-2 ring-transparent peer-data-[state=checked]:ring-primary"
                      />
                    </div>
                    <div>
                      <RadioGroupItem
                        value="blue"
                        id="color-blue"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="color-blue"
                        className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer ring-2 ring-offset-2 ring-transparent peer-data-[state=checked]:ring-primary"
                      />
                    </div>
                    <div>
                      <RadioGroupItem
                        value="green"
                        id="color-green"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="color-green"
                        className="w-8 h-8 bg-green-500 rounded-full cursor-pointer ring-2 ring-offset-2 ring-transparent peer-data-[state=checked]:ring-primary"
                      />
                    </div>
                    <div>
                      <RadioGroupItem
                        value="red"
                        id="color-red"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="color-red"
                        className="w-8 h-8 bg-red-500 rounded-full cursor-pointer ring-2 ring-offset-2 ring-transparent peer-data-[state=checked]:ring-primary"
                      />
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="add-margin"
                    checked={includeMargin}
                    onCheckedChange={setIncludeMargin}
                  />
                  <Label htmlFor="add-margin">Add margin around QR code</Label>
                </div>
                
                <div>
                  <Label className="mb-2 block">Logo (optional)</Label>
                  {!logoImage ? (
                    <div className="flex items-center gap-3">
                      <label htmlFor="logo-upload">
                        <Button variant="outline" as="div">
                          <Image className="mr-2 h-4 w-4" />
                          Add Logo
                        </Button>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoChange}
                        />
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Adding a logo may reduce QR code readability
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={logoImage} 
                          alt="Logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearLogo}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove Logo
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-muted/30 p-6 rounded-lg flex flex-col items-center">
              <h3 className="text-lg font-medium mb-4">Your QR Code</h3>
              <div className="bg-white p-4 rounded mb-6">
                <canvas 
                  ref={canvasRef} 
                  width={qrSize} 
                  height={qrSize}
                  className="max-w-full h-auto"
                />
              </div>
              <Button onClick={downloadQR}>
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
            </div>
            
            <div className="mt-6 bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Tips for QR Codes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Test your QR code with different scanning apps before using it.</li>
                <li>• Keep the data simple - shorter URLs work better.</li>
                <li>• Adding a logo may reduce scanning reliability with some readers.</li>
                <li>• Print QR codes with enough white space around them.</li>
                <li>• For best results, use high contrast colors.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
