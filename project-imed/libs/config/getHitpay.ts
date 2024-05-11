import axios from 'axios';

export default {
    createPayment: async (data: {}) => {
        return axios({
            url: "https://api.sandbox.hit-pay.com/v1/payment-requests",
            method: "post",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-BUSINESS-API-KEY': process.env.HITPAY_API_KEY as string,
            },
            data,
        })
    },
    getPayment: async (id: string) => {
        return axios({
            url: `https://api.sandbox.hit-pay.com/v1/payment-requests/${id}`,
            method: "get",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-BUSINESS-API-KEY': process.env.HITPAY_API_KEY as string,
            },
        })
    },
    refundPayment: async (data: {}) => {
        return axios({
            url: `https://api.sandbox.hit-pay.com/v1/refund`,
            method: "post",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-BUSINESS-API-KEY': process.env.HITPAY_API_KEY as string,
            },
            data,
        })
    }
}


