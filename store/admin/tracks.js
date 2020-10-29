 
export const state = () => ({
    tracks: []
});

export const getters = {
    allTracks(state) {
        return state.tracks;
    },
    tracks(state){
        return state.tracks.data;
    }
};

export const mutations = {
    SET_ALL_TRACK: (state, tracks) => (state.tracks = tracks), 
    DELETE_TRACK: (state, id) => (state.tracks.data = state.tracks.data.filter(track => track.id !== id)),
};

export const actions = {
    async fetchAllTracks({commit}) {
        const {data} = await this.$axios.get(
            'admin/tracks'
          ); 
          commit('SET_ALL_TRACK', data.datas);
    },
    async fetchAllTracksPage({commit},pageNum) {
        const {data} = await this.$axios.get(
            'admin/tracks?page=' + pageNum
          ); 
          commit('SET_ALL_TRACK', data.datas);
    },
    async deleteTrack({commit}, id) {
         await this.$axios.delete(
            'admin/tracks/delete/'+id
          ); 
          commit('DELETE_TRACK', id);
    }
};