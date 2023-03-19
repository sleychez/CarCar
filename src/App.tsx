import React, { useState } from 'react';
import {
  CarOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Layout, Menu, theme } from 'antd';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import SearchTrip from "./pages/SearchTrip/SearchTrip";
import Profile from "./pages/Profile/Profile";
import MyTrips from "./pages/MyTrips/MyTrips";
import {ReactComponent as Logo} from "../src/assets/images/logo.svg";
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
  } = theme.useToken();

  return (
      <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className={style.sider} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Logo className={style.logo}/>
          <Menu className={style.menu} theme="light" defaultSelectedKeys={['1']} mode='inline' items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header style={{backgroundColor: '#006064' }} />
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
          <Footer className={style.footer}>CarCar ©2023</Footer>
        </Layout>
      </Layout>
          </BrowserRouter>
  );
};

export default App;