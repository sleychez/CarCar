import React, { useState } from 'react';
import {
  CarOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined, SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Layout, Menu, theme } from 'antd';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import SearchTrip from "./pages/SearchTrip/SearchTrip";
import Profile from "./pages/Profile/Profile";
import MyTrips from "./pages/MyTrips/MyTrips";

import style from './App.module.css'
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Search trip', '1', <Link to='/searchTrip'><SearchOutlined /></Link>),
  getItem('Profile', '2', <Link to='/profile'><UserOutlined /></Link>),
  getItem('My trips', '3', <Link to='/myTrips'><CarOutlined /></Link>)
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
      <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content className={style.content}>
            <Routes>
              <Route path='/searchTrip/*'
                     element={<SearchTrip/>}/>
              <Route path='/profile/*'
                     element={<Profile/>}/>
              <Route path='/myTrips/*'
                     element={<MyTrips/>}/>
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
          </BrowserRouter>
  );
};

export default App;