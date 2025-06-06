import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from './style';
import { convertPrice } from '../../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useMutationHook } from '../../hooks/useMutationHook';
import { message } from 'antd';


const MyOrderPage = () => {
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id, state?.token)
        return res.data
    }
    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder, enabled: !!state?.id && !!state?.token })
    const { isLoading, data } = queryOrder
    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token
            }
        })
    }
    const mutation = useMutationHook(
        (data) => {
            const {id, token} = data
            const res = OrderService.cancelOrder(id, token)
            return res
        }
    )
    const handleCancelOrder = (id) => {
        mutation.mutate({id, token: state?.token}, {
            onSuccess: () => {
                queryOrder.refetch()
            }
        })
    }
    const {isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel} = mutation
    useEffect(() => {
        if(isSuccessCancel && dataCancel?.status === 'OK') {
            message.success()
        }if(isSuccessCancel && dataCancel?.status === 'ERR') {
            message.error(dataCancel?.message)
        }else if(isErrorCancel) {
            message.error()
        }
    }, [isSuccessCancel, isErrorCancel])
    const renderProduct = (data) => {
        return data?.map((order) => {
            return <WrapperHeaderItem key={order?.id}>
                <img src={order?.image}
                    style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        border: '1px solid rgb(238, 238, 238)',
                        padding: '2px'
                    }}
                />
                <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginLeft: '10px'
                }}>{order?.name}</div>
                <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
        })
    }
    return (
        <Loading isLoading={isLoading}>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h2>Đơn hàng của tôi</h2>
                    <WrapperListOrder>
                        {data?.map((order) => {
                                return (
                                    <WrapperItemOrder key={order._id}>
                                        <WrapperStatus>
                                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                            <div><span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</div>
                                            <div><span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</div>
                                        </WrapperStatus>
                                        {renderProduct(order?.orderItems)}
                                        <WrapperFooterItem>
                                            <div>
                                                <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                                <span style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}>{convertPrice(order?.totalPrice)}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px' }}></div>
                                            <ButtonComponent
                                                onClick={() => handleCancelOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid rgb(11, 116, 229)',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Hủy đơn hàng'}
                                                styletextbutton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                            <ButtonComponent
                                                onClick={() => handleDetailsOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid rgb(11, 116, 229)',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Xem chi tiết'}
                                                styletextbutton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                        </WrapperFooterItem>
                                    </WrapperItemOrder>
                                )
                            })
                        }
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </Loading>
    );
};

export default MyOrderPage;
