const DEV_PLANS = {
    monthly: 'price_1IxhdKIoqiuDenozYJ9wnQ3G',
    quarterly: 'price_1IxhTtIoqiuDenoztN7xGrGc',
    annual: 'price_1IxhUjIoqiuDenozxpZoulxF'
}

const PROD_PLANS = {
    monthly: 'price_1IxhdKIoqiuDenozYJ9wnQ3G',
    quarterly: 'price_1IxhTtIoqiuDenoztN7xGrGc',
    annual: 'price_1IxhUjIoqiuDenozxpZoulxF'
}

const PLANS = process.env.REACT_APP_ENV === 'prod' ? PROD_PLANS : DEV_PLANS

export const planTitle = {
    price_1IxhdKIoqiuDenozYJ9wnQ3G: "Easy Quant Mensal",
    price_1IxhTtIoqiuDenoztN7xGrGc: "Easy Quant Trimestral",
    price_1IxhUjIoqiuDenozxpZoulxF: "Easy Quant Anual"
}

export default PLANS;