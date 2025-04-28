
import { API_KEYS } from "@/config/api-keys";

// Interface for compression options
export interface CompressionOptions {
  quality: number;
}

// Interface for resize options
export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  quality: number;
}

// Local image processing service for when API calls fail
export const localImageService = {
  compressImage: async (
    file: File, 
    options: CompressionOptions
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image"));
              return;
            }
            resolve(blob);
          },
          file.type,
          options.quality / 100
        );
      };
      
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      
      img.src = URL.createObjectURL(file);
    });
  },
  
  resizeImage: async (
    file: File, 
    options: ResizeOptions
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      
      img.onload = () => {
        canvas.width = options.width;
        canvas.height = options.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        
        ctx.drawImage(img, 0, 0, options.width, options.height);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to resize image"));
              return;
            }
            resolve(blob);
          },
          file.type,
          options.quality / 100
        );
      };
      
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
};
