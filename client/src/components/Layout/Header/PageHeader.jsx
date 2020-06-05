import React from "react";
import { Menu, Avatar, Badge, Dropdown, Layout } from "antd";
import {
  PoweroffOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";

import logo from "../../../assets/header-logo.png";

const { Header } = Layout;

const PageHeader = () => {
  const logged = true;
  const notification = true;

  const AccountMenu = (
    <Menu style={{ top: "11px" }}>
      <Menu.Item icon={<UserOutlined />}>My Account</Menu.Item>
      <Menu.Item icon={<PoweroffOutlined />}>Sign Out</Menu.Item>
    </Menu>
  );

  return (
    <Header id="header">
      <div className="header__logo">
        <img src={logo} />
      </div>

      {logged && (
        <Menu mode="horizontal">
          <Menu.Item key="17" className="header__menu-item">
            <Dropdown
              overlay={AccountMenu}
              placement="bottomRight"
              trigger="click"
            >
              <Avatar>M</Avatar>
            </Dropdown>
          </Menu.Item>
          <Menu.Item
            key="18"
            className="header__menu-item"
            id="header__notification"
          >
            {notification && (
              <Badge dot style={{ position: "absolute", left: "15px" }}>
                <BellOutlined className="notification-bell" />
              </Badge>
            )}
            {!notification && <BellOutlined className="notification-bell" />}
          </Menu.Item>
        </Menu>
      )}
      {!logged && (
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="19" className="header__menu-item">
            Sign Up
          </Menu.Item>
          <Menu.Item key="20" className="header__menu-item">
            Sign In
          </Menu.Item>
        </Menu>
      )}
    </Header>
  );
};

export default PageHeader;
