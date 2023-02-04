import { useState } from "react";

import { Button, Form, Input, message } from "antd";

export default function Letter() {
  const [letterForm, setLetterForm] = useState({});
  const [form] = Form.useForm();

  const handleForm = (e) => {
    setLetterForm({ ...letterForm, [e.target.name]: e.target.value });
  };

  const onFinishFailed = () => {
    message.error("Submission failed!");
  };

  const resetForm = () => {
    form.setFieldsValue({
      recipient: "",
      message: "",
      email: "",
      address: "",
      sender: "",
    });
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
      //   "http://localhost:5001/love-letter-api-cc/us-central1/api/letter/add",
      "https://love-letter-api-cc.web.app/letter/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLetter),
      }
    )
      .then((response) => response.json())
      .then((data) => message.success("Letter delivered! ❤️"))
      .catch(console.error);
    resetForm();
  };

  return (
    <>
      <Form
        form={form}
        className="add-letter"
        name="add-letter"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Dear"
          name="recipient"
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
        <Form.Item label="email" name="email" onChange={handleForm}>
          <Input />
        </Form.Item>
        <Form.Item label="address" name="address" onChange={handleForm}>
          <Input />
        </Form.Item>
        <Form.Item label="With love," name="sender" onChange={handleForm}>
          <Input />
        </Form.Item>

        <Form.Item label="Button">
          <Button htmlType="submit">Send!</Button>
        </Form.Item>
      </Form>
    </>
  );
}
