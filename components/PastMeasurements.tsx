"use client";

import { useEffect, useState } from "react";
import { Table, Image, Card, Spin, Button, Modal, message } from "antd";
import styles from "@/styles/Table.module.css"; // Create this CSS file for styling
import PageLoader from "@/components/PageLoader";
import MeasurementForm from "./MeasurementForm";

type MeasurementData = {
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
  imageUrl: string;
};

export default function PastMeasurements() {
  const [data, setData] = useState<MeasurementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editRecord, setEditRecord] = useState<MeasurementData | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/measurements", { cache: "no-store" }); // ✅ Prevents cache issues
    const newData = await res.json();
    setData(newData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Delete
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      content:
        "This action cannot be undone and will also remove the associated image.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        const res = await fetch("/api/measurements", {
          method: "DELETE",
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          message.success("Record deleted successfully!");
          fetchData(); // Refresh records
        } else {
          message.error("Failed to delete record.");
        }
      },
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) =>
        url ? (
          <Image
            width={120}
            src={`/api/images/${url.split("/").pop()}`} // ✅ Use dynamic API route
            alt="Progress Image"
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Weight (kg)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Chest (cm)",
      dataIndex: "chestWidth",
      key: "chestWidth",
    },
    {
      title: "Shoulder Width (cm)",
      dataIndex: "shoulderWidth",
      key: "shoulderWidth",
    },
    {
      title: "Waist Width (cm)",
      dataIndex: "waistWidth",
      key: "waistWidth",
    },
    {
      title: "Left Arm (cm)",
      dataIndex: "leftArm",
      key: "leftArm",
    },
    {
      title: "Right Arm (cm)",
      dataIndex: "rightArm",
      key: "rightArm",
    },
    {
      title: "Left Wrist (cm)",
      dataIndex: "leftWrist",
      key: "leftWrist",
    },
    {
      title: "Right Wrist (cm)",
      dataIndex: "rightWrist",
      key: "rightWrist",
    },
    {
      title: "Left Forearm (cm)",
      dataIndex: "leftForearm",
      key: "leftForearm",
    },
    {
      title: "Right Forearm (cm)",
      dataIndex: "rightForearm",
      key: "rightForearm",
    },
    {
      title: "Left Thigh (cm)",
      dataIndex: "leftThigh",
      key: "leftThigh",
    },
    {
      title: "Right Thigh (cm)",
      dataIndex: "rightThigh",
      key: "rightThigh",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: MeasurementData) => (
        <>
          <Button type="link" onClick={() => setEditRecord(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageLoader>
      <Card className={styles.fullWidthTable}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>
      {/* Edit Modal */}
      {editRecord && (
        <Modal
          title="Edit Measurement"
          open={true}
          onCancel={() => setEditRecord(null)}
          footer={null}
        >
          <MeasurementForm
            closeModal={() => {
              setEditRecord(null);
              fetchData();
            }}
            initialData={editRecord}
          />
        </Modal>
      )}
    </PageLoader>
  );
}
