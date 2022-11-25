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
      >

        <Image
          src={Logo}
          preview={false}
          className="logo"
        />
        <Title style={{ opacity: collapsed ? '0' : '1', transition: 'opacity 0.3s' }} level={1}>GO!ECO</Title>
      </Header>
      <Layout className="site-layout">
        <Sider className='sider' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Content
        >
          <div
            style={{
              padding: '1%',
              minHeight: 360
            }}
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
        <span>GO!ECO ©2022 Creado por Club de Teconologías Didacticas</span>
      </Footer>
    </Layout>
  );
};
export default App;