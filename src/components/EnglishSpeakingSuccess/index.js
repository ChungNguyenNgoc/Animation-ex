import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button, Select } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { globalData, optionsTopic, optionsType } from "./data";

const EnglishSpeakingSuccess = () => {
  const [type, setType] = useState(null);
  const [topics, setTopics] = useState([]);
  const [phrase, setPhrase] = useState(null);
  const [dataToRandom, setDataToRandom] = useState([]);

  useEffect(() => {
    const dataFilter = globalData.filter((item) => {
      if (type !== null && type !== item.type) {
        return false;
      }
      if (topics.length > 0 && !topics.includes(item.unit)) {
        return false;
      }
      return true;
    });

    const newData = dataFilter.reduce((result, it) => {
      it.data.forEach((dataItem) => {
        result.push(dataItem);
      });
      return result;
    }, []);

    setDataToRandom(newData);
  }, [type, topics]);

  console.debug("dataToRandom: ", dataToRandom);

  const handleRandom = () => {
    const random = Math.floor(Math.random() * dataToRandom.length);
    setPhrase(dataToRandom[random]);
  };

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
                options={optionsType}
                className="english-select"
                getPopupContainer={(trigger) => trigger.parentNode}
              />
            </div>
            <div className="english-speaking-success_wrap_content_list-filter_item">
              <div className="english-speaking-success_wrap_content_list-filter_item_label">
                Topics
              </div>
              <Select
                mode="multiple"
                onChange={(value) => setTopics(value)}
                placeholder={"Topic"}
                options={optionsTopic}
                className="english-select"
                getPopupContainer={(trigger) => trigger.parentNode}
              />
            </div>
          </div>
          <div className="english-speaking-success_wrap_content_phrase">
            {phrase != null ? phrase : `Click "${"Random"}" to practice`}
          </div>
          <Button onClick={handleRandom}>Random</Button>
        </div>
      </section>
    </div>
  );
};

export default EnglishSpeakingSuccess;
