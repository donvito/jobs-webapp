import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, RightCircleFilled, UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import { List, Typography } from 'antd';

var data = [];

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

function App() {

  const [jobs, setJobs] = useState([])
  //const [totalPostsCount, setTotalPostsCount] = useState({})

  useEffect(() => {
    
    fetch('https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/jobportal/lambdas/go-jobs/versions/1',
      {
        method: "POST",
        headers: new Headers({
          Authorization: 'ApiKey ' + process.env.REACT_APP_ROCKSET_API_KEY,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(result => {
        console.log(JSON.stringify(result))
        setJobs(result.results)

      })
      .catch(error => console.log(error));

  }, [])

  return (
    <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>        
        <Menu.Item key="1">
          <UserOutlined />
          <span className="nav-text">Golang Jobs Search</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>       
              {/* <h3 style={{ margin: '24px 0' }}>Golang Jobs in Singapore</h3> */}
              <Title level={2}>Golang Jobs in Singapore</Title>
              Sources: Indeed, LinkedIn, JobsDB
              <List
                itemLayout="horizontal"
                dataSource={jobs}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href={item.JobUrl} target="_blank"><Title level={4}>{item.Title} @ {item.Company}</Title></a>}
                      // description={item.Company}
                    />                                    
                    {item.Summary}<br/>
                    {<div><Text strong>Source: {item.Source}</Text> <Text code>Last Updated: <Moment>{item.EventTime}</Moment></Text></div>}
                   
                   
                  </List.Item>
                )}
              />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Jobs Search</Footer>
    </Layout>
  </Layout>
    
  );
}

export default App;
