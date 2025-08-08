"use client";
import React from "react";
import { Button, Form, ConfigProvider, Input } from "antd";
import theme from "./themeConfig";

const HomePage = () => {

  const [shortenForm] = Form.useForm();

  return (
    <ConfigProvider theme={theme}>
      <div style={{ padding: 100, height: "100vh" }}>
        <div>
          <Form
            form={shortenForm}
            name="shorten"
            layout="horizontal"
            size={"large"}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={() => console.log("clicked finish")}
          >
            <Form.Item label="URL">
              <Input
                placeholder="example: https://www.google.com/"
                name="url"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 48 }} wrapperCol={{ offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Shorten
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default HomePage;
