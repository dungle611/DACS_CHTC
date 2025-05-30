import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({size, styleButton, styleTextButton, textButton, disabled, ...rests}) => {
    return(
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.backgroundColor || styleButton.background,
                color: disabled ? '#666' : styleTextButton?.color || '#fff'
            }}
            size={size}
            disabled={disabled}
            {...rests}
            >
            <span style={styleTextButton}>{textButton}</span>
            </Button>
    )
}

export default ButtonComponent