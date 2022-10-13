import { Layout } from 'antd';
import React from 'react';
import './App.css';
import Producto from './features/Producto';


const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout style={{ maxHeigth: '100%', minHeight: '100vh' }}>
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}
    >
    </Header>
    <Content
      className="site-layout"
      style={{
        padding: '0 50px',
        marginTop: 64,
      }}
    >
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 380,
        }}
      >
        <Producto />
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Sebastian Morales cc
    </Footer>
  </Layout>
);

export default App;