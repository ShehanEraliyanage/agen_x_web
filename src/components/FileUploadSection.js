import React, { useState } from "react";
import { Upload, Button, message, Alert, Typography, Card, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import apiService from "../services/api";

const { Paragraph, Title } = Typography;

const FileUploadSection = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async () => {
    const file = fileList[0];

    setUploading(true);
    setErrorMessage("");

    try {
      const response = await apiService.uploadSalesData(file);

      setFileList([]);
      setSuccess(true);
      setResponseMessage(response.message || "Upload successful!");
      message.success(response.message || "Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      let errorMsg = "Upload failed.";

      if (
        error.name === "NetworkError" ||
        error.message.includes("Network Error")
      ) {
        errorMsg =
          "Network error: Cannot connect to server. CORS policy might be blocking the request.";
      } else if (error.response) {
        errorMsg = `Server error: ${error.response.status} ${
          error.response.data.message || ""
        }`;
      }

      setErrorMessage(errorMsg);
      message.error(errorMsg);
      setSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setSuccess(false);
    },
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
      if (!isCSV) {
        message.error("You can only upload CSV files!");
        return Upload.LIST_IGNORE;
      }

      setFileList([...fileList, file]);
      setSuccess(false);
      return false;
    },
    fileList,
  };

  return (
    <Card
      bordered={false}
      style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={4}>Upload Sales Data</Title>
        <Paragraph>
          Upload your sales data as a CSV file to analyze trends, track
          performance, and receive insights.
        </Paragraph>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select CSV File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>

        {success && (
          <Alert
            message="Upload Successful!"
            description={
              responseMessage ||
              "Your sales data has been uploaded and is being processed. You can now use the chat to analyze your data."
            }
            type="success"
            showIcon
          />
        )}

        {errorMessage && (
          <Alert
            message="Upload Failed"
            description={errorMessage}
            type="error"
            showIcon
          />
        )}
      </Space>
    </Card>
  );
};

export default FileUploadSection;
