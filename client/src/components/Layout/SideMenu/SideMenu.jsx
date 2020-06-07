import React, { useRef } from "react";
import { Menu, Layout } from "antd";
import ProjectMenu from "./ProjectMenu/ProjectMenu";

import { PlusOutlined } from "@ant-design/icons";
import { getProjectsByUserId } from "../../../mockData";

const { Sider } = Layout;
const { Item } = Menu;

const SideMenu = () => {
  const projects = getProjectsByUserId("u1");
  const menuRef = useRef(null);

  return (
    <Sider id="sideMenu" breakpoint="md" collapsedWidth="0">
      <Menu mode="inline" ref={menuRef}>
        {projects.map((p, idx) => (
          <ProjectMenu key={idx} parentMenu={menuRef} project={p} />
        ))}
        <Item icon={<PlusOutlined />}>Nuevo Proyecto</Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
