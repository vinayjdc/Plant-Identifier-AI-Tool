'use client'

import { useState } from 'react'
import { Camera, Layers, Layout, Edit, PaintBucket, Type } from 'lucide-react'
import ImageUploader from './components/ImageUploader'
import PlantInfo from './components/PlantInfo'
import PlantImage from './components/PlantImage'
import FeatureCard from './components/FeatureCard'

export default function Home() {
  const [plantInfo, setPlantInfo] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  return (
    <div className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-white text-center">Plant Identifier</h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          Upload an image of a plant or capture a photo, and let AI identify it for you!
        </p>
        <ImageUploader setPlantInfo={setPlantInfo} setImageUrl={setImageUrl} />
        {imageUrl && <PlantImage imageUrl={imageUrl} />}
        {plantInfo && <PlantInfo info={plantInfo} />}

        {/* How to use section */}
        <section className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Camera}
              title="Upload Image"
              description="Take a clear photo of the plant you want to identify and upload it to our app."
            />
            <FeatureCard
              icon={Layers}
              title="AI Analysis"
              description="Our advanced AI analyzes the image to identify the plant species and gather relevant information."
            />
            <FeatureCard
              icon={Layout}
              title="Get Results"
              description="Receive detailed information about the plant, including its name, characteristics, and care tips."
            />
          </div>
        </section>

        {/* Information you can gain section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Type}
              title="Scientific Name"
              description="Discover the plant's scientific name and its taxonomic classification."
            />
            <FeatureCard
              icon={PaintBucket}
              title="Care Instructions"
              description="Get tips on watering, sunlight requirements, and optimal growing conditions."
            />
            <FeatureCard
              icon={Edit}
              title="Interesting Facts"
              description="Learn unique facts about the plant's history, uses, and cultural significance."
            />
          </div>
        </section>

      </div>
    </div>
  )
}
