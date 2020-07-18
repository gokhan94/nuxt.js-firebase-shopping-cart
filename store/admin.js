import firebaseApp from '@/plugins/firebase'

export const state = () => ({
    groups: []
})

export const mutations = {
    loadGroups(state, payload){
        state.groups.push(payload)
    },
    updateGroup(state, payload){
      const groupKeyIndex = state.groups.indexOf(payload.group) // 7
      state.groups[groupKeyIndex].name = payload.name
    },
    removeGroup(state, payload){
        const indexGroupKey = state.groups.indexOf(payload.group) 
        state.groups.splice(indexGroupKey, 1)
    }
}

export const actions = {
    //Grup oluştur
    createGroup({commit}, payload){
        firebaseApp.database().ref('groups').push(payload)
        .then((response) => {
            console.log('success', response)
        })
        .catch(err => {
            console.log(err)
        })
    },
    //Grup verilerini çeker
    getGroups({commit}){
        firebaseApp.database().ref('groups').on('child_added', snapShot => {
           // { name: 'admin', key: '-MAWDhpzEg-l10R0tpnT' }
            let item = snapShot.val() 
            item.key = snapShot.key
           
            commit('loadGroups', item)
            
        })
    },
    //Belli bir key değerine sahip grup ismi güncelleniyor
    updateGroup({commit}, payload){
        firebaseApp.database().ref(`groups/${payload.group.key}`).update({name: payload.name})
        .then(() => {
            //Veri state üzerindende güncelleniyor
            const updateData = {
                name: payload.name,
                group: payload.group
            }
            commit('updateGroup', updateData)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    removeGroup({commit}, payload){
        firebaseApp.database().ref(`groups/${payload.group.key}`).remove()
        .then(() => {
            commit('removeGroup', payload)
        })
        .catch(err => {
            console.log(err)
        })
    },
}

export const getters = {
    groups(state){
        return state.groups
    }
}