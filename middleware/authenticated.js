export default function ({ store, redirect }) {
    const user = store.getters.getUser
    
    if(!user || user.role != 'admin'){
        return redirect('/')
    }
}