import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  EnvironmentOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
  TransactionOutlined,
  AppstoreOutlined,
  TagsOutlined,
  CreditCardOutlined,
  AccountBookOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RoutesComponent from '../routers/Routes';

const { Content, Sider } = Layout;


const menuItems = [
  { key: '1', icon: <HomeOutlined />, label: 'Dashboard', path: '/' },
  {
    key: '13', icon: <IdcardOutlined />, label: 'Organizations', path: '/organization', children: [
      { key: '13.1', label: 'Sub-Organizations', path: '/sub-organization' },
    ]
  },
  { key: '2', icon: <EnvironmentOutlined />, label: 'Locations', path: '/location' },
  { key: '3', icon: <AppstoreAddOutlined />, label: 'Items', path: '/items' },
  { key: '4', icon: <SearchOutlined />, label: 'Locators', path: '/locator' },
  { key: '13', icon: <AccountBookOutlined />, label: 'Department', path: '/department' },
  { key: '5', icon: <UserOutlined />, label: 'Users', path: '/user' },
  { key: '6', icon: <TeamOutlined />, label: 'Employees', path: '/employee' },
  { key: '7', icon: <DollarOutlined />, label: 'Taxes', path: '/tax' },
  {
    key: '8', icon: <TransactionOutlined />, label: 'Transactions', path: '/transaction', children: [
      { key: '13.1', label: 'Good Recieve Note', path: '/grn' },
    ]
  },
  { key: '9', icon: <AppstoreOutlined />, label: 'UOM', path: '/uom' },
  { key: '10', icon: <TagsOutlined />, label: 'Currencies', path: '/currency' },
  { key: '11', icon: <CreditCardOutlined />, label: 'Vendors', path: '/vendor' },
  { key: '12', icon: <AccountBookOutlined />, label: 'Quick Codes', path: '/quickcode' },

];


const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const renderSubMenu = (item) => (
    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
      {item.children.map((subItem) => (
        <Menu.Item key={subItem.key}>
          <Link to={subItem.path}>{subItem.label}</Link>
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  );

  return (
    <Layout>
      <Sider
        width={220}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapse}
        style={{
          background: '#57cac3',
          color: 'white',
          fontWeight: 'bold',
        }}
      >

        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ background: '#57cac3', color: 'white' }}>
          {menuItems.map((item) =>
            item.children ? (
              renderSubMenu(item)
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ padding: 24, margin: 0, minHeight: 280, background: '#fff' }}>
          <RoutesComponent />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideNav;
