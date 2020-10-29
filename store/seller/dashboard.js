 
export const state = () => ({
    payments: [],
    total_earnings: '',
    items_sold: '',
    item_per_order: '', 
});

export const getters = {
    getPayments(state) {
        return state.payments;
    }, 
    total_earnings(state) {
        return state.total_earnings;
    },
    items_sold(state) {
        return state.items_sold;
    },
    item_per_order(state) {
        return state.item_per_order;
    },
};

export const mutations = {
    SET_ALL_PAYMENTS: (state, payments) => (state.payments = payments), 
    SET_TOTAL_EARNINGS: (state, total_earnings) => (state.total_earnings = total_earnings), 
    SET_ITEMS_SOLD: (state, items_sold) => (state.items_sold = items_sold), 
    SET_ITEM_PER_ORDER: (state, item_per_order) => (state.item_per_order = item_per_order), 
};

export const actions = {
    async fetchAllPayments({commit}) {
        const {data} = await this.$axios.get(
            'seller/dashboard'
          ); 
          commit('SET_ALL_PAYMENTS', data.datas); 
          commit('SET_TOTAL_EARNINGS', data.total_earnings);
          commit('SET_ITEMS_SOLD', data.items_sold);
          commit('SET_ITEM_PER_ORDER', data.item_per_order);
    },
    async fetchAllPaymentsPage({commit},pageNum) {
        const {data} = await this.$axios.get(
            'seller/dashboard?page=' + pageNum
          ); 
          commit('SET_ALL_PAYMENTS', data.datas);
    }, 
};