import { useState } from 'react';
// Ensure that this import matches your SDK/package
import { GoogleGenerativeAI } from '@google/generative-ai'; // <-- Add this line

interface ImageUploaderProps {
  setPlantInfo: (info: string) => void;
  setImageUrl: (url: string) => void;
}

export default function ImageUploader({ setPlantInfo, setImageUrl }: ImageUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);

      const apiKey = "apikey"; // Replace with your actual API key
      if (!apiKey) {
        throw new Error('Gemini API key is not set');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const base64Image = await fileToBase64(file);
      const base64Data = base64Image.split(',')[1];

      const result = await model.generateContent([
        'Identify this plant and provide important information about it. Include scientific name, common name, family, native region, and any interesting facts.',
        { inlineData: { data: base64Data, mimeType: file.type } },
      ]);

      const response = await result.response;
      const text = await response.text();
      setPlantInfo(text);
    } catch (error) {
      console.error('Error identifying plant:', error);
      let errorMessage = 'Error identifying plant. Please try again.';
      if (error instanceof Error) {
        errorMessage += ' Details: ' + error.message;
      }
      setPlantInfo(errorMessage);
    }

    setIsLoading(false);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="mb-8 text-center">
      <div className="flex justify-center space-x-4">
        <label
          htmlFor="image-upload"
          className="bg-white text-green-500 px-6 py-3 rounded-lg shadow-md hover:bg-green-100 transition-colors cursor-pointer inline-flex items-center"
        >
          <span className="mr-2">📤</span> Upload Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <label
          htmlFor="image-capture"
          className="bg-white text-green-500 px-6 py-3 rounded-lg shadow-md hover:bg-green-100 transition-colors cursor-pointer inline-flex items-center"
        >
          <span className="mr-2">📸</span> Take Photo
        </label>
        <input
          id="image-capture"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {isLoading && <p className="mt-4 text-white">Identifying plant...</p>}
    </div>
  );
}
