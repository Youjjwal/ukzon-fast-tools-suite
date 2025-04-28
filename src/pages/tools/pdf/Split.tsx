
import { useState } from "react";
import { FileUp, Download, FileMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

type SplitMode = "all" | "range" | "custom";

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<SplitMode>("all");
  const [pageRange, setPageRange] = useState("");
  const [splitting, setSplitting] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.type !== 'application/pdf') {
        toast.error("Please select a PDF file");
        return;
      }
      
      setFile(selectedFile);
      
      // In a real app, we would determine the page count
      // For this demo, we'll simulate it
      setTotalPages(Math.floor(Math.random() * 10) + 5);
    }
  };

  const handleSplit = () => {
    if (!file) return;
    
    // Validate page range if in range mode
    if (splitMode === "range") {
      const isValidRange = /^\d+(-\d+)?$/.test(pageRange);
      if (!isValidRange) {
        toast.error("Please enter a valid page range (e.g., 1-3 or 5)");
        return;
      }
    }
    
    setSplitting(true);
    
    // Simulate processing
    setTimeout(() => {
      toast.success("PDF split successfully!");
      setSplitting(false);
      // In a real app, we would provide download links here
    }, 2000);
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Split PDF Files</h1>
        <p className="text-muted-foreground mb-8">
          Extract specific pages or split a PDF into multiple files.
        </p>
        
        {!file ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <FileMinus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Upload a PDF to Split</h2>
            <p className="text-muted-foreground mb-6">
              Select a PDF file from your computer
            </p>
            <div className="flex justify-center">
              <label htmlFor="file-upload">
                <Button as="div">
                  <FileUp className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-muted/30 p-4 rounded-lg mb-6 flex items-center justify-between">
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB • {totalPages} pages
                </p>
              </div>
              <label htmlFor="replace-file">
                <Button variant="outline" size="sm" as="div">
                  Change File
                </Button>
                <input
                  id="replace-file"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            
            <div className="mb-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">How would you like to split the PDF?</h3>
                <RadioGroup
                  value={splitMode}
                  onValueChange={(value) => setSplitMode(value as SplitMode)}
                  className="gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="split-all" />
                    <Label htmlFor="split-all">Extract all pages (one PDF per page)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="range" id="split-range" />
                    <Label htmlFor="split-range">Extract specific pages</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {splitMode === "range" && (
                <div className="pl-6">
                  <Label htmlFor="page-range">Page Range</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Input
                      id="page-range"
                      placeholder="e.g. 1-3, 5, 7-9"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      className="max-w-xs"
                    />
                    <span className="text-sm text-muted-foreground">
                      Total: {totalPages} pages
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter page numbers and/or page ranges separated by commas.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSplit}
                disabled={splitting} 
                className="min-w-32"
              >
                {splitting ? "Splitting..." : "Split PDF"}
                {!splitting && <Download className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SplitPDF;
