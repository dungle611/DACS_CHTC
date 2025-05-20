import React from 'react'
import HeaderComponents from '../HeaderComponents/HeaderComponents'

const DefaultComponents = ({children}) => {
    return(
        <div>
            <HeaderComponents></HeaderComponents>
            {children}
        </div>
    )
}

export default DefaultComponents