export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    }catch (error) {
        return false
    }
    return true
}

export const getBase64 = (file) => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const renderOptions = (arr) => {
    let result = []
    if(arr) {
        result = arr?.map((opt) => {
            return {
                value: opt,
                label: opt
            }
        })
    }
    result.push({
        label: 'Thêm loại sản phẩm',
        value: 'add_type'
    })
    return result
}

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.')
        return `${result} VND`
    }catch(error) {
        return null
    }
}

export const initFacebookSDK = () => {
    if(window.FB) {
        window.FB.XFBML.parse();
    }
    let locale = "vi_VN";
    window.fbAsyncInit= function() {
        window.FB.init({
            appId: process.env.REACT_APP_FB_ID,
            cookie: true,
            xfbml: true,
            version: "v8.6"
        });
    };
    (function(d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if(d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/${locale}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
};