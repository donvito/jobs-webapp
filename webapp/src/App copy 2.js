import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, RightCircleFilled } from '@ant-design/icons';
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

    fetch('https://api.rs2.usw2.rockset.com/v1/orgs/self/queries',
      {
        method: "POST",
        headers: new Headers({
          Authorization: 'ApiKey ' + process.env.REACT_APP_ROCKSET_API_KEY,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          "sql": {
            "query": `Select
                          MIN(c._id) as id,
                          MIN(c.JobUrl) as JobUrl,
                          MIN(c.Summary) as Summary,
                          MIN(c.CompanyName) as Company,
                          MIN(c.Category) as Category,
                          MIN(c._event_time) AS EventTime,
                          MIN(c.Source) AS Source,
                          c.Title,
                          c.CompanyName
                      FROM
                          jobportal.jobs as c
                      WHERE JobUrl LIKE 'http%'  
                      AND c.Category = 'go'     
                      GROUP BY
                          c.Title,
                          c.CompanyName
                      ORDER BY id desc
                      `


          }
        }),
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
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">Jobs Search</Menu.Item>
          {/* <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item> */}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>

        </Breadcrumb> */}
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                  Jobs
                </span>
                }
              >
                <Menu.Item key="1">Golang</Menu.Item>
                {/* <Menu.Item key="2">Flutter</Menu.Item> */}
              </SubMenu>

            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <div>
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
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Golang Jobs Search</Footer>
    </Layout>
  );
}

export default App;
