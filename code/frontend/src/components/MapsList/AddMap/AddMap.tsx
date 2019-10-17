import React from "react";
import { Button, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";

type LoginFormProps = FormComponentProps;

function AddMap(props: LoginFormProps): JSX.Element {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form>
      <Form.Item>
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Please input map name!" }]
        })(<Input placeholder="Map name" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("size_height", {
          rules: [{ required: true, message: "Please input map height!" }]
        })(<Input type="password" placeholder="Height" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("size_width", {
          rules: [{ required: true, message: "Please input map width!" }]
        })(<Input type="password" placeholder="Width" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export const LoginForm = Form.create()(AddMap);