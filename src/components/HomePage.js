import React from "react";
import { Row, Col, Card, Divider } from "antd";
import FileUploadSection from "./FileUploadSection";
import ChatSection from "./ChatSection";

const HomePage = () => {
  return (
    <div className="home-page">
      <Divider orientation="left">FMCG Brand Management Dashboard</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Upload Sales Data" bordered={false}>
            <FileUploadSection />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Chat with Agent X" bordered={false}>
            <ChatSection />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
