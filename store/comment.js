import firebaseApp from '@/plugins/firebase'

export const state = () => ({
    comments: []
})

export const mutations = {
    loadComments(state,payload){
        state.comments = payload
    }
}

export const actions = {
    addComment({commit}, payload){
        return firebaseApp.database().ref('comments').push(payload)
        .then(comment => {

            let user = firebaseApp.auth().currentUser

            const commentProduct = {
                comment: payload.comment,
                userName: user.displayName
            }

            const commentUpdate = {}
            commentUpdate[`productComments/${payload.productId}/${comment.key}`] = commentProduct
            return firebaseApp.database().ref().update(commentUpdate)         

        })
        .catch((err) => {
            console.log(err)
        })
    },
    getComment({commit}){
        firebaseApp.database().ref('comments').once('value')
        .then(snapShot => {
           
          const comments = []
          let item = {}
     
        snapShot.forEach(comment => {
            item     = comment.val()
            item.commentKey = comment.key
            comments.push(item)
         })
          commit('loadComments', comments)
        })
    }
}

export const getters = {
    getComments(state){
       return state.comments
    },
}