import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/b4d225f471fe06887284e1341751b36e.png'
import { Image } from 'antd'
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'


const SignUpPage = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }

    const mutation = useMutationHook(
        data => UserService.signupUser(data)
    )
    const { data, isLoading, isSuccess, isError } = mutation
    useEffect(() => {
        if(isSuccess) {
            message.success()
            handleNavigateSignIn()
        }else if(isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleOnChangePassword = (value) => {
        setPassword(value)
    }
    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }
    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }
    const handleSignUp = () => {
        mutation.mutate({email, password, confirmPassword})
        console.log('sign-up', email, password, confirmPassword)
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53', height: '100vh' }}>
            <div style={{ width: '800px', height: '445', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail}/>
                    <div style={{position: 'relative'}}>
                        <span 
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                            isShowConfirmPassword ? (
                                <EyeFilled></EyeFilled>
                            ) : (
                                <EyeInvisibleFilled></EyeInvisibleFilled>
                            )
                        }    
                        </span>
                        <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword}/>
                    </div>
                    <div style={{position: 'relative'}}>
                        <span 
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                            isShowConfirmPassword ? (
                                <EyeFilled></EyeFilled>
                            ) : (
                                <EyeInvisibleFilled></EyeInvisibleFilled>
                            )
                        }    
                        </span>
                        <InputForm placeholder="confirm password" type={isShowConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={handleOnChangeConfirmPassword}/>
                    </div>
                    {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
                    {/* <Loading isLoading={isLoading}> */}
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Đăng Ký'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    {/* </Loading> */}
                    <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng Nhập</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="image logo" height="203px" width="203px" />
                    <h4>Mua hàng tại CHTC</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignUpPage