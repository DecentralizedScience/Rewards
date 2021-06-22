import React, { useEffect, useState } from "react";
import { Input, Breadcrumb } from "antd";
import PaperPreview from "../../components/paper/PaperPreview";
import "./home.css";

const { Search } = Input;

export default function HomePage({ drizzle, drizzleState }) {
  const [papers, setPapers] = useState([]);
  const [paperCount, setPaperCount] = useState(0);

  useEffect(() => {
    (async () => {
      const _paperCount = await drizzle.contracts.RewardsContract.methods
        .getPaperCount()
        .call();
      setPaperCount(parseInt(_paperCount));

      const _papers = [];
      for (let i = 0; i < _paperCount; i++) {
        const paper = await drizzle.contracts.RewardsContract.methods
          .papers(i)
          .call();
        _papers.push(paper);
      }
      setPapers(_papers);
    })();
  }, [paperCount]);

  const onAdd = (value) =>
    value &&
    drizzle.contracts.RewardsContract.methods.createPaper.cacheSend(value, {
      from: drizzleState.accounts[0],
    });

  return (
    <div className="App">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Papers</Breadcrumb.Item>
      </Breadcrumb>
      <div className="home-content">
        <Search
          placeholder="Title"
          allowClear
          enterButton="Add new paper"
          size="large"
          onSearch={onAdd}
          style={{ width: "30%" }}
        />

        <div className="section">
          <p>Paper Count: {paperCount}</p>
        </div>
        <div className="cardsContainer">
          <div className="cards">
            {papers &&
              papers.map((p) => (
                <div key={p.id} className="card">
                  <PaperPreview title={p.title} author={p.author} id={p.id} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
