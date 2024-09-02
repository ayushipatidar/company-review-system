import React, { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col, Button, Rate, Divider, Avatar, Spin } from "antd";
import { EnvironmentOutlined, LoadingOutlined } from "@ant-design/icons";

import "./index.css";
import AddReview from "../Review";
import instance from "../../config/axios";

async function getCompanies({ queryKey }) {
  const [_, id] = queryKey;
  const response = await instance.get(`/api/v1/company/${id}`);
  return response.data;
}

const CompanyDetail = () => {
  const { id, index } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["company", id],
    queryFn: getCompanies,
  });

  const [isModalOpen, setIsmodalOpen] = useState(false);
  const backgroundClass = `avatar-bg-color-${1}`;

  if (isLoading) {
    return <Spin indicator={<LoadingOutlined spin />} />;
  }
  let totalrating = data?.reviews?.reduce((acc, ele) => {
    return acc + ele.rating;
  }, 0);
  return (
    <>
      <Divider />
      <div className="company-list">
        <Card className="company-card-width">
          <Row gutter={4}>
            <Col className="company-logo">
              <Avatar
                src={`http://localhost:4000/${data?.logo}`}
                className={`ant-avatar ${backgroundClass}`}
              />
            </Col>
            <Col span={20} className="company-details">
              <Row justify="space-between" align="middle">
                <Col>
                  <span className="company-name">{data?.name}</span>
                </Col>
                <Col>
                  <span className="company-founded">
                    Founded on: {moment(data?.foundedOn).format("DD-MM-YYYY")}
                  </span>
                </Col>
              </Row>
              <div className="company-location">
                <EnvironmentOutlined className="location-icon" />
                <span>
                  {data?.city} {data?.city}
                </span>
              </div>
              <div className="company-footer">
                <div className="company-reviews">
                  {!!data?.reviews?.length && (
                    <>
                      {totalrating / data?.reviews?.length}
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={totalrating / data?.reviews?.length}
                        className="rating"
                      />
                      <span>{data?.reviews?.length} Review</span>
                    </>
                  )}
                </div>
                <Button
                  type="primary"
                  className="common-button"
                  onClick={() => setIsmodalOpen(true)}
                >
                  + Add Review
                </Button>
              </div>
            </Col>
          </Row>
          <Divider />
          {data?.reviews?.map((data) => {
            return (
              <div className="review-header">
                src={`http://localhost:4000/${data.profile}`}
                <div className="review-content">
                  <div className="review-header-row">
                    <span className="review-username">{data.fullName}</span>
                    <Rate
                      disabled
                      defaultValue={data.rating}
                      className="review-rating"
                    />
                  </div>
                  <div className="review-date">
                    {moment(data.createdAt).format("DD-MM-YYYY")}
                  </div>
                  <div className="review-text">{data.reviewText}</div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
      <AddReview setIsmodalOpen={setIsmodalOpen} isModalOpen={isModalOpen} />
    </>
  );
};

export default CompanyDetail;
