"use client";

import { Layout, ConfigProvider, App } from "antd";
import NavBar from "@/components/NavBar";
import PageLoader from "@/components/PageLoader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLoader>
      <ConfigProvider>
        <App>
          <Layout style={{ minHeight: "100vh" }}>
            <NavBar />
            <Layout.Content style={{ padding: "20px" }}>
              {children}
            </Layout.Content>
          </Layout>
        </App>
      </ConfigProvider>
    </PageLoader>
  );
}
