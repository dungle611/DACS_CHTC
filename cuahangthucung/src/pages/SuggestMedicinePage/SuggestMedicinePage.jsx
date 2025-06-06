import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { suggestMedicine } from '../../services/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import Loading from '../../components/LoadingComponent/Loading';
import {
  SuggestMedicineContainer,
  SuggestMedicineTitle,
  SuggestMedicineResultTitle,
  SuggestMedicineList,
  NoResult
} from './style';
import { Table, Input, Select, Button, Form, Tag, Descriptions, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const petOptions = [
  { label: 'Chó', value: 'chó' },
  { label: 'Mèo', value: 'mèo' }
];

export const symptomOptions = [
  { label: 'Nôn mửa', value: 'nôn mửa', keywords: ['nôn', 'ói', 'mửa'] },
  { label: 'Tiêu chảy', value: 'tiêu chảy', keywords: ['tiêu chảy', 'phân lỏng'] },
  { label: 'Ngứa', value: 'ngứa', keywords: ['ngứa', 'gãi', 'dị ứng'] },
  { label: 'Rụng lông', value: 'rụng lông', keywords: ['rụng lông', 'lông rụng'] },
  { label: 'Ký sinh trùng', value: 'ký sinh trùng', keywords: ['giun', 'sán', 'bọ chét', 've', 'ký sinh'] },
  { label: 'Khó thở', value: 'khó thở', keywords: ['khó thở', 'thở gấp'] },
  { label: 'Khác', value: 'khác', keywords: [] }
];

const SuggestMedicinePage = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [suggestedMedicines, setSuggestedMedicines] = useState([]);
    const [searchInfo, setSearchInfo] = useState(null);

    // Phân quyền: chỉ cho phép user đã đăng nhập
    useEffect(() => {
        if (!user || !user.id) {
            navigate('/sign-in');
        }
    }, [user, navigate]);

    if (!user || !user.id) {
        return null;
    }

    const handleFinish = async (values) => {
        setLoading(true);
        setSearchInfo(values);
        try {
            // Gửi petType và symptom sang backend
            const res = await suggestMedicine(values.petType, values.symptom, values.age, values.petName);
            if (res.status === 'OK') {
                setSuggestedMedicines(res.data);
            } else {
                setSuggestedMedicines([]);
            }
        } catch {
            setSuggestedMedicines([]);
        }
        setLoading(false);
    };

    return (
        <Loading isLoading={loading}>
            <SuggestMedicineContainer>
                <SuggestMedicineTitle>Gợi ý thuốc cho thú cưng</SuggestMedicineTitle>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleFinish}
                  style={{ maxWidth: 600, margin: '0 auto', background: '#f8fafd', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #e3e3e3', marginBottom: 32 }}
                >
                  <Form.Item label="Tên thú cưng" name="petName" rules={[{ required: true, message: 'Vui lòng nhập tên thú cưng!' }]}> 
                    <Input placeholder="Nhập tên thú cưng" />
                  </Form.Item>
                  <Form.Item label="Tuổi (năm)" name="age" rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}> 
                    <Input type="number" min={0} max={30} placeholder="Nhập tuổi" />
                  </Form.Item>
                  <Form.Item label="Loại thú cưng" name="petType" rules={[{ required: true, message: 'Chọn loại thú cưng!' }]}> 
                    <Select placeholder="Chọn loại thú cưng">
                      {petOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Triệu chứng" name="symptom" rules={[{ required: true, message: 'Chọn triệu chứng!' }]}> 
                    <Select placeholder="Chọn triệu chứng">
                      {symptomOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', fontWeight: 600, fontSize: 16 }}>
                      Gợi ý thuốc
                    </Button>
                  </Form.Item>
                </Form>
                {searchInfo && (
                  <div style={{marginBottom: 24}}>
                    <Descriptions
                      bordered
                      column={1}
                      style={{ maxWidth: 600, margin: '0 auto 24px', background: '#fff', borderRadius: 8 }}
                      labelStyle={{ fontWeight: 600, background: '#f0f7ff' }}
                    >
                      <Descriptions.Item label="Tên thú cưng">{searchInfo.petName}</Descriptions.Item>
                      <Descriptions.Item label="Tuổi">{searchInfo.age} năm</Descriptions.Item>
                      <Descriptions.Item label="Loại thú cưng">
                        <Tag color={searchInfo.petType === 'chó' ? 'blue' : 'magenta'} style={{fontSize:16}}>{searchInfo.petType}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Triệu chứng">
                        <Tag color="red" style={{fontSize:16}}>{searchInfo.symptom}</Tag>
                      </Descriptions.Item>
                    </Descriptions>
                    <Title level={4} style={{marginBottom: 16, color:'#1976d2'}}>Kết quả gợi ý thuốc:</Title>
                    <SuggestMedicineList>
                      {suggestedMedicines.length > 0 ? suggestedMedicines.map((product) => (
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
                          id={product._id}
                        />
                      )) : <NoResult>Không tìm thấy thuốc phù hợp.</NoResult>}
                    </SuggestMedicineList>
                  </div>
                )}
            </SuggestMedicineContainer>
        </Loading>
    );
};

export default SuggestMedicinePage;
