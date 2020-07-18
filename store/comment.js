import firebaseApp from '@/plugins/firebase'

export const state = () => ({
    comment: []
})

export const mutations = {}

export const actions = {
    addComment({commit}, payload){
        return firebaseApp.database().ref('comments').push(payload)
        .then(comment => {
            // productComments database
            const commentProduct = {
                comment: payload.comment
            }

            const commentUpdate = {}
            commentUpdate[`productComments/${payload.productId}/${comment.key}`] = commentProduct
            return firebaseApp.database().ref().update(commentUpdate)

            console.log(commentUpdate)

        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const getters = {}