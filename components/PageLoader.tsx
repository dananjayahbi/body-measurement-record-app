"use client";

import { useState, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
      >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
