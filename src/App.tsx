import React, {useEffect, useMemo, useState} from 'react';
import {
    CarOutlined, PlusCircleOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, theme} from 'antd';
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import CreatedTrip from "./pages/CreationTrip/CreatedTrip";
import MyCreatedTrips from "./pages/MyCreatedTrip/MyCreatedTrips";
import {StateType} from "./redux/store";
import ListOfUsers from "./pages/ListOfUsers/ListOfUsers";


const {Content, Footer, Sider} = Layout;

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
        path: '/profile/*',
        element: <Profile/>
    },
    {
        path: '/myTrips/*',
        element: <MyTrips/>
    },
    {
        path: '/createdTrip/*',
        element: <CreatedTrip/>
    },
    {
        path: '/myCreatedTrips/*',
        element: <MyCreatedTrips/>
    }

]

const publicRoutes = [
    {
        path: '/register/*',
        element: <Register/>
    },
    {
        path: '/login/*',
        element: <Login/>
    },
    {
        path: '/forget-password',
        element: <ForgetPassword/>
    },
    {
        path: '/reset-password/:token',
        element: <ResetPassword/>
    }
]

const adminRoutes = [
  {
    path: '/listOfUsers',
    element: <ListOfUsers/>
  }
]

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)
    const location = useLocation()
    const isDriver = useSelector(checkIsDriver)
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useSelector((state: StateType) => state.auth)

    const load = async () => {
        try {
            await dispatch(getMe())
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isAuth) {
            load()
        }
    }, [isAuth])

    useEffect(() => {
      if (!isLoading && user) {
            if (isAuth) {
              const isPublicRoute = publicRoutes.find((item) =>
                  item.path.includes(location.pathname))
              const isAdminRoute = adminRoutes.find((item) =>
                  item.path.includes(location.pathname))
              const isPrivateRoute = privateRoutes.find((item) =>
                  item.path.includes(location.pathname))
                if (user?.roles?.includes('ADMIN') && (isPrivateRoute || isPublicRoute) ) {
                    navigate('/listOfUsers')
                } else if (!user?.roles?.includes('ADMIN') && (isAdminRoute || isPublicRoute)) {
                    navigate('/searchTrip')
                }
            } else if (!isAuth && privateRoutes.find((item) =>
                item.path.includes(location.pathname))) {
                navigate('/login')
            }
        }
    }, [isAuth, isLoading, user])

  const items = useMemo(() => {
    if (isAuth && !user?.roles?.includes('ADMIN')) {
      if (isDriver) {
        return [
          getItem('Создать поездку', '1', <Link to='/createdTrip'><PlusCircleOutlined/></Link>),
          getItem('Профиль', '2', <Link to='/profile'><UserOutlined/></Link>),
          getItem('Мои поездки', '3', <Link to='/myCreatedTrips'><CarOutlined/></Link>)
        ]
      } else {
        return [
          getItem('Поиск поездки', '1', <Link to='/searchTrip'><SearchOutlined/></Link>),
          getItem('Профиль', '2', <Link to='/profile'><UserOutlined/></Link>),
          getItem('Мои поездки', '3', <Link to='/myTrips'><CarOutlined/></Link>)
        ]
      }
    }
    return []
  }, [isAuth, isDriver, user])

  const renderedRoutes = useMemo(() => {
    if (isAuth) {
      if (user?.roles?.includes('ADMIN')) {
        return (
            adminRoutes.map((item) =>
                <Route path={item.path} element={item.element}/>)
        )
      }
      return (
        privateRoutes.map((item) =>
            <Route path={item.path} element={item.element}/>)
      )
    } else {
      return (
        publicRoutes.map((item) =>
            <Route path={item.path} element={item.element}/>
        )
      )
    }


  }, [isAuth, user])


    const [collapsed, setCollapsed] = useState(true);
    const {} = theme.useToken();
    if (isLoading && isAuth) {
      return (
          <div>Loading...</div>
      )
    }
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider className={style.sider} collapsible collapsed={collapsed}
                   onCollapse={(value) => setCollapsed(value)}>
                <Logo className={style.logo}/>
                <Menu className={style.menu} theme="light" mode='inline' items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header/>
                <Content className={style.content}>
                    <Routes>
                      {renderedRoutes}
                    </Routes>
                    <ToastContainer position='bottom-right'/>
                </Content>
                <Footer className={style.footer}>CarCar ©2023</Footer>
            </Layout>
        </Layout>

    );
};

export default App;