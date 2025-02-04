"use client";

import { useEffect, useState } from "react";
import { Image } from "antd";
import PageLoader from "@/components/PageLoader";

type Measurement = {
  id: string;
  date: string;
  imageUrl: string; // Assuming the API returns image URLs
};

export default function ImageGallery() {
  const [images, setImages] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/measurements", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch images");

        const data: Measurement[] = await res.json();

        // Sort images by date (latest first)
        const sortedData = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setImages(sortedData);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!images.length)
    return <p className="text-center text-gray-500">No images available.</p>;

  return (
    <PageLoader>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={`/api/images/${img.imageUrl.split("/").pop()}`} // ✅ Use API route
              alt={`Body Growth ${img.date}`}
              width={300}
              height={400}
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
              {new Date(img.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </PageLoader>
  );
}
