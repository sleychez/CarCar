import React, {useEffect, useState} from 'react';
import {
  CarOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Layout, Menu, theme } from 'antd';
import {BrowserRouter, Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import SearchTrip from "./pages/SearchTrip/SearchTrip";
import Profile from "./pages/Profile/Profile";
import MyTrips from "./pages/MyTrips/MyTrips";
import {ReactComponent as Logo} from "../src/assets/images/logo.svg";
import style from './App.module.css'
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import {Header} from "./components/Header/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useAppDispatch} from "./hooks/useAppDispatch";
import {checkIsAuth, getMe, UserType} from "./redux/features/auth/authSlice";
import {fetchBookTrips} from "./redux/features/bookingTrips/bookingTripsSlice";
import {useSelector} from "react-redux";
import searchTrip from "./pages/SearchTrip/SearchTrip";

const { Content, Footer, Sider } = Layout;

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





const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(checkIsAuth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])


  useEffect(() => {
    if (isAuth) {
      navigate('/searchTrip')
    } else {
      navigate('/login')
    }
  }, [isAuth])


  const items: MenuItem[] = isAuth ? [
    getItem('Search trip', '1', <Link to='/searchTrip'><SearchOutlined /></Link>),
    getItem('Profile', '2', <Link to='/profile'><UserOutlined /></Link>),
    getItem('My trips', '3', <Link to='/myTrips'><CarOutlined /></Link>)
  ] : [];

  const [collapsed, setCollapsed] = useState(false);
  const {
  } = theme.useToken();

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className={style.sider} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Logo className={style.logo}/>
          <Menu className={style.menu} theme="light"  mode='inline' items={items} />
        </Sider>
        <Layout className="site-layout">
         <Header/>
          <Content className={style.content}>
            <Routes>
              {isAuth ? (
                  <>
                    <Route path='/searchTrip/*'
                           element={<SearchTrip/>}/>
                    <Route path='/profile/*'
                           element={<Profile/>}/>
                    <Route path='/myTrips/*'
                           element={<MyTrips/>}/>
                  </>
              ) : (
                  <>
                    <Route path='/register/*'
                           element={<Register/>}/>
                    <Route path='/login/*'
                           element={<Login/>}/>

                  </>
              )}

            </Routes>
            <ToastContainer position='bottom-right'/>
          </Content>
          <Footer className={style.footer}>CarCar ©2023</Footer>
        </Layout>
      </Layout>

  );
};

export default App;