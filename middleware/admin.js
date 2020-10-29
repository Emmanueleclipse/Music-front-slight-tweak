export default function({ store, redirect }) {
    if (store.getters['user'] && store.getters['user'].is_admin !== 1) {
        return redirect('/');   
    } 
}