 
export const state = () => ({
    data: {},
    pause: false,
    play: false, 
});

export const getters = {
    getData(state) {
        return state.data;
    },
    getPause(state) {
        return state.pause;
    },
    getPlay(state) {
        return state.play;
    }
};

export const mutations = {
    SET_AUDIO: (state, data) => (state.data = data), 
    SET_PAUSE: (state, pause) => (state.pause = pause), 
    SET_PLAY: (state, play) => (state.play = play), 
};

export const actions = {
      setaudioData({commit}, data) { 
          commit('SET_AUDIO', data); 
          commit('SET_PLAY', true); 
          commit('SET_PAUSE', false);
    }, 
    setPause({commit}) { 
          commit('SET_PAUSE', true);
          commit('SET_PLAY', false); 
    }, 
    setPlay({commit}) { 
        commit('SET_PLAY', true); 
        commit('SET_PAUSE', false);
    }, 
    
};