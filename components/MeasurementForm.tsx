"use client";

interface MeasurementData {
  id: string;
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
}

import { useState, useEffect } from "react";
import { Form, InputNumber, Button, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function MeasurementForm({
  closeModal,
  initialData,
}: {
  closeModal: () => void;
  initialData?: MeasurementData;
}) {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData]);

  const handleUploadChange = ({ file }: any) => {
    setFile(file);
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    const formData = new FormData();
    if (initialData?.id) {
      formData.append("id", initialData.id); // ✅ Ensure the ID is included
    }
    formData.append("data", JSON.stringify(values));

    if (file) {
      formData.append("file", file); // ✅ Add new file if exists
    }

    const response = await fetch("/api/measurements", {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      message.success("Measurement updated successfully!");
      closeModal();
    } else {
      message.error("Error updating data.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* Image Upload */}
        <Row gutter={16} justify="center">
          <Col span={24}>
            <Upload beforeUpload={() => false} onChange={handleUploadChange}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Col>
        </Row>

        {/* Weight & Chest Width */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Weight (kg)"
              name="weight"
              rules={[{ required: true, message: "Please input your weight!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Chest Width (cm)"
              name="chestWidth"
              rules={[
                { required: true, message: "Please input your chest width!" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Shoulder Width & Waist Width */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Shoulder Width (cm)"
              name="shoulderWidth"
              rules={[
                {
                  required: true,
                  message: "Please input your shoulder width!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Waist Width (cm)"
              name="waistWidth"
              rules={[
                { required: true, message: "Please input your waist width!" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Arms */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Left Arm (cm)"
              name="leftArm"
              rules={[
                {
                  required: true,
                  message: "Please input your left arm measurement!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Right Arm (cm)"
              name="rightArm"
              rules={[
                {
                  required: true,
                  message: "Please input your right arm measurement!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Wrists */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Left Wrist (cm)"
              name="leftWrist"
              rules={[
                {
                  required: true,
                  message: "Please input your left wrist measurement!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Right Wrist (cm)"
              name="rightWrist"
              rules={[
                {
                  required: true,
                  message: "Please input your right wrist measurement!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Forearms */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Left Forearm (cm)"
              name="leftForearm"
              rules={[
                {
                  required: true,
                  message: "Please input your left forearm measurement!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Right Forearm (cm)"
              name="rightForearm"
              rules={[
                {
                  required: true,
                  message: "Please input your right forearm measurement!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Thighs */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Left Thigh (cm)"
              name="leftThigh"
              rules={[
                {
                  required: true,
                  message: "Please input your left thigh measurement!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Right Thigh (cm)"
              name="rightThigh"
              rules={[
                {
                  required: true,
                  message: "Please input your right thigh measurement!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row justify="center">
          <Col>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Data
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
