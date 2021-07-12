const DEV_PLANS = {
    monthly: 'price_1IxhdKIoqiuDenozYJ9wnQ3G',
    semiannually: 'price_1IxhTtIoqiuDenoztN7xGrGc',
    annual: 'price_1IxhUjIoqiuDenozxpZoulxF'
}

const PROD_PLANS = {
    monthly: 'price_1JCCrPIoqiuDenoz324S7M4n',
    semiannually: 'price_1JCCslIoqiuDenozztHwbmIo',
    annual: 'price_1JCCtAIoqiuDenoz6MtyQZw3'
}

const PLANS = process.env.REACT_APP_ENV === 'prod' ? PROD_PLANS : DEV_PLANS

export const planTitle = {
    price_1IxhdKIoqiuDenozYJ9wnQ3G: "Easy Quant Mensal",
    price_1IxhTtIoqiuDenoztN7xGrGc: "Easy Quant Trimestral",
    price_1IxhUjIoqiuDenozxpZoulxF: "Easy Quant Anual",

    price_1JCCrPIoqiuDenoz324S7M4n: "Easy Quant Mensal",
    price_1JCCslIoqiuDenozztHwbmIo: "Easy Quant Trimestral",
    price_1JCCtAIoqiuDenoz6MtyQZw3: "Easy Quant Anual"
}

export default PLANS;