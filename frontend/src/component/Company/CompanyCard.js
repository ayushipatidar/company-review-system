import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Card, Row, Col, Button, Rate, Avatar } from "antd";

import "./index.css";
const CompanyCard = ({
  logo,
  name,
  foundedOn,
  city,
  state,
  totalReviews,
  totalRating,
  _id,
  index,
}) => {
  const navigate = useNavigate();
  const backgroundClass = `avatar-bg-color-${(index % 4) + 1}`;
  return (
    <>
      <Card className="company-card">
        <Row gutter={4} align={"middle"}>
          <Col className="company-logo">
            <Avatar
              src={`http://localhost:4000/${logo}`}
              className={`ant-avatar ${backgroundClass}`}
            />
          </Col>
          <Col span={20} className="company-details">
            <Row justify="space-between" align="middle">
              <Col>
                <span className="company-name">{name}</span>
              </Col>
              <Col>
                <span className="company-founded">
                  Founded: {moment(foundedOn).format("DD-MM-YYYY")}
                </span>
              </Col>
            </Row>
            <div className="company-location">
              <EnvironmentOutlined className="location-icon" />
              <span>
                {city}
                {state}
              </span>
            </div>
            <div className="company-footer">
              <div className="company-reviews">
                {!!totalReviews && (
                  <>
                    {totalRating / totalReviews}
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={totalRating / totalReviews}
                      className="rating"
                    />
                    <span>{totalReviews} Review</span>
                  </>
                )}
              </div>
              <Button
                type="primary"
                className="detail-review"
                onClick={() => navigate(`/${_id}?index=${index}`)}
              >
                Detail Review
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CompanyCard;
