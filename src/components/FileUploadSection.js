import React, { useState } from "react";
import { Upload, Button, message, Alert, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Paragraph } = Typography;

const FileUploadSection = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });

    setUploading(true);

    try {
      const response = await axios.post(
        "http://localhost:8070/api/agent/upload-sales-data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFileList([]);
      setSuccess(true);
      message.success("Upload successful!");
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Upload failed.");
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
          message="Upload Successful!"
          description="Your sales data has been uploaded and is being processed. You can now use the chat to analyze your data."
          type="success"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
};

export default FileUploadSection;
