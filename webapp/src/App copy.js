import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Statistic, Card, Row, Col } from 'antd';
import { Table } from 'antd';

function App() {
  const dataSource1 = [
    {
      key: '1',
      user: 'Mike',
      title: 'Category:Uses of Wikidata Infobox',
      type: 'categorize',
    }
  ];

  const columns1 = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  const dataSource2 = [
    {
      key: '1',
      id: '1297384495',
      title: 'Category:Uses of Wikidata Infobox',
      type: 'categorize',
    }
  ];

  const columns2 = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  const dataSource3 = [
    {
      key: '1',
      id: '1297384495',
      title: 'Category:Uses of Wikidata Infobox',
      type: 'categorize',
    }
  ];

  const columns3 = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  const dataSource4 = [
    {
      key: '1',
      id: '1297384495',
      title: 'Category:Uses of Wikidata Infobox',
      type: 'categorize',
    }
  ];

  const columns4 = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  const [collectionName, setCollectionName] = useState([])
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
              "query": "SELECT COUNT(*) FROM blog001.\"wikimedia-stream\""
            }
          }),
        })
    .then(response => response.json())
    .then(result => {
      console.log(JSON.stringify(result))
      setCollectionName(result.collections)      
    })
    .catch(error => console.log(error));

  }, [])

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <h1>{collectionName} stats</h1> 

        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="No. of items posted for the past hour"
                value={200}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="No. of unique users posting"
                value={120}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ padding: '30px' }}>
        <h1>New users doing a lot of edits</h1>

        <Table dataSource={dataSource1} columns={columns1} />
        <h1>Items with most activity in the last 10 min</h1>
        <Table dataSource={dataSource2} columns={columns2} />
        <h1>Items with most activity in the last 30 min</h1>
        <Table dataSource={dataSource3} columns={columns3} />
        <h1>Items with most activity in the last hour</h1>
        <Table dataSource={dataSource4} columns={columns4} />
      </div>
    </div>
  );
}

export default App;
