import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from '../../services/OrderService'
import { useQuery } from "@tanstack/react-query";

const DetailsOrderPage = () => {
    const params = useParams()
    const location = useLocation()
    const { state } = location
    const { id } = params
    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token)
        return res.data
    }
    const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder, enabled: id  })
    const { isLoading, data } = queryOrder
    const priceMemo = useMemo(() => {
            const result = data?.orderItems?.reduce((total, cur) => {
                return total + ((cur.price * cur.amount))
            }, 0)
            return result
        }, [data])
    return (
        <div style={{width: '100%', height: '100vh', background: '#f5f5fa'}}>
            <div style={{width: '1270px', margin: '0 auto'}}>
                <h3>Chi tiết đơn hàng</h3>
            </div>
        </div>
    )
}

export default DetailsOrderPage