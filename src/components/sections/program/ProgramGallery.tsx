"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { getStaticImage } from '@/lib/imageMapper';
import { X } from 'lucide-react';

interface ProgramGalleryProps {
  images: string[];
  programName: string;
}

export const ProgramGallery = ({ images, programName }: ProgramGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <Section className="bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            SEE OUR STUDENTS IN ACTION
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {programName} Training
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imagePath, index) => {
            const image = getStaticImage(imagePath);
            return (
            <button
              key={index}
              onClick={() => setSelectedImage(imagePath)} 
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <Image
                src={image}
                alt={`${programName} training ${index + 1}`}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                fill
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-background/90 text-foreground px-4 py-2 rounded-lg font-medium text-sm">
                  View
                </span>
              </div>
            </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={getStaticImage(selectedImage)}
              alt={`${programName} training`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </Section>
  );
};
