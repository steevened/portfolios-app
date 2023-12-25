"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ProjectGallery({
  gallery,
}: {
  gallery: {
    id: string;
    url: string;
  }[];
}) {
  return (
    <Carousel>
      <CarouselContent>
        {gallery.map((image) => (
          <CarouselItem key={image.id} className="w-full h-full">
            <Image
              src={image.url}
              alt="Project gallery image"
              width={1000}
              height={1000}
              className="w-full h-full !object-contain aspect-video"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
