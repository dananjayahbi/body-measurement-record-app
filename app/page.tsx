"use client";

import AddRecordModal from "@/components/AddRecordModal";
import { Typography } from "antd";
import PageLoader from "@/components/PageLoader";
import ImageGallery from "@/components/ImageGallery";

const { Title } = Typography;

export default function Home() {
  return (
    <PageLoader>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={2}>
          Hey again 👋 <br /> Add your body measurements of this week.
        </Title>
        <AddRecordModal refreshData={() => {}} />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="text-2xl font-bold my-6">My Body Growth Gallery</h1>
        <ImageGallery />
      </div>
    </PageLoader>
  );
}
