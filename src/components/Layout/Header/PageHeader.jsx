import React from "react";
import { Menu, Avatar, Badge, Dropdown, Layout } from "antd";
import {
  PoweroffOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";

import logo from "../../../assets/header-logo.png";

const { Header } = Layout;
const { Item } = Menu;

const PageHeader = ({ logged, notification }) => {
  const AccountMenu = (
    <Menu style={{ top: "11px" }}>
      <Item icon={<UserOutlined />}>My Account</Item>
      <Item icon={<PoweroffOutlined />}>Sign Out</Item>
    </Menu>
  );

  return (
    <Header id="header">
      <div className="header__logo">
        <img src={logo} />
      </div>

      {logged && (
        <Menu mode="horizontal">
          <Item key="1" className="header__menu-item">
            <Dropdown
              overlay={AccountMenu}
              placement="bottomRight"
              trigger="click"
            >
              <Avatar>M</Avatar>
            </Dropdown>
          </Item>
          <Item key="2" className="header__menu-item" id="header__notification">
            {notification && (
              <Badge dot style={{ position: "absolute", left: "15px" }}>
                <BellOutlined className="notification-bell" />
              </Badge>
            )}
            {!notification && <BellOutlined className="notification-bell" />}
          </Item>
        </Menu>
      )}
      {!logged && (
        <Menu theme="dark" mode="horizontal">
          <Item key="1" className="header__menu-item">
            Sign Up
          </Item>
          <Item key="2" className="header__menu-item">
            Sign In
          </Item>
        </Menu>
      )}
    </Header>
  );
};

export default PageHeader;
