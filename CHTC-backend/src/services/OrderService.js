const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user} = newOrder
        try{
            const promises = orderItems.map(async(order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: -order.amount,
                        selled: +order.amount
                    }},
                    {new: true}
                )
                if(productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }else {
                    return{
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.map((item) => item.id)
            if(newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id: ${arrId.join(',')} không đủ hàng`
                })
            }else {
                const createdOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            city,
                            phone
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user,
                    })
                    if(createdOrder){
                        return{
                            status: 'OK',
                            message: 'SUCCESS'
                        }
                    }
            }
        }catch (e){
            reject(e)
        } 
    })
}

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const order = await Order.find({
                user: id
            })
            if(order === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
            
        }catch (e){
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const order = await Order.findById({
                _id: id
            })
            if(order === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
            
        }catch (e){
            reject(e)
        }
    })
}

const cancelOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const order = await Order.findByIdAndDelete(id)
            if(order === null){
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
            
        }catch (e){
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails
}