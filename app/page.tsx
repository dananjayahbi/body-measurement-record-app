"use client";

import AddRecordModal from "@/components/AddRecordModal";
import { Typography } from "antd";
import PageLoader from "@/components/PageLoader";

const { Title } = Typography;

export default function Home() {
  return (
    <PageLoader>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={2}>Hey again 👋 <br /> Add your body measurements of this week.</Title>
        <AddRecordModal refreshData={() => {}} />
            </div>
    </PageLoader>
  );
}
