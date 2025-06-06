import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import HeaderComponents from './components/HeaderComponents/HeaderComponents'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slices/userSlice'
import * as UserService from './services/UserService'
import axios from 'axios'
import Loading from './components/LoadingComponent/Loading'


function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, [])

  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = localStorage.getItem('refresh_token')
    const decodedRefreshToken = jwtDecode(refreshToken)
    if(decoded?.exp < currentTime.getTime() / 1000){
      if(decodedRefreshToken?.exp > currentTime.getTime() / 1000){
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      }else{
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  });

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const isCheckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                }></Route>
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App