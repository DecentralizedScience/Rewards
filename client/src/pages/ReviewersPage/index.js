/* eslint-disable default-case */
import React, { useEffect, useState } from "react";

import { Table, Breadcrumb, Tag } from "antd";
import { awardList } from "../../utils";

const columns = [
  {
    title: "Address",
    dataIndex: "address",
    sortDirections: ["descend", "ascend"],
    sorter: {
      compare: (a, b) => a.name.length - b.name.length,
      multiple: 3,
    },
  },
  {
    title: "Reputation",
    dataIndex: "reputation",
    defaultSortOrder: "descend",
    sorter: {
      compare: (a, b) => a.reputation - b.reputation,
      multiple: 1,
    },
  },
  {
    title: "Awards",
    dataIndex: "awards",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color;
          switch (tag) {
            case awardList[0]:
              color = "DarkCyan";
              break;
            case awardList[1]:
              color = "Gold";
              break;
            case awardList[2]:
              color = "Silver";
              break;
            case awardList[3]:
              color = "blue";
              break;
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
];

export default function Reviewers({ drizzle, drizzleState }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const reviewerCount = await drizzle.contracts.RewardsContract.methods
        .getReviewerCount()
        .call();

      const reviewers = [];
      for (let i = 0; i < reviewerCount; i++) {
        const address = await drizzle.contracts.RewardsContract.methods
          .reviewers(i)
          .call();
        const reputation = await drizzle.contracts.RewardsContract.methods
          .getReputation(address)
          .call();
        const awardsCount = await drizzle.contracts.RewardsContract.methods
          .getAwardsBalance(address)
          .call();
        const awards = [];
        for (let j = 0; j < awardsCount; j++) {
          const award = await drizzle.contracts.RewardsContract.methods
            .getAward(address, j)
            .call();
          awards.push(awardList[award.awardId]);
        }
        reviewers.push({ address, reputation, awards });
      }
      console.log(reviewers);
      setData(reviewers);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return "Loading...";
  }

  return (
    <div className="App">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Reviewers</Breadcrumb.Item>
      </Breadcrumb>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}
