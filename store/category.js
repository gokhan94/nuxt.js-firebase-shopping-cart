import firebaseApp from '@/plugins/firebase'

export const state = () => ({
    categories: []
})

export const mutations = {
    loadCategories(state, payload){
        state.categories.push(payload)
    },
    removeCategory(state, payload){
        //Gönderilen indis değerindeki veriyi siler
        const index = state.categories.indexOf(payload) // 0
        state.categories.splice(index, 1)
    }
}

export const actions = {
    // Set yönetimi var olan verinin üzerine yazar
    // Push yönetimi yeni bir key değeri ile yazar
    addCategory({commit}, payload){
        firebaseApp.database().ref('categories').push({ name: payload})
        .then(() => {})
        .catch((err) => {
            console.log(err)
        })
    },
    //Sayfa yüklendiğinde, child_added olayı her kullanıcı nesnesi boyunca yinelenir 
    // child_added olayı yalnızca Veritabanına yeni bir nesne ekleneceği zaman tetiklenir .
    getCategories({commit}){
        firebaseApp.database().ref('categories').on('child_added', 
        snapShot => {
            let item = snapShot.val()
            item.key = snapShot.key
            commit('loadCategories', item)
        })
    },
    deleteCategory({commit}, payload){
        firebaseApp.database().ref('categories').child(payload.key).remove()
        .then(() => {
            commit('removeCategory', payload)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const getters = {
    getCategories(state){
        return state.categories
    }
}