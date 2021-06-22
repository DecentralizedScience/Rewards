import { Tooltip, Card, Select, Tag } from "antd";
import { DollarOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import ReadMoreReact from "read-more-react";
import { awardList } from "../../../utils";


import "./ReviewerPreview.css";

const { Option } = Select;

const TIP_VALUE = 1000000000000000000;

export default function ReviewerPreview({ paperId, review, drizzle, drizzleState }) {

  function sendTip() {
    drizzle.contracts.RewardsContract.methods.tipReviewer.cacheSend(paperId - 1, review.reviewer, {
      from: drizzleState.accounts[0],
      value: TIP_VALUE,
    });
  }

  function giveReputation() {
    drizzle.contracts.RewardsContract.methods.giveReputation.cacheSend(paperId - 1, review.reviewer, {
      from: drizzleState.accounts[0],
    });
  }

  function giveAward(value) {
    const awardId = awardList.indexOf(value);
    drizzle.contracts.RewardsContract.methods.giveAward.cacheSend(paperId - 1, review.reviewer, awardId, {
      from: drizzleState.accounts[0],
    });
  }

  return (
    <Card
      title={`Reviewer: ${review.reviewer}`}
      actions={[
        <Tooltip placement="bottom" title="Send Tip">
          <DollarOutlined key="sendTip" onClick={sendTip} />
        </Tooltip>,
        <Tooltip placement="bottom" title="Give Reputation">
          <LikeOutlined key="giveReputation" onClick={giveReputation} />
        </Tooltip>,
        <Tooltip placement="top" title="Give Award">
          <Select
            placeholder={<StarOutlined />}
            style={{ width: 100 }}
            onChange={giveAward}
          >
            <Option value="Platinum">
              <Tag color="DarkCyan">Platinum</Tag>
            </Option>
            <Option value="Gold">
              <Tag color="gold">Gold</Tag>
            </Option>
            <Option value="Silver">
              <Tag color="cyan">Silver</Tag>
            </Option>
            <Option value="Fast Review">
              <Tag color="blue">Faste Review</Tag>
            </Option>
          </Select>
        </Tooltip>,
      ]}
    >
      <Jazzicon diameter={50} seed={jsNumberForAddress(review.reviewer)} />
      <div className="text-review">
        <ReadMoreReact text={review.review} min={30} readMoreText="Read more" />
      </div>
    </Card>
  );
}
