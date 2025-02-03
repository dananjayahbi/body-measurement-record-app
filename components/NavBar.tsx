"use client";

import { Layout, Menu, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";

const { Header } = Layout;

export default function NavBar() {
  const router = useRouter();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3B3D40",
        },
        components: {
          Layout: {
            headerBg: "#252627",
          },
          Menu: {
            itemColor: "#ffffff",
            itemHoverColor: "#000000",
            itemBg: "#000",
            itemActiveBg: "#000",
          },
        },
      }}
    >
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          onClick={({ key }) => router.push(key)}
          items={[
            { key: "/", label: "Home" },
            { key: "/past-records", label: "Past Records" },
            { key: "/analytics", label: "Analytics" },
          ]}
          style={{ backgroundColor: "#252627", borderBottom: "none" }}
        />
      </Header>
    </ConfigProvider>
  );
}
