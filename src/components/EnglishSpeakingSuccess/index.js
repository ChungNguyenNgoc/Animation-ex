import React, { useState } from "react";
import "./style.scss";
import { Button, Select } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { optionTopic, optionType } from "./data";

const EnglishSpeakingSuccess = () => {
  const [type, setType] = useState(null);
  const [topic, setTopic] = useState(null);

  return (
    <div className="english-speaking-success">
      <section className="english-speaking-success_wrap">
        <h1 className="english-speaking-success_wrap_title">
          English Speaking Success
        </h1>
        <div className="english-speaking-success_wrap_content">
          <div className="english-speaking-success_wrap_content_header">
            <GithubOutlined />
            <h2 className="english-speaking-success_wrap_content_header_title">
              Let's choose the topic as you want to practice
            </h2>
          </div>
          <div className="english-speaking-success_wrap_content_list-filter">
            <div className="english-speaking-success_wrap_content_list-filter_item">
              <div className="english-speaking-success_wrap_content_list-filter_item_label">
                Type
              </div>
              <Select
                defaultValue={null}
                onChange={(value) => setType(value)}
                placeholder={"Type"}
                options={optionType}
                className="english-select"
                getPopupContainer={(trigger) => trigger.parentNode}
              />
            </div>
            <div className="english-speaking-success_wrap_content_list-filter_item">
              <div className="english-speaking-success_wrap_content_list-filter_item_label">
                Topic
              </div>
              <Select
                mode="multiple"
                defaultValue={null}
                onChange={(value) => setTopic(value)}
                placeholder={"Topic"}
                options={optionTopic}
                className="english-select"
                getPopupContainer={(trigger) => trigger.parentNode}
              />
            </div>
          </div>
          <div className="english-speaking-success_wrap_content_phrase">
            How are you today?
          </div>
          <Button>Random</Button>
        </div>
      </section>
    </div>
  );
};

export default EnglishSpeakingSuccess;
