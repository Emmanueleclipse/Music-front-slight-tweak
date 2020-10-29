export default function({ store, redirect }) {
    if (store.getters['user'] && store.getters['user'].is_admin === 0 && store.getters['user'].type !== 1) {
        return redirect('/');
    } 
}