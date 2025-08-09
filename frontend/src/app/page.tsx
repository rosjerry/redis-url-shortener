"use client";

import React, { useState, useEffect } from "react";
import { Button, Form, ConfigProvider, Input, List } from "antd";
import theme from "./themeConfig";
import { fetchAllLinks, createLink } from "./lib/data";

const HomePage = () => {
  const [shortenForm] = Form.useForm();
  const [links, setLinks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadLinks = async () => {
      setLoading(true);
      try {
        const data = await fetchAllLinks();
        setLinks(data);
      } catch (error) {
        console.error("Failed to load links:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, []);

  const linksArray = Object.entries(links).map(([shortURL, longURL]) => ({
    shortURL,
    longURL,
    fullShortURL: `http://localhost:3001/${shortURL}`,
  }));

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const urlValidator = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please enter a URL"));
    }

    if (!validateURL(value)) {
      return Promise.reject(new Error("Please enter a valid URL"));
    }

    return Promise.resolve();
  };

  const handleSubmit = async (values: { longUrl: string }) => {
    setSubmitting(true);
    try {
      const result = await createLink(values.longUrl); 
      setLinks(prevLinks => ({
        [result.shortURL]: result.longURL,
        ...prevLinks,
      }));
      
      shortenForm.resetFields();
      console.log('URL shortened successfully:', result);
    } catch (error) {
      console.error('Failed to create short URL:', error);
    } finally {
      setSubmitting(false);
    }
  };


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
          onFinish={handleSubmit}
          onFinishFailed={(value) => {
            console.log("failed", value);
          }}
        >
          <Form.Item
            label="URL"
            name="longUrl"
            rules={[
              {
                required: true,
                message: "Please enter URL",
                validator: urlValidator,
              },
            ]}
          >
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
          margin: "auto",
        }}
        itemLayout="horizontal"
        dataSource={linksArray}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a
                  href={item.fullShortURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.shortURL}
                </a>
              }
              description={item.longURL}
            />
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
};

export default HomePage;
