"use client";
import React from "react";
import { Button, Form, ConfigProvider, Input, List } from "antd";
import theme from "./themeConfig";

const HomePage = () => {
  const [shortenForm] = Form.useForm();

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <ConfigProvider theme={theme}>
      <div style={{ padding: 100 }}>
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
            <Input placeholder="example: https://www.google.com/" name="url" />
          </Form.Item>

          <Form.Item style={{ marginTop: 48 }} wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Shorten
            </Button>
          </Form.Item>
        </Form>
      </div>
      <List
        style={{
          width: 600,
          margin: "auto"
        }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
};

export default HomePage;
