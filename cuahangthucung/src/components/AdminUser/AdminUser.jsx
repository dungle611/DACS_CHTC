import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'

const AdminUser = () => {
    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div>
                <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}}><PlusOutlined style={{fontSize: '60px'}}></PlusOutlined></Button>
            </div>
            <div style={{marginTop: '20px'}}>
                <TableComponent></TableComponent>
            </div>
        </div>
    )
}

export default AdminUser