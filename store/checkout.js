 
export const state = () => ({
    carts: [],
    cart: {}, 
    modal: false, 
});

export const getters = {
    showCartModal(state) {
        return state.modal;
    },
   
};

export const mutations = {
    FETCH_DATA: (state, datas) => (state.carts = datas),  
    SET_CART_SINGLE_DATA: (state, cart) => (state.cart = cart),  
    SET_MODAL: (state, modal) => (state.modal = modal),  
    SET_CART_DATAS: (state, cart) => state.carts.push(cart),   
    REMOVE_CART: (state, id) => (state.carts = state.carts.filter(cart => cart.id !== id)),
};
 

export const actions = {
    fetchData({commit}){
        let tracks = []
        if(localStorage.getItem('tracks')){
            tracks = JSON.parse(localStorage.getItem('tracks')); 
        } 
        commit('FETCH_DATA', tracks);  
    },
    setCartData({commit}, cart) { 
          commit('SET_CART_SINGLE_DATA', cart);  
          commit('SET_MODAL', true);  
    } ,
    setModalHide({commit}) { 
          commit('SET_MODAL', false);  
    },

    setCartDatas({commit}, cartData) { 
   
        let tracks = [];
        if(localStorage.getItem('tracks')){
            tracks = JSON.parse(localStorage.getItem('tracks'));
        }
        if(tracks.length > 0 ){ 
            let mapped = tracks.map(ele => ele.id);
            let found = mapped.includes(cartData.id);

            if(!found){
                tracks.push(cartData); 
                localStorage.setItem('tracks', JSON.stringify(tracks))
                commit('SET_CART_DATAS',cartData );  
                this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Beats Added to cart!',
                    showConfirmButton: false,
                    timer: 3000
                  })
            }else{
              this.$swal({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Item alreay added!',
                        showConfirmButton: false,
                        timer: 3000
                      })
            } 
        }else{
            tracks.push(cartData); 
            localStorage.setItem('tracks', JSON.stringify(tracks))
            commit('SET_CART_DATAS', cartData);  
            this.$swal({
                position: 'top-end',
                icon: 'success',
                title: 'Beats Added to cart!',
                showConfirmButton: false,
                timer: 3000
              })
        } 
    } ,
    removeCart({commit}, id) {  
        let tracks = JSON.parse(localStorage.getItem('tracks'));
       tracks = tracks.filter(track => track.id !== id );
        localStorage.setItem('tracks', JSON.stringify(tracks));
        commit('REMOVE_CART', id);  
  },
    
};