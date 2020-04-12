import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import Moment from 'react-moment';
import { List, Typography, Input } from 'antd';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

function App() {

  const [jobs, setJobs] = useState([])
  //const [totalPostsCount, setTotalPostsCount] = useState({})

  useEffect(() => {

    fetch('https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/jobportal/lambdas/go-jobs/versions/3',
      {
        method: "POST",
        headers: new Headers({
          Authorization: 'ApiKey ' + process.env.REACT_APP_ROCKSET_API_KEY,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(result => {
        //console.log(JSON.stringify(result))
        setJobs(result.results)

      })
      .catch(error => console.log(error));

  }, [])

  return (  
    <Layout className="site-layout-background">
      <Content className="site-layout-background">
        <div  style={{ paddingTop: 0, paddingLeft: 20, paddingRight:20, alignContent: 'center' }} >
          
          <Title level={2} style={{ textAlign: 'center' }}><img src="Go-Logo_Fuchsia.png" alt="Logo" width="150px" height="120px"/><br/>Golang Jobs (Singapore)</Title>
              
              <Search
            placeholder="Job Title, Company or Description"
            enterButton="Search"
            size="large"
            onSearch={value => {
              console.log(value)

              fetch('https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/jobportal/lambdas/search/versions/7',
                {
                  method: "POST",
                  headers: new Headers({
                    Authorization: 'ApiKey ' + process.env.REACT_APP_ROCKSET_API_KEY,
                    'Content-Type': 'application/json'
                  }),
                  body: `{
                      "parameters": [
                        {
                          "name": "searchstring",
                          "type": "string",
                          "value": "` + value + `"
                        }
                      ]
                    }`
                })
                .then(response => response.json())
                .then(result => {
                  //console.log(JSON.stringify(result))
                  setJobs(result.results)

                })
                .catch(error => console.log(error));
            }

            }
          /><br /><br />
          <Text style={{ textAlign: 'center' }}>Sources: Indeed, LinkedIn, JobsDB</Text><br />
          <Text strong>Search results {jobs.length} jobs</Text><br />
        
              <List
                itemLayout="horizontal"
                dataSource={jobs}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<span><a href={item.JobUrl}><Title level={4}>{item.Title}</Title></a><Text strong>{item.Company}, {item.Location}</Text></span>}
                    // description={item.Company}
                    />
                    {item.Summary}<br />
                    {/* <Text strong>Source: {item.Source}</Text>  */}
                    {<div><Text code>Last Updated: <Moment>{item.EventTime}</Moment></Text></div>}


                  </List.Item>
                )}
              />
           
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Jobs Search</Footer>
    </Layout>
  );
}

export default App;
