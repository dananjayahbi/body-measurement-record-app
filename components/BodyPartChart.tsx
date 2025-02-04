"use client";

import { Line } from "@ant-design/plots";

type BodyPartChartProps = {
  title: string;
  data: { date: string; value: number }[];
};

export default function BodyPartChart({ title, data }: BodyPartChartProps) {
  if (!data || data.length === 0) {
    console.warn(`No data available for ${title}`);
    return <p style={{ textAlign: "center", color: "#aaa" }}>No data available</p>;
  }

  const config = {
    data,
    xField: "date",
    yField: "value",
    point: {
      shapeField: "circle",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    height: 300,
    smooth: true,
  };

  return (
    <div style={{ width: "100%", marginBottom: "10px" }}>
      <h4 style={{ textAlign: "center" }}>{title}</h4>
      <Line {...config} />
    </div>
  );
}
