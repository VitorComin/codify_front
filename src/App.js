import React from 'react';
import './App.css';
import { Layout, Menu, Typography, theme  } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateDocument from './pages/createDocument/CreateDocument.js';
import About from './pages/About/About.js'

const { Header, Content, Footer } = Layout;

const items = [{ key: 1, label: 'Criar Documento', path: '/' }, { key: 2, label: 'Sobre', path: '/about' }];

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <div className="App">
      <Router>
        <Layout style={{ height: '100vh' }}>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Typography.Text type="primary" style={{ color: 'white', fontSize: 16, marginRight: 15 }}>
              Codify - Projeto de Vivências de Extensão
            </Typography.Text>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ flex: 1, minWidth: 0 }}
            >
              {items.map(item => (
                <Menu.Item key={item.key} onClick={() => window.location.href = item.path}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </Header>
          <Content style={{ padding: '0 48px', marginTop: 20 }}>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 600,
                padding: 24,
                borderRadius: borderRadiusLG,

              }}
            >
              <Routes>
                <Route path="/" element={<CreateDocument />}  />
                <Route path="/about" element={<About />}  />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Vivências de Extensão V - ©{new Date().getFullYear()} UNIVILLE
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
