import React from "react";
import { PageHeader, Button } from "antd";

import TasksHistory from "./TasksHistory";

const TaskStimation = () => {
  return (
    <div>
      <PageHeader
        className="site-page-header-responsive"
        title="Tasks Stimation"
        subTitle="Pac Corporativo"
        extra={[
          <Button key="2">Import batch</Button>,
          <Button key="1" type="primary">
            New Task
          </Button>,
        ]}
      >
        <TasksHistory />
      </PageHeader>
    </div>
  );
};

export default TaskStimation;
