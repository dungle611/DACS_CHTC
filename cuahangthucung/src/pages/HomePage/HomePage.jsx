import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperTypeProduct, WrapperButtonMore, WrapperProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/cham-soc-thu-cung-1024x683.jpg'
import slider2 from '../../assets/images/hinh-nen-thu-cung-cute_014119974.jpg'
import slider3 from '../../assets/images/rni-films-img-df04c7c4-cebc-48a3-9443-536d9247a314-16734975615661462021227-1673608174760-16736081750121997648434.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { retry } from '@reduxjs/toolkit/query'

const HomePage = () => {
    const arr = ['Meo', 'Cho']
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }
    const {isLoading, data: products} = useQuery({queryKey: ['products'], queryFn: fetchProductAll, retry: 3, retryDelay: 1000})
    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                    <WrapperProduct>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent 
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                />
                            )
                        })}
                    </WrapperProduct>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
                            border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                            width: '240px', height: '38px', borderRadius: '4px'
                        }} styleTextButton={{ fontWeight: 500, color: 'rgb(11, 116, 229)' }}></WrapperButtonMore>
                    </div>
                </div>
            </div>           
        </>
    )
}

export default HomePage
