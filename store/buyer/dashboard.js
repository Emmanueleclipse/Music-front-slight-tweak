 
export const state = () => ({
    items: [], 
});

export const getters = {
    getItems(state) {
        return state.items;
    },  
};

export const mutations = {
    SET_ALL_ITEMS: (state, items) => (state.items = items),  
};

export const actions = {
    async fetchAllItems({commit}) {
        const {data} = await this.$axios.get(
            'buyer/dashboard'
          ); 
          commit('SET_ALL_ITEMS', data.datas);  
    },
    async fetchAllItemsPage({commit},pageNum) {
        const {data} = await this.$axios.get(
            'buyer/dashboard?page=' + pageNum
          ); 
          commit('SET_ALL_ITEMS', data.datas);
    }, 
};