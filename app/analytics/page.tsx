"use client";

import { Typography } from "antd";
import PageLoader from "@/components/PageLoader";

const { Title } = Typography;

export default function Analytics() {
  return (
    <PageLoader>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={2}>Analytics</Title>
        <p>Here you will be able to see trends and graphs for your body measurements.</p>
      </div>
    </PageLoader>
  );
}
