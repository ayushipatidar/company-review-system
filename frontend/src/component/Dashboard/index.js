import React, { useState, useEffect } from "react";
import { Button, Divider, Input, Row, Col, Select } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { EnvironmentOutlined } from "@ant-design/icons";

import CompanyList from "../Company";
import instance from "../../config/axios";
import AddCompany from "../Company/AddCompany";

const { Search } = Input;
const { Option } = Select;

async function getCompanies(search, sortBy) {
  const response = await instance.get(
    `/api/v1/company?search=${search}&sortBy=${sortBy}`
  );
  return response.data;
}
const Dashboard = () => {
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    handleOnClick();
  }, [sortBy]);

  const handleOnClick = async () => {
    await queryClient.fetchQuery({
      queryKey: ["companyList"],
      queryFn: () => getCompanies(search, sortBy),
    });
  };
  return (
    <>
      <Row
        gutter={16}
        align="middle"
        className="dashboard-header"
        justify="center"
      >
        <Col xs={24} sm={10} md={12} lg={10} className="search-container">
          <div className="search-wrapper">
            <div className="label-container">
              <label className="label">Select City</label>
            </div>
            <div className="search-button-container">
              <Search
                placeholder="Indore, Madhya Pradesh, India"
                className="search-bar"
                onChange={(e) => setSearch(e.target.value)}
                suffix={<EnvironmentOutlined style={{ color: "#8b3af3" }} />}
              />
              <Button
                type="primary"
                className="find-company-button common-button"
                onClick={handleOnClick}
              >
                Find Company
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8} lg={4} className="add-company-container">
          <Button
            type="primary"
            className="add-company-button common-button"
            onClick={() => setIsmodalOpen(true)}
          >
            + Add Company
          </Button>
        </Col>
        <Col xs={24} sm={8} lg={6} className="sort-container">
          <div className="sort-wrapper">
            <div className="sort-label-container">
              <label className="label">Sort</label>
            </div>
            <div className="sort-select-container">
              <Select
                placeholder="Select"
                defaultValue={"name"}
                className="sort-select"
                onSelect={(e) => setSortBy(e)}
                style={{ width: "60%" }}
              >
                <Option value="name">Name</Option>
                <Option value="city">Location</Option>
                <Option value="totalRating">Rating</Option>
                <Option value="averageRating">Average</Option>
              </Select>
            </div>
          </div>
        </Col>
      </Row>

      <Divider />
      <CompanyList />
      <AddCompany setIsmodalOpen={setIsmodalOpen} isModalOpen={isModalOpen} />
    </>
  );
};

export default Dashboard;
