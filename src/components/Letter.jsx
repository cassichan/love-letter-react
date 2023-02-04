import { useEffect, useState } from "react";

import { Button, Form, Input, Upload, Cascader, message } from "antd";

export default function Letter() {
  const [letterForm, setLetterForm] = useState({});

  const handleForm = (e) => {
    setLetterForm({ ...letterForm, [e.target.name]: e.target.value });
  };

  const onFinishFailed = () => {
    message.error("Submission failed!");
  };

  const onFinish = (values) => {
    const newLetter = {
      recipient: values.recipient,
      sender: values.sender,
      message: values.message,
      address: values.address,
      email: values.email,
    };

    fetch(
      "http://localhost:5001/love-letter-api-cc/us-central1/api/letter/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLetter),
      }
    )
      .then((response) => response.json())
      .then((data) => setLetterForm(data))
      .catch(console.error);
  };

  return (
    <>
      <Form
        className="add-letter"
        name="add-letter"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Dear"
          labelAlign="right"
          name="recipient"
          onChange={handleForm}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          onChange={handleForm}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          onChange={handleForm}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="address"
          name="address"
          onChange={handleForm}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="With love,"
          name="sender"
          onChange={handleForm}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Button">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
}
