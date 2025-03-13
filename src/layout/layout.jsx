import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const LayoutApp = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');
    const [breadcrumbItems, setBreadcrumbItems] = useState(['Option 1']);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onSelect={({ key, keyPath }) => {
                        setSelectedKey(key);
                        // Create breadcrumb items based on the keyPath
                        const breadcrumbs = [];
                        // Find the menu items by key and build breadcrumb
                        const findItemByKey = (items, targetKey) => {
                            for (const item of items) {
                                if (item.key === targetKey) {
                                    return item;
                                }
                                if (item.children) {
                                    const found = findItemByKey(item.children, targetKey);
                                    if (found) {
                                        breadcrumbs.unshift(item.label);
                                        return found;
                                    }
                                }
                            }
                            return null;
                        };

                        const selectedItem = findItemByKey(items, key);
                        if (selectedItem) {
                            breadcrumbs.push(selectedItem.label);
                        }

                        setBreadcrumbItems(breadcrumbs);
                    }}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: '0 16px',
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ width: '200px' }}></div> {/* Espaciador izquierdo */}
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Cymbal</h1>
                    <Breadcrumb style={{ marginRight: '16px' }}>
                        {breadcrumbItems.map((item, index) => (
                            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {selectedKey === '4' ? 'Bill is a cat.' :
                            `Content for ${breadcrumbItems.join(' > ')}`}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default LayoutApp;