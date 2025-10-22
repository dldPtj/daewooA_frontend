import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', {
    state: () => ({
        price: null,
        userId: null,
        checkin: null,
        checkout: null
    }),
    actions: {
        setPaymentInfo(data) {
            this.price = data.price
            this.userId = data.userId
            this.checkin = data.checkin
            this.checkout = data.checkout
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'payment', // 저장될 key 이름
                storage: sessionStorage // 또는 localStorage
            }
        ]
    }
})
