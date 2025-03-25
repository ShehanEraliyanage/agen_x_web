import React, { useState } from "react";
import { Upload, Button, message, Alert, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import apiService from "../services/api";

const { Paragraph } = Typography;

const FileUploadSection = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  console.log("🚀 ~ FileUploadSection ~ responseMessage:", responseMessage);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async () => {
    const file = fileList[0];

    setUploading(true);
    setErrorMessage("");

    try {
      const response = await apiService.uploadSalesData(file);

      setFileList([]);
      setSuccess(true);
      setResponseMessage(response.id);
      message.success(response.message && response.id);
      console.log("Upload response:", response);
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
      // Check if file is CSV
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
    <div>
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
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>

      {success && (
        <Alert
          message="Upload Successful! and Your ID ->"
          description={
            responseMessage ||
            "Your sales data has been uploaded and is being processed. You can now use the chat to analyze your data."
          }
          type="success"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      {errorMessage && (
        <Alert
          message="Upload Failed"
          description={errorMessage}
          type="error"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
};

export default FileUploadSection;
