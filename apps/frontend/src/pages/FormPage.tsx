import { Button, Form, Input, Typography, Card, Space } from "antd";
import { useState } from "react";

const { Title } = Typography;

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function FormPage() {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<string[]>([]);

  const onFinish = (values: FormValues) => {
    console.log("Form values:", values);
  };

  const validatePassword = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please input your password!"));
    }

    const errors: string[] = [];

    if (value.length < 8) {
      errors.push("at least 8 characters");
    }

    if (!/[A-Z]/.test(value)) {
      errors.push("at least one uppercase letter");
    }

    if (!/[0-9]/.test(value)) {
      errors.push("at least one number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push("at least one special character");
    }

    setErrors(errors);
    if (errors.length > 0) {
      return Promise.reject();
    }

    return Promise.resolve();
  };

  return (
    <div>
      <Title level={2}>Form</Title>

      <Card title="User Registration Form" style={{ maxWidth: 600 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your name!" },
              { min: 2, message: "Name must be at least 2 characters long!" },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          {errors.length > 0 && (
            <ul style={{ color: "red", marginBottom: 16 }}>
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={() => form.resetFields()}>Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
