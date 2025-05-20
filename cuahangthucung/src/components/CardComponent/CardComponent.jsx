import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'

const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, discount, selled} = props
    return(
        <WrapperCardStyle
            hoverable 
            style={{ width: 200 }}
            styles={{
                header: { width: '200px', height: '200px' },
                body: { padding: '10px' },
  }}
            cover= {<img alt="Sản phẩm" src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/11/20/975861/F0B28C78-C0D5-4255-B-01.jpeg" />} 
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{marginRight: '4px'}}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }}></StarFilled>
                </span>
                <WrapperStyleTextSell> | Da ban {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{marginRight: '8px'}}>{price}</span>
                <WrapperDiscountText>
                    {discount || 5}%
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent