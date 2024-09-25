interface PlantInfoProps {
    info: string;
  }
  
  export default function PlantInfo({ info }: PlantInfoProps) {
    // Function to convert text with asterisks to HTML with bold and italic text
    const formatText = (text: string) => {
      // Replace double asterisks with <strong> for bold
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Replace single asterisks with <em> for italic
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return text;
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Plant Information</h2>
        {/* Use dangerouslySetInnerHTML to render the formatted text */}
        <p className="text-gray-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatText(info) }} />
      </div>
    );
  }
  