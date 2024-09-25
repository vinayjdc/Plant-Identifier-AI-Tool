interface PlantImageProps {
    imageUrl: string;
  }
  
  export default function PlantImage({ imageUrl }: PlantImageProps) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <img src={imageUrl} alt="Plant" className="rounded-lg object-cover w-64 h-64" />
        </div>
      </div>
    );
  }
  