import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Form, Input, Rate, message, Upload } from "antd";
import {
  UploadOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

import instance from "../../config/axios";

async function createCompany(formData) {
  const response = await instance.post("/api/v1/review/add", formData);
  return response.data;
}

const AddReview = ({ setIsmodalOpen, isModalOpen }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCompany,
    onError: () => {
      message.error("Something went wrong!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", id] });
      message.success("Review added successfully!");
    },
  });

  const onFinish = (data) => {
    data.companyId = id;
    mutation.mutate(data);
    form.resetFields("");
    setIsmodalOpen(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
        <h2 className="modal-title">Add Review</h2>
      </div>
      <Form
        form={form}
        layout="vertical"
        name="add_company_form"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          label="Full name"
          rules={[{ required: true, message: "Please enter the full name!" }]}
        >
          <Input placeholder="Enter..." />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: "Please enter subject!" }]}
        >
          <Input
            placeholder="Enter Subject"
          />
        </Form.Item>
        <Form.Item name="reviewText" label="Enter your text">
          <Input placeholder="Enter..." />
        </Form.Item>
        <Form.Item
          name="uploadFile"
          label="Upload Profile"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload an profile!" }]}
        >
          <Upload
            name="logo"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload profile</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="rating"
          label={<span className="bold-label">Rating</span>}
          rules={[{ required: true, message: "Please provide a rating!" }]}
        >
          <Rate defaultValue={0} style={{ fontSize: "24px" }} />
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

export default AddReview;
