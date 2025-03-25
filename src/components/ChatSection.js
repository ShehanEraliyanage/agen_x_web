import React, { useState } from "react";
import {
  Input,
  Button,
  List,
  Avatar,
  Spin,
  Typography,
  Card,
  Space,
} from "antd";
import { SendOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Paragraph, Title } = Typography;

const ChatSection = () => {
  const [messages, setMessages] = useState([
    {
      type: "agent",
      content:
        "Hello! I am Agent X, your FMCG brand management assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate API call to OpenAI - replace with actual implementation
    setTimeout(() => {
      const botResponse = {
        type: "agent",
        content: `This is a simulated response. In a real implementation, this would connect to OpenAI or your backend API to generate a response to: "${input}"`,
      };
      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 1000);

    // Actual implementation would be:
    // try {
    //   const response = await axios.post('http://localhost:8070/api/agent/chat', { message: input });
    //   const botResponse = {
    //     type: 'agent',
    //     content: response.data.message,
    //   };
    //   setMessages(prev => [...prev, botResponse]);
    // } catch (error) {
    //   console.error('Error getting response:', error);
    //   const errorResponse = {
    //     type: 'agent',
    //     content: 'Sorry, I encountered an error processing your request.',
    //   };
    //   setMessages(prev => [...prev, errorResponse]);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card
      bordered={false}
      style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={4}>Chat with Agent X</Title>
        <Paragraph>
          Ask Agent X about market trends, campaign performance, consumer
          sentiment, or any other brand management insights.
        </Paragraph>

        <List
          className="chat-list"
          style={{
            overflow: "auto",
            flex: 1,
            maxHeight: "300px",
            border: "1px solid #f0f0f0",
            borderRadius: "4px",
            padding: "8px",
          }}
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <List.Item
              style={{
                justifyContent:
                  message.type === "user" ? "flex-end" : "flex-start",
              }}
            >
              <List.Item.Meta
                avatar={
                  message.type === "user" ? (
                    <Avatar
                      icon={<UserOutlined />}
                      style={{ backgroundColor: "#1890ff" }}
                    />
                  ) : (
                    <Avatar
                      icon={<RobotOutlined />}
                      style={{ backgroundColor: "#52c41a" }}
                    />
                  )
                }
                title={message.type === "user" ? "You" : "Agent X"}
                description={
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {message.content}
                  </div>
                }
                style={{
                  maxWidth: "80%",
                  padding: "8px",
                  backgroundColor:
                    message.type === "user" ? "#e6f7ff" : "#f6ffed",
                  borderRadius: "8px",
                }}
              />
            </List.Item>
          )}
        />

        {loading && (
          <Spin tip="Agent X is thinking..." style={{ marginBottom: "8px" }} />
        )}

        <div style={{ display: "flex" }}>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ marginRight: "8px" }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!input.trim() || loading}
          >
            Send
          </Button>
        </div>
      </Space>
    </Card>
  );
};

export default ChatSection;
