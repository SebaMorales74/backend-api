import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './styles.css'

import Producto from '../Productos';

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Productos', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const App = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState('1');
    const handleClick = e => {
        setSelectedItem(e.key);
        console.log(selectedItem);
    };

    const RenderContent = () => {
        switch (selectedItem) {
            case '1':
                return <div>Option 1</div>;
            case '2':
                return <Producto />;
            case '3':
                return <div>Tom</div>;
            case '4':
                return <div>Bill</div>;
            case '5':
                return <div>Alex</div>;
            case '6':
                return <div>Team 1</div>;
            case '8':
                return <div>Team 2</div>;
            case '9':
                return <div>Files</div>;
            default:
                return <div>Option 1</div>;
        }
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {items.map(item => {
                        if (item.children) {
                            return (
                                <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                                    {item.children.map(child => (
                                        <Menu.Item key={child.key} onClick={handleClick}>
                                            {child.label}
                                        </Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                            );
                        }
                        return (
                            <Menu.Item key={item.key} icon={item.icon} onClick={handleClick}>
                                {item.label}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        margin: '1%',
                    }}
                >
                    <RenderContent />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    React-Router-DOM + Ant.Design ©2022 Created by Sebastian Morales
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;