import React, { Fragment, useState } from "react";
import { List, Avatar, Button, Skeleton } from "antd";
import { getTasksByProejctId } from "../../../mockData";

const count = 4;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,email&noinfo`;

const data = getTasksByProejctId("p1");

const TasksHistory = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      <h3>Previous Stimated tasks</h3>
      <List
        bordered
        dataSource={data}
        renderItem={(task) => (
          <List.Item>
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta description={task.title} />
            </Skeleton>
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default TasksHistory;

class LoadMoreList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: (res) => {
        callback(res);
      },
    });
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} }))
      ),
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event("resize"));
        }
      );
    });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px",
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loading={initLoading}
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}
