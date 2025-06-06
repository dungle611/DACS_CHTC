import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({size, styleButton, styletextbutton, textbutton, disabled, ...rests}) => {
    return(
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.backgroundColor || styleButton.background,
                color: disabled ? '#666' : styletextbutton?.color || '#fff'
            }}
            size={size}
            disabled={disabled}
            {...rests}
            >
            <span style={styletextbutton}>{textbutton}</span>
            </Button>
    )
}

export default ButtonComponent