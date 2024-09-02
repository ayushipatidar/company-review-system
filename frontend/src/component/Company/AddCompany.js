import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Form, Input, DatePicker, Upload, message } from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import "./index.css";
import instance from "../../config/axios";

async function createCompany(formData) {
  const response = await instance.post("/api/v1/company/add", formData);
  return response.data;
}

const AddCompany = ({ setIsmodalOpen, isModalOpen }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCompany,
    onError: () => {
      message.error("Something went wrong!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyList"] });
      message.success("Company added successfully!");
    },
  });

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (data) => {
    let newData = { uploadFile: data.uploadFile[0], ...data };
    mutation.mutate(newData);
    form.resetFields("");
    setIsmodalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => {
        form.resetFields("");
        setIsmodalOpen(false);
      }}
      onOk={() => setIsmodalOpen(false)}
      footer={null}
      centered
      className="custom-modal"
    >
      <div className="modal-header">
        <div className="corner-container">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
        <h2 className="modal-title">Add Company</h2>
      </div>
      <Form
        form={form}
        layout="vertical"
        name="add_company_form"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Company name"
          rules={[
            { required: true, message: "Please enter the company name!" },
          ]}
        >
          <Input placeholder="Enter..." />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Please select a city!" }]}
        >
          <Input
            placeholder="Select Location"
            suffix={<EnvironmentOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="foundedOn"
          label="Founded on"
          rules={[
            { required: true, message: "Please select the founded date!" },
          ]}
        >
          <DatePicker
            placeholder="DD/MM/YYYY"
            style={{ width: "100%" }}
            suffixIcon={<CalendarOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: "Please enter the state!" }]}
        >
          <Input placeholder="Enter..." />
        </Form.Item>
        <Form.Item
          name="uploadFile"
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            name="logo"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload logo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="common-button align-btn">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCompany;
