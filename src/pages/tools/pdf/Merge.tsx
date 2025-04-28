
import { useState } from "react";
import { FileUp, Trash, FilePlus } from "lucide-react";
import { Button, ButtonWithLabel } from "@/components/ui/button";
import { toast } from "sonner";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
      
      if (pdfFiles.length !== newFiles.length) {
        toast.error("Only PDF files are accepted");
      }
      
      setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = () => {
    // In a real implementation, we would use a library like PDF-LIB
    // to merge PDFs on the client side
    setMerging(true);
    
    // Simulate processing
    setTimeout(() => {
      toast.success("PDFs merged successfully!");
      setMerging(false);
      // In a real app, we would provide a download link here
    }, 2000);
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Merge PDF Files</h1>
        <p className="text-muted-foreground mb-8">
          Combine multiple PDF files into a single document.
        </p>
        
        <div className="mb-8">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <FileUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Upload PDFs to Merge</h2>
            <p className="text-muted-foreground mb-6">
              Drag and drop PDF files here, or click to browse
            </p>
            <div className="flex justify-center">
              <ButtonWithLabel>
                <FilePlus className="mr-2 h-4 w-4" />
                Add Files
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </ButtonWithLabel>
            </div>
          </div>
        </div>
        
        {files.length > 0 && (
          <>
            <h3 className="font-medium mb-2">Files to merge ({files.length})</h3>
            <div className="border rounded-lg overflow-hidden mb-6">
              <div className="max-h-64 overflow-y-auto">
                {files.map((file, index) => (
                  <div 
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-4 odd:bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="font-medium truncate max-w-xs">{file.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleMerge}
                disabled={files.length < 2 || merging} 
                className="min-w-32"
              >
                {merging ? "Merging..." : "Merge PDFs"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MergePDF;
