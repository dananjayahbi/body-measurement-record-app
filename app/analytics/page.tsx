"use client";

import { useEffect, useState } from "react";
import { Spin, Card, Select } from "antd";
import BodyPartChart from "@/components/BodyPartChart";
import PageLoader from "@/components/PageLoader";
import ImageGallery from "@/components/ImageGallery";

type Measurement = {
  id: string;
  date: string;
  weight: number;
  chestWidth: number;
  shoulderWidth: number;
  waistWidth: number;
  leftArm: number;
  rightArm: number;
  leftWrist: number;
  rightWrist: number;
  leftForearm: number;
  rightForearm: number;
  leftThigh: number;
  rightThigh: number;
};

const measurementOptions = [
  { label: "Weight", value: "weight" },
  { label: "Chest Width", value: "chestWidth" },
  { label: "Shoulder Width", value: "shoulderWidth" },
  { label: "Waist Width", value: "waistWidth" },
  { label: "Left Arm", value: "leftArm" },
  { label: "Right Arm", value: "rightArm" },
  { label: "Left Wrist", value: "leftWrist" },
  { label: "Right Wrist", value: "rightWrist" },
  { label: "Left Forearm", value: "leftForearm" },
  { label: "Right Forearm", value: "rightForearm" },
  { label: "Left Thigh", value: "leftThigh" },
  { label: "Right Thigh", value: "rightThigh" },
];

export default function Analytics() {
  const [data, setData] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeasurement, setSelectedMeasurement] = useState("weight"); // Default: Weight Graph

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/measurements", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch measurements");

        const measurements = await res.json();
        console.log("Fetched Data:", measurements); // Debugging log
        setData(measurements);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const prepareChartData = (key: keyof Measurement) => {
    const formattedData = data
      .map((record) => ({
        date: new Date(record.date).toISOString().split("T")[0],
        value: record[key] !== null ? Number(record[key]) : NaN,
      }))
      .filter((entry) => !isNaN(entry.value))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return formattedData;
  };

  return (
    <PageLoader>
      <Card
        title="Body Growth Analytics"
        style={{ width: "100%", padding: "10px" }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Graph Selector */}
            <Select
              style={{ width: "300px", marginBottom: "20px" }}
              value={selectedMeasurement}
              onChange={setSelectedMeasurement}
              options={measurementOptions}
            />

            {/* Display Selected Graph */}
            <BodyPartChart
              title={selectedMeasurement}
              data={prepareChartData(selectedMeasurement as keyof Measurement)}
            />
          </>
        )}
      </Card>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="text-2xl font-bold my-6">My Body Growth Gallery</h1>
        <ImageGallery />
      </div>
    </PageLoader>
  );
}
