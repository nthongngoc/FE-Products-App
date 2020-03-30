import React from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { useState } from "react";
import "./itemForm.css";

const cleanObj = obj => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
};

const beforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return false;
};

const ItemModal = ({
  isOpenModal,
  handleCloseModal,
  modalTitle,
  initialValues,
  handleSubmit
}) => {
  const [form] = Form.useForm();
  const onSubmit = formValues => {
    if (formValues.image.fileList.length > 0) {
      handleSubmit(formValues);
      handleCloseModal();
      form.resetFields();
      setshowUploadField(true);
    } else {
      message.error("Please upload your product's image!");
    }
  };

  const [showUploadField, setshowUploadField] = useState(true);
  const [showReplaceImageButton, setShowReplaceImageButton] = useState(true);

  return (
    <Modal
      title={modalTitle}
      visible={isOpenModal}
      closable={false}
      footer={() => {}}>
      <Form
        form={form}
        name="basic"
        initialValues={initialValues}
        onFinish={onSubmit}>
        <Form.Item
          label="Image"
          name="image"
          rules={
            modalTitle === "Add item"
              ? [
                  {
                    required: true,
                    message: "Please upload your product's image!"
                  }
                ]
              : []
          }>
          <Upload
            className="avatar-uploader"
            name="avatar"
            listType="picture-card"
            beforeUpload={beforeUpload}
            onRemove={file => {
              cleanObj(file);
              setShowReplaceImageButton(false);
            }}
            onChange={file => {
              if (file.fileList.length > 0) {
                setshowUploadField(false);
              } else {
                setshowUploadField(true);
              }
            }}>
            {showUploadField &&
              (initialValues.imageURL && showReplaceImageButton ? (
                <>
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={initialValues.imageURL}
                    alt=""
                    className="avatar"
                  />
                  <p style={{ fontWeight: "bold" }}>Replace image</p>
                </>
              ) : (
                "upload"
              ))}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Product name"
          name="name"
          rules={[
            { required: true, message: "Please input your product's name!" }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input your product's price!" }
          ]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Please input your product's quatity!" }
          ]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="_id"></Form.Item>

        <Form.Item>
          <Button className="handle-btn" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            className="handle-btn"
            type="default"
            onClick={handleCloseModal}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ItemModal;
