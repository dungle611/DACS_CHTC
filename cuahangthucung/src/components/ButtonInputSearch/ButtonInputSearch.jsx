import { Button } from 'antd'
import React from 'react'
import { SearchOutlined } from "@ant-design/icons"
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'

const ButtonInputSearch = (props) => {
    const { 
        size, 
        placeholder, 
        textButton, 
        bordered, 
        backgroundColorInput = '#fff', 
        backgroundColorButton = 'rgb(13, 92, 182)',
        colorButton = '#fff'
    } = props

    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput }}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{ backgroundColor: backgroundColorButton, border: !bordered && 'none' }}
                icon={<SearchOutlined style={{ color: colorButton }} />}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
            />
            <Button
                style={{
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '0 18px',
                    fontWeight: 600,
                    fontSize: 16,
                    height: 40,
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)'
                }}
                onClick={() => navigate('/suggest-medicine')}
            >
                Gợi ý thuốc
            </Button>
        </div>
    )
}

export default ButtonInputSearch
