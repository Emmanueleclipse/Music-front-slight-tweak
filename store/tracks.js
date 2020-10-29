 
export const state = () => ({
    tracks: [],
    search: [],
    isLoaded: true,
    track:{},
    track_count:0,
    track_like: false,
    play_count: 0
});

export const getters = {
    allTracks(state) {
        return state.tracks;
    },
    searchTrack(state) {
        return state.search;
    },
    isLoaded(state) {
        return state.isLoaded;
    },
    getTrack(state) {
        return state.track;
    },
    track_count(state) {
        return state.track_count;
    },
    play_count(state) {
        return state.play_count;
    }
};

export const mutations = {
    SET_ALL_TRACK: (state, tracks) => (state.tracks = tracks), 
    SET_ALL_SEARCH: (state, tracks) => (state.search = tracks), 
    SET_IS_LOADED: (state, bool) => (state.isLoaded = bool), 
    SINGLE_TRACK: (state, track) => (state.track = track), 
    TRACK_COUNT: (state, track) => (state.track_count = track), 
    TRACK_LIKE: (state, track) => (state.track_like = track), 
    PLAY_COUNT: (state, count) => (state.play_count = count), 
};

export const actions = {
    async fetchAllTracks({commit}) {
        commit('SET_IS_LOADED', false);
        const {data} = await this.$axios.get(
            'tracks'
          ); 
          commit('SET_ALL_TRACK', data.datas);
          commit('SET_IS_LOADED', true);
    }, 
    async fetchAllTracksPage({commit}, pageNum) { 
        const {data} = await this.$axios.get(
            'tracks?page=' + pageNum
          ); 
          commit('SET_ALL_TRACK', data.datas); 
    }, 
    async fetchSearchTracks({commit}, term) {
        commit('SET_IS_LOADED', false);
        const {data} = await this.$axios.get(
            'tracks/search',  
            {params: {"q" : term}}
          ); 
          commit('SET_ALL_SEARCH', data.datas); 
          commit('SET_IS_LOADED', true);
    }, 
    async fetchSearchTracksPage({commit}, d) {  
        const {data} = await this.$axios.get(
            'tracks/search?q='+ d.term  + '&page='+ d.pageNum,   
          ); 
          commit('SET_ALL_SEARCH', data.datas);  
    }, 
    async fetchTrackById({commit}, id) {   
        const {data} = await this.$axios.get(
            `tracks/${id}/view`   
          ); 
          commit('SINGLE_TRACK', data.data);  
          commit('TRACK_COUNT', data.track_count);   
          commit('PLAY_COUNT', data.play_count);   
    }, 
    async setPlaying({commit}, id) {  
        const {data} = await this.$axios.post(
            `tracks/play-count`, {id: id}
          ); 
          commit('PLAY_COUNT', data.count);   
    }, 
  
};