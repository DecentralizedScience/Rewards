import React, { useEffect, useState } from "react";
import { Input, Card, Breadcrumb, Row, Col } from "antd";
import { useParams } from "react-router-dom";

import "./paper.css";
import ReviewerPreview from "../../components/reviewer/ReviewerPreview";

const { Search } = Input;

export default function PaperView({ drizzle, drizzleState }) {
  const { id } = useParams();
  const [paper, setPaper] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const _paper = await drizzle.contracts.RewardsContract.methods
        .papers(id - 1)
        .call();
      setPaper(_paper);
      const _reviewers = await drizzle.contracts.RewardsContract.methods
        .getPaperReviewers(id - 1)
        .call();
      const _reviews = [];
      for (let i = 0; i < _reviewers.length; i++) {
        const review = await drizzle.contracts.RewardsContract.methods
          .getPaperReviewsByReviewer(id - 1, _reviewers[i])
          .call();
        _reviews.push({ reviewer: _reviewers[i], review });
      }
      setReviews(_reviews);
    })();
  }, []);

  const onAdd = (value) =>
    value &&
    drizzle.contracts.RewardsContract.methods.addReviewer.cacheSend(
      id - 1,
      drizzleState.accounts[0],
      value,
      {
        from: drizzleState.accounts[0],
      }
    );

  return (
    <div className="App">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Paper nº {id} </Breadcrumb.Item>
      </Breadcrumb>
      <div className="paper-content">
        <Search
          placeholder="Review Content"
          allowClear
          enterButton="Add new review"
          size="large"
          onSearch={onAdd}
          style={{ width: "30%" }}
        />
        <Row justify="center">
          <Col md={8} sm={12}>
            <Card className="article-container" title={paper.title}>
              <p className="article">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
                consequat interdum varius sit. Turpis egestas integer eget
                aliquet nibh praesent tristique magna. Quam adipiscing vitae
                proin sagittis. Volutpat sed cras ornare arcu dui vivamus arcu
                felis. Cursus mattis molestie a iaculis at erat pellentesque
                adipiscing. Justo donec enim diam vulputate ut pharetra sit
                amet. Viverra mauris in aliquam sem fringilla ut. Ut lectus arcu
                bibendum at. Quis commodo odio aenean sed adipiscing diam donec
                adipiscing. Mauris sit amet massa vitae tortor condimentum
                lacinia quis vel. Libero nunc consequat interdum varius sit amet
                mattis vulputate enim. Magna etiam tempor orci eu lobortis.
              </p>
              <p className="article">
                Nullam vehicula ipsum a arcu cursus vitae congue mauris.
                Pellentesque elit eget gravida cum sociis natoque. Volutpat ac
                tincidunt vitae semper quis lectus nulla at. Orci porta non
                pulvinar neque laoreet suspendisse interdum. Dignissim convallis
                aenean et tortor at. Iaculis nunc sed augue lacus viverra vitae.
                Egestas erat imperdiet sed euismod nisi porta lorem mollis
                aliquam. Vulputate enim nulla aliquet porttitor lacus luctus
                accumsan. Habitant morbi tristique senectus et. Euismod nisi
                porta lorem mollis aliquam ut porttitor leo. Magna fringilla
                urna porttitor rhoncus dolor purus. In aliquam sem fringilla ut
                morbi tincidunt. Risus viverra adipiscing at in tellus integer
                feugiat scelerisque varius. Volutpat maecenas volutpat blandit
                aliquam etiam erat. In egestas erat imperdiet sed euismod nisi
                porta lorem mollis. Lacus vestibulum sed arcu non odio. Feugiat
                nisl pretium fusce id velit. Tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </Card>
          </Col>
          <Col md={8} sm={12}>
            <div className="reviews-list">
              {reviews &&
                reviews.map((review) => (
                  <div key={review.reviewer} className="card">
                    <ReviewerPreview
                      paperId={id}
                      review={review}
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                    />
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
