import React, {useEffect, useState} from 'react';
import {
  CarOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Layout, Menu, theme } from 'antd';
import {BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import {checkIsAuth, checkIsDriver, getMe} from "./redux/features/auth/authSlice";
import {useSelector} from "react-redux";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";


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

const privateRoutes = [
  {
    path: '/searchTrip/*',
    element: <SearchTrip/>
  },
  {
    path: '/profile/*' ,
    element: <Profile/>
  },
  {
    path: '/myTrips/*' ,
    element: <MyTrips/>
  }
]

const publicRoutes = [
  {
    path: '/register/*',
    element: <Register/>
  },
  {
    path: '/login/*' ,
    element: <Login/>
  },
  {
    path: '/forget-password',
    element: <ForgetPassword/>
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>
  }

]

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(checkIsAuth)
  const location = useLocation()
  const isDriver = useSelector(checkIsDriver)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (isAuth && publicRoutes.find((item) =>
    item.path.includes(location.pathname))) {
      navigate('/searchTrip')
    } else if (!isAuth && privateRoutes.find((item) =>
    item.path.includes(location.pathname))){
      navigate('/login')
    }
  }, [isAuth])



  const items: MenuItem[] = isAuth && isDriver ? [
    getItem('Создать поездку', '1', <Link to='/searchTrip'><SearchOutlined /></Link>),
    getItem('Профиль', '2', <Link to='/profile'><UserOutlined /></Link>),
    getItem('Мои поездки', '3', <Link to='/myTrips'><CarOutlined /></Link>)
  ] : [
    getItem('Поиск поездки', '1', <Link to='/searchTrip'><SearchOutlined /></Link>),
    getItem('Профиль', '2', <Link to='/profile'><UserOutlined /></Link>),
    getItem('Мои поездки', '3', <Link to='/myTrips'><CarOutlined /></Link>)
  ];

  const [collapsed, setCollapsed] = useState(true);
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
                    {privateRoutes.map((item) =>
                        <Route path={item.path} element={item.element}/>
                    )
                    }
                  </>
              ) : (
                  <>
                    {publicRoutes.map((item) =>
                        <Route path={item.path} element={item.element}/>
                    )
                    }
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