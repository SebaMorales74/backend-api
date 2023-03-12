import React, { useState } from 'react';
import {
  ShoppingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Typography } from 'antd';

import './styles.scss'
import Logo from './assets/Go!Eco3d.svg';

import Productos from './Productos';

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Productos', '1', <ShoppingOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Header
        className="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >

        <Image
          src={Logo}
          preview={false}
          className="logo"
        />
        <Title style={{ opacity: collapsed ? '0' : '1', transition: 'opacity 0.3s' }} level={1}>GO!ECO</Title>
      </Header>
      <Layout className="site-layout">
        <Sider className='sider' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{
          paddingTop: '9.8vh',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Content
          className='content'
          style={{ padding: collapsed ? `16px 0px 12vh 6rem` : `16px 0px 12vh 216px`, transition: 'padding 0.3s' }}
        >
          <div
          >
            <Productos />
          </div>
        </Content>
      </Layout>
      <Footer
        className='footer'
        style={{
          textAlign: 'center',
        }}
      >
        <span>GO!ECO</span>
      </Footer>
    </Layout>
  );
};
export default App;