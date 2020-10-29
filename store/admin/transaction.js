 
export const state = () => ({ 
    transaction_logs: [], 
});

export const getters = { 
    transaction_logs(state) {
        return state.transaction_logs;
    }, 
};

export const mutations = { 
    SET_TRANSACTION_LOGS: (state, transaction_logs) => (state.transaction_logs = transaction_logs),  
};

export const actions = {
    async fetchTransationLogs({commit}) {
        const {data} = await this.$axios.get(
            'admin/transaction'
          );  
          commit('SET_TRANSACTION_LOGS', data.datas); 
    }, 
    async setTransationPage({commit}, pageNum) {
        const {data} = await this.$axios.get(
            'admin/transaction?page='+ pageNum
          );  
          commit('SET_TRANSACTION_LOGS', data.datas); 
    }, 
};