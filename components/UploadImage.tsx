"use client";

import { useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import '@ant-design/v5-patch-for-react-19';

export default function UploadImage({ onUpload }: { onUpload: (url: string) => void }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async ({ file }: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    onUpload(data.url);
    setLoading(false);
  };

  return (
    <Upload customRequest={handleUpload} showUploadList={false}>
      <Button icon={<UploadOutlined />} loading={loading}>Upload Image</Button>
    </Upload>
  );
}
