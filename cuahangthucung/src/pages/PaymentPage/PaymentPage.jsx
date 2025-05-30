import { Checkbox, Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperStyleHeader, WrapperTotal, WrapperRight } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slices/orderSlice';
import { convertPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slices/userSlice';

const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [listChecked, setListChecked] = useState([])
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
            name: '',
            phone: '',
            address: '',
            city: ''
        })
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    useEffect(() => {
            form.setFieldsValue(stateUserDetails)
        }, [form, stateUserDetails])
    useEffect(() => {
        if(isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone
            })
        }
    }, [isOpenModalUpdateInfo])
    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }
    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])
    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.discount * cur.amount))
        }, 0)
        if(Number(result)){
            return result
        }
        return 0
    }, [order])
    const diliveryPriceMemo = useMemo(() => {
        if(priceMemo > 200000) {
            return 10000
        }else if(priceMemo === 0){
            return 0
        }else {
            return 20000
        }
    }, [priceMemo])
    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])
    const handleRemoveAllOrder = () => {
        if(listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({listChecked}))
        }
    }
    const handleAddCart = () => {
        if(!order?.orderItemsSelected?.length) {
            message.error('Vui lòng chọn sản phẩm')
        }else if(!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsOpenModalUpdateInfo(true)
        }
    }
    const mutationUpdate = useMutationHook(
            (data) => {
                const { id, token, ...rests } = data
                const res = UserService.updateUser(id, { ...rests }, token)
                return res
            }
        )
    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields();
        setIsOpenModalUpdateInfo(false)
    }
    const handleUpdateInfoUser = () => {
        const {name, address, city, phone} = stateUserDetails
        if(name && address && city && phone) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({name, address, city, phone}))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }
    const {isLoading, data} = mutationUpdate
    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Thanh toán</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        
                    </WrapperLeft>

                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperInfo>
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{fontWeight: 'bold'}}>{`${user?.address} ${user.city}`}</span>
                                    <span onClick={handleChangeAddress} style={{color: 'blue', cursor: 'pointer'}}>Thay đổi</span>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{`${priceDiscountMemo} %`}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                                </div>
                            </WrapperInfo>

                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{display: 'flex', flexDirection: 'column'}}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </WrapperTotal>
                        </div>

                            <ButtonComponent
                                onClick={() => handleAddCart()}
                                size="40"
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '320px',
                                    border: 'none',
                                    borderRadius: '4px',
                                }}
                                textButton="Mua hàng"
                                styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
                            />
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                {/* <Loading isLoading={isLoadingDeleted}> */}
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    autoComplete='on'
                    form={form}
                    // onFinish={onUpdateUser}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name' }]}
                    >
                        <InputComponent value={stateUserDetails['name']} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city' }]}
                    >
                        <InputComponent value={stateUserDetails['city']} onChange={handleOnChangeDetails} name="city" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone' }]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address' }]}
                    >
                        <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                    </Form.Item>
                </Form>
                {/* </Loading> */}
            </ModalComponent>
        </div>
    );
};

export default PaymentPage;
