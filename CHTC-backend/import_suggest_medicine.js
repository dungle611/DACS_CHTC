// Script import thuốc mẫu cho chó/mèo vào MongoDB
const mongoose = require('mongoose');
const Product = require('./src/models/ProductModel');

const data = [
  {
    name: 'Thuốc tẩy giun Drontal cho chó',
    image: 'https://petshop.com.vn/images/drontal-cho-cho.jpg',
    type: 'thuoc-cho',
    price: 120000,
    countInStock: 50,
    rating: 4.8,
    description: 'Thuốc tẩy giun chuyên dụng cho chó, hiệu quả cao, an toàn.',
    discount: 10,
    selled: 200
  },
  {
    name: 'Thuốc nhỏ gáy trị ve rận Frontline cho chó',
    image: 'https://petshop.com.vn/images/frontline-cho-cho.jpg',
    type: 'thuoc-cho',
    price: 150000,
    countInStock: 40,
    rating: 4.7,
    description: 'Thuốc nhỏ gáy trị ve rận, bọ chét cho chó.',
    discount: 8,
    selled: 180
  },
  {
    name: 'Thuốc nhỏ gáy trị ve rận Frontline cho mèo',
    image: 'https://petshop.com.vn/images/frontline-cho-meo.jpg',
    type: 'thuoc-meo',
    price: 145000,
    countInStock: 35,
    rating: 4.6,
    description: 'Thuốc nhỏ gáy trị ve rận, bọ chét cho mèo.',
    discount: 7,
    selled: 150
  },
  {
    name: 'Thuốc tẩy giun Drontal cho mèo',
    image: 'https://petshop.com.vn/images/drontal-cho-meo.jpg',
    type: 'thuoc-meo',
    price: 110000,
    countInStock: 45,
    rating: 4.7,
    description: 'Thuốc tẩy giun chuyên dụng cho mèo, hiệu quả cao, an toàn.',
    discount: 9,
    selled: 170
  }
];

async function importData() {
  await mongoose.connect('mongodb://localhost:27017/CHTC', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await Product.insertMany(data);
  console.log('Import thuốc gợi ý thành công!');
  mongoose.disconnect();
}

importData();
