import { useState } from 'react'
import { Link } from 'react-router-dom'
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
            <Input placeholder="name" />
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
              placeholder="You must be a meta tag 'cause I can't get you out of my <head> ❤️"
            />
          </Form.Item>
          <Form.Item label="With love," name="sender" onChange={handleForm}>
            <Input placeholder="name" />
          </Form.Item>
        </div>
        <div className="recipient-contact">
          <div className="recipient-contact-items">
            <Form.Item name="email" onChange={handleForm}>
              <Input placeholder="valentine@gmail.com" />
            </Form.Item>
            <Form.Item name="address" onChange={handleForm}>
              <TextArea placeholder="4520 Love Lane, Boca Raton, FL" rows={2} />
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
      <Link to={`/`}>
        <Button type="link" htmlType="button">
          View all love letters 😍 -> 
        </Button>
      </Link>
    </>
  )
}
