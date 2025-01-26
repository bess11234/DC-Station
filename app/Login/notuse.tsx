"use client"
import "antd/dist/reset.css"
import { Form, Input, Button, Checkbox } from "antd";
import axios from 'axios';
import '@ant-design/v5-patch-for-react-19';

interface FormValues {
  username: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const onFinish = (values: FormValues) => {
    const {username, password} = values
    axios.post('http://localhost:3001/validatePassword', {username, password})
    .then(res => {
      if(res.data.validation){
        alert('Your password is correct, thank you for your service')
      }
      else{
        alert('Your password is not correct. Please try again.')
      }
    })
    console.log('Received values of form: ', values);
  };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8
      }}
      wrapperCol={{
        span: 16
      }}
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
