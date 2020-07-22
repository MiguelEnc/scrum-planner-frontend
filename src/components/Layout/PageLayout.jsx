import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import PageHeader from "./Header/PageHeader";
import SideMenu from "./SideMenu/SideMenu";
import TaskStimation from "../Pages/TaskStimation/TaskStimation";

const { Content } = Layout;

const PageLayout = () => {
  return (
    <Router>
      <Layout id="layout-wrapper">
        <PageHeader logged={true} notification={false} />

        <Layout>
          <SideMenu />

          <Layout id="inner-layout">
            <Content
              id="content"
              className="ant-layout-content site-layout-background"
            >
              <Switch>
                <Route path="/task-stimation" component={TaskStimation} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default PageLayout;
