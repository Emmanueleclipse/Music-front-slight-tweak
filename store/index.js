export const state = () => ({
  latest_tracks: [], 
  top_in_genres: [], 
  feature_tracks: [],  
  is_premium: false,  
  is_save_card: false,  
  liked: false,
});
export const getters = {
    authenticated(state) {
      return state.auth.loggedIn
    }, 
    user(state) {
        return state.auth.user
    },
    get_latest_tracks(state){
      return state.latest_tracks
    },
    get_top_in_genres(state){
      return state.top_in_genres
    },
    get_feature_tracks(state){
      return state.feature_tracks
    },
    get_is_premium(state){
      return state.is_premium
    },
    get_is_save_card(state){
      return state.is_save_card
    },
    liked(state){
      return state.liked
    }
}
 
export const mutations = {
  FETCH_LATEST_TRACKS: (state, datas) => (state.latest_tracks = datas),   
  FETCH_TOP_IN_GENRES: (state, datas) => (state.top_in_genres = datas),   
  FETCH_FEATURE_TRACKS: (state, datas) => (state.feature_tracks = datas),   
  FETCH_IS_PREMIUM: (state, data) => (state.is_premium = data),   
  FETCH_IS_SAVE_CARD: (state, data) => (state.is_save_card = data),   
  FETCH_IS_LIKED: (state, data) => (state.liked = data),   
};


export const actions = {
  async fetch_latest_tracks({commit}){ 
    const {data} = await this.$axios.get(
      'latest-tracks'
    ); 
      commit('FETCH_LATEST_TRACKS', data.datas);  
  }, 
  async top_in_genres({commit}){
    const {data} = await this.$axios.get(
      'top-genres'
    ); 
      commit('FETCH_TOP_IN_GENRES', data.datas);  
  }, 
  async fetch_feature_tracks({commit}){
    const {data} = await this.$axios.get(
      'feature-tracks'
    ); 
      commit('FETCH_FEATURE_TRACKS', data.datas);  
  }, 
  async fetch_is_premium({commit}){ 
    const {data} = await this.$axios.get(
      'check-is-premium'
    ); 
    if (data.success == true) commit('FETCH_IS_PREMIUM', true); 
       
  }, 
  async fetch_is_save_card({commit}){ 
    const {data} = await this.$axios.get(
      'check-savecard'
    ); 
    if (data.success == true) commit('FETCH_IS_SAVE_CARD', true);  
  }, 
  async get_liked({commit}, d){ 
    const {data} = await this.$axios.post(
      `get-liked`, {id: d.id, user_id: d.user_id} 
    ); 
     commit('FETCH_IS_LIKED', data.liked);  
  }, 
};