export default function({ store, redirect }) {
    if (store.getters['user'] && store.getters['user'].is_admin === 1 && store.getters['user'].type === 0) {
        return redirect('/'); 
    } 
}