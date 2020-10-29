 
export const state = () => ({
    users: [],
    allUsersCount: '',
    addedProduct: '',
    totalTransaction: '', 
});

export const getters = {
    allLatestUsers(state) {
        return state.users;
    },
    allUsersCount(state) {
        return state.allUsersCount;
    },
    addedProduct(state) {
        return state.addedProduct;
    },
    totalTransaction(state) {
        return state.totalTransaction;
    },
};

export const mutations = {
    SET_LATEST_USER: (state, users) => (state.users = users), 
    SET_USER_COUNT: (state, user_count) => (state.allUsersCount = user_count), 
    SET_ADDED_PRODUCT: (state, added_product) => (state.addedProduct = added_product), 
    SET_TRANSACTION: (state, transaction) => (state.totalTransaction = transaction), 
    DELETE_USER: (state, id) => (state.users = state.users.filter(user => user.id !== id)),
    ACTIVE_DEACTIVE:   (state, users) => (state.users = users),
};

export const actions = {
    async fetchAllLatestUsers({commit}) {
        const {data} = await this.$axios.get(
            'admin/dashboard'
          ); 
          commit('SET_LATEST_USER', data.datas);
          commit('SET_USER_COUNT', data.user_count);
          commit('SET_ADDED_PRODUCT', data.added_product);
          commit('SET_TRANSACTION', data.transaction);
    },
    async deleteUser({commit}, id) {
        await this.$axios.delete(
           'admin/user/delete/'+id
         ); 
         commit('DELETE_USER', id);
   },
    async activeDeactive({commit}, id) {
     const {data} =   await this.$axios.post(
           'admin/user/active-deactive/'+id
         ); 
         commit('ACTIVE_DEACTIVE', data.users);
   }
     
};