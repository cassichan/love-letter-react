import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import '../styles/letter.css'

const { TextArea } = Input

export default function Letter() {
  const [letterForm, setLetterForm] = useState({})
  const [form] = Form.useForm()

  const handleForm = e => {
    setLetterForm({ ...letterForm, [e.target.name]: e.target.value })
  }

  const onFinishFailed = () => {
    message.error('Submission failed!')
  }

  const resetForm = () => {
    form.setFieldsValue({
      recipient: '',
      message: '',
      email: '',
      address: '',
      sender: '',
    })
  }

  const onFinish = values => {
    const newLetter = {
      recipient: values.recipient,
      sender: values.sender,
      message: values.message,
      address: values.address,
      email: values.email,
    }

    fetch(
      //   "http://localhost:5001/love-letter-api-cc/us-central1/api/letter/add",
      'https://love-letter-api-cc.web.app/letter/add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLetter),
      }
    )
      .then(response => response.json())
      .then(data => message.success('Letter delivered! ❤️'))
      .catch(console.error)
    resetForm()
  }

  return (
    <>
      <Form
        form={form}
        className="add-letter"
        name="add-letter"
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
      >
        <div className="letter-message">
          <Form.Item
            className="form-item"
            label="Dear"
            name="recipient"
            onChange={handleForm}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Cass" />
          </Form.Item>
          <Form.Item
            className="form-item message"
            label="Message"
            name="message"
            onChange={handleForm}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              className="form-item"
              rows={7}
              placeholder="You are a strong, intelligent woman with a huge heart. You are capable of anything you set your mind to. You do not have to be perfect to be loved and I love you just as you are. Please accept my letter ❤️"
            />
          </Form.Item>
          <Form.Item label="With love," name="sender" onChange={handleForm}>
            <Input placeholder="Cass" />
          </Form.Item>
        </div>
        <div className="recipient-contact">
          <div className="recipient-contact-items">
            <Form.Item name="email" onChange={handleForm}>
              <Input placeholder="cass@gmail.com" />
            </Form.Item>
            <Form.Item name="address" onChange={handleForm}>
              <TextArea placeholder="4520 Self Love Lane, Boca Raton, FL" rows={2} />
            </Form.Item>
          </div>
        </div>
        <div className="stamp-btn-container">
          <div className="stamp-container">
            <img
              alt="stamp"
              className="stamp-img"
              src="https://cdn.pixabay.com/photo/2014/04/02/17/04/red-307844_960_720.png"
            ></img>
          </div>
          <Form.Item>
            <Button htmlType="submit">Send! 📮</Button>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
