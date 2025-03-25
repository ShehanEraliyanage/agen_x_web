import React from "react";
import { Layout, Typography } from "antd";
import HomePage from "./components/HomePage";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="layout">
      <Header style={{ background: "#fff", padding: "0 20px" }}>
        <Title level={3} style={{ margin: "16px 0" }}>
          Agent X - FMCG Brand Management
        </Title>
      </Header>
      <Content style={{ padding: "0 50px", minHeight: "calc(100vh - 134px)" }}>
        <div className="site-layout-content">
          <HomePage />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Agent X ©{new Date().getFullYear()} Created by Your Company
      </Footer>
    </Layout>
  );
}

export default App;
