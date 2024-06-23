import React from 'react';
import './App.css';
import CreateDocument from './pages/createDocument/CreateDocument.js';
import { Breadcrumb, Layout, Menu, Typography, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const items = [{key: 1, label: 'Criar Documento'}, {key: 2, label: 'Sobre'}]

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <div className='App'>
      <Layout style={{height: '100vh'}}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Typography.Text type='primary' style={{color: 'white', fontSize: 16, marginRight: 15}}>Codify - Projeto de Vivências de Extensão</Typography.Text>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: '0 48px', marginTop:20 }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 600,
              padding: 24,
              borderRadius: borderRadiusLG,

            }}
          >
            <CreateDocument />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
