import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, discount, selled, id} = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-detail/${id}`)
    }
    return(
        <WrapperCardStyle
            hoverable 
            style={{ width: 200 }}
            styles={{
                header: { width: '200px', height: '200px' },
                body: { padding: '10px' },
            }}
            cover= {<img alt="Sản phẩm" src={image} />} 
            onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
            disabled = {countInStock === 0}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{marginRight: '4px'}}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}></StarFilled>
                </span>
                <WrapperStyleTextSell> | {selled || 0} lượt mua</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{marginRight: '8px'}}>{convertPrice(price)}</span>
                <WrapperDiscountText>
                    -{discount || 0}%
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent