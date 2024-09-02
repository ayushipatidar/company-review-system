import React from "react";
import { Layout, Button } from "antd";
import { StarTwoTone } from "@ant-design/icons";
import "./AppHeader.css";

const { Header } = Layout;

const AppHeader = () => (
  <Header className="app-header">
    <div className="logo">
      <div className="icon-container">
        <StarTwoTone className="logo-icon" twoToneColor="#ffffff" />
      </div>
      <span className="logo-text">
        Review
        <span className="star-logo-bg">&</span>
        <span className="rate-text">RATE</span>
      </span>
    </div>
    <div className="auth-buttons">
      <Button className="login">SignUp</Button>
      <Button className="login">Login</Button>
    </div>
  </Header>
);

export default AppHeader;
