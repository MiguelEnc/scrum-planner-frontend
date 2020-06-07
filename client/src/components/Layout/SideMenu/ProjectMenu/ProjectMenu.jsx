import React, { Fragment } from "react";
import { Menu } from "antd";
import {
  PlusOutlined,
  SettingOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { getRetrospectivesByProjectId } from "../../../../mockData";

const { SubMenu, Item } = Menu;

const ProjectMenu = (props) => {
  const { project, parentMenu, ...others } = props;
  const { _id, name } = project;

  const retrospectives = getRetrospectivesByProjectId(_id);

  return (
    <Fragment>
      <SubMenu parentMenu={parentMenu} key={_id} title={name} {...others}>
        <Item icon={<ApartmentOutlined />}>Task Stimation</Item>
        <SubMenu title="Retrospectives" icon={<AppstoreOutlined />}>
          <Item icon={<PlusOutlined />}>New Board</Item>
          {retrospectives.map((r) => (
            <Item key={r._id}>{r.title}</Item>
          ))}
        </SubMenu>
        <Item icon={<SettingOutlined />}>Project Settings</Item>
      </SubMenu>
      <hr />
    </Fragment>
  );
};

export default ProjectMenu;
