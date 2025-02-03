"use client";

import PastMeasurements from "@/components/PastMeasurements";
import AddRecordModal from "@/components/AddRecordModal";
import { Typography } from "antd";
import PageLoader from "@/components/PageLoader";
import { useState } from "react";

const { Title } = Typography;

export default function PastRecords() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshData = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <PageLoader>
      <div style={{ padding: "20px" }}>
        <Title level={2}>Past Records</Title>
        <AddRecordModal refreshData={refreshData} />
        <PastMeasurements key={refreshKey} /> {/* ✅ Force component reload */}
      </div>
    </PageLoader>
  );
}
