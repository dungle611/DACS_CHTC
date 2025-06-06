const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {name, image, type, price, countInStock, rating, description, discount} = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }
            const newProduct = await Product.create({
                name, 
                image, 
                type,
                countInStock: Number(countInStock),
                price, 
                countInStock, 
                rating, 
                description,
                discount: Number(discount),
            })
            if(newProduct){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        }catch (e){
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
            
        }catch (e){
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
            
        }catch (e){
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try{
            await Product.deleteMany({_id: ids})
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
            
        }catch (e){
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const product = await Product.findOne({
                _id: id
            })
            if(product === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
            
        }catch (e){
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try{
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if(filter){
                const label = filter[0];
                const allObjectFilter = await Product.find({[label] : {'$regex': filter[1]}}).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                }) 
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] - sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                }) 
            }
            if(!limit) {
                allProduct = await Product.find()
            }else {
                allProduct = await Product.find().limit(limit).skip(page * limit)
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })           
        }catch (e){
            reject(e)
        }
    })
}

const getAllType = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try{
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allType,
            })           
        }catch (e){
            reject(e)
        }
    })
}

// Gợi ý thuốc cho chó, mèo
const suggestMedicine = (petType, symptom, age, petName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};
            // Nâng cao: mapping triệu chứng sang nhiều từ khoá liên quan
            const symptomKeywords = {
                'nôn mửa': ['nôn', 'ói', 'mửa'],
                'tiêu chảy': ['tiêu chảy', 'phân lỏng'],
                'ngứa': ['ngứa', 'gãi', 'dị ứng'],
                'rụng lông': ['rụng lông', 'lông rụng'],
                'ký sinh trùng': ['giun', 'sán', 'bọ chét', 've', 'ký sinh'],
                'khó thở': ['khó thở', 'thở gấp'],
                'khác': []
            };
            let symptomRegex = [];
            if (symptom && symptomKeywords[symptom]) {
                symptomRegex = symptomKeywords[symptom].map(k => ({ description: { $regex: k, $options: 'i' } }));
            }
            if ((petType === 'dog' || petType === 'chó') && symptomRegex.length > 0) {
                query = {
                    $and: [
                        { $or: [
                            { type: /thuoc-cho/i },
                            { description: /chó|dog|thuốc cho chó/i }
                        ] },
                        { $or: symptomRegex }
                    ]
                };
            } else if ((petType === 'cat' || petType === 'mèo') && symptomRegex.length > 0) {
                query = {
                    $and: [
                        { $or: [
                            { type: /thuoc-meo/i },
                            { description: /mèo|cat|thuốc cho mèo/i }
                        ] },
                        { $or: symptomRegex }
                    ]
                };
            } else if (petType === 'dog' || petType === 'chó') {
                query = { $or: [
                    { type: /thuoc-cho/i },
                    { description: /chó|dog|thuốc cho chó/i }
                ] };
            } else if (petType === 'cat' || petType === 'mèo') {
                query = { $or: [
                    { type: /thuoc-meo/i },
                    { description: /mèo|cat|thuốc cho mèo/i }
                ] };
            } else {
                resolve({ status: 'ERR', message: 'Loại thú cưng không hợp lệ' });
                return;
            }
            const medicines = await Product.find(query);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: medicines
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
    suggestMedicine
}