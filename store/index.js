import firebaseApp from '@/plugins/firebase'

export const state = () => ({
  user : null
})

export const mutations = {
    setUser(state, payload){
        state.user = payload
    }
}

export const actions = {
    handleSignUp({commit},payload){
        let newUser = null
        firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
            let user = firebaseApp.auth().currentUser
            newUser = user
            if(user){
                firebaseApp.auth().languageCode = 'tr';
                user.sendEmailVerification()
                
            }else{
                console.log('Hata')
            }
            return user.updateProfile({
                displayName: payload.userName
            }).then(() => {
                const currentUser = {
                    id:    user.uid,
                    email: payload.email,
                    userName:  payload.userName,
                    role: 'user'
                }      
                commit('setUser', currentUser)
            })
        })
        .then(() => {
            const userData = {
                email:    payload.email,
                userName: payload.userName,
                createdAt: new Date().toISOString()
            }
            //return firebaseApp.database().ref('users').push(userData)
            return firebaseApp.database().ref(`users/${newUser.uid}`).set(userData)
        })
        .then(() => {
            //Kullanıcıyı group alanına ekleme
            return firebaseApp.database().ref('groups').orderByChild('name').equalTo('Super Admin').once('value')
            .then(snapShot => {
                let item = Object.keys(snapShot.val())[0]
               
                let updateUserGroup = {}
                //-> users/FC7kNfhLsOdNLFdOvB8Ya8Y8hez2 : userName
                updateUserGroup[`users/${newUser.uid}`] = payload.userName
                return firebaseApp.database().ref(`userGroups/${item}`).update(updateUserGroup)
                
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },
    // Kullanıcı giriş işlemi
    signIn({commit}, payload){
        firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
            if(user.emailVerified){

              let userData = {
                   id:    user.uid,
                   email: user.email,
                   userName: user.displayName
               }

               //name değeri Super admin olan kısmın verilerini çeker
               return firebaseApp.database().ref('groups').orderByChild('name').equalTo('Super Admin').once('value')
               .then((snapShot) => {
                   // -MB-97PfTTsVhHpMDajq
                    let groupKey = Object.keys(snapShot.val())[0]
                    
                    //Giriş yapan kullanıcı group id değerine göre admin veya user olarak atanıyor
                    return firebaseApp.database().ref(`userGroups/${groupKey}/users`).child(`${userData.id}`).once('value')
                    .then(authsnapShot  => {
                        if(authsnapShot.exists()){
                            userData.role = 'admin'
                        }else{
                            userData.role = 'user'
                        }
                        commit('setUser', userData)

                    })
               }) 
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },
    // Kullanıcı kimlik bilgileri her zaman otomatik çekiliyor
    setAuthStatus({commit}){
        firebaseApp.auth().onAuthStateChanged((user) => {
                if(user && user.emailVerified){
                    const userData = {
                        id: user.uid,
                        email: user.email,
                        userName: user.displayName
                    }
                      
                   //name değeri Super admin olan kısmın verilerini çeker
                   return firebaseApp.database().ref('groups').orderByChild('name').equalTo('Super Admin').once('value')
                   .then((snapShot) => {
                       // -MB-97PfTTsVhHpMDajq
                        let groupKey = Object.keys(snapShot.val())[0]
                        
                        //Giriş yapan kullanıcı group id değerine göre admin veya user olarak atanıyor
                        return firebaseApp.database().ref(`userGroups/${groupKey}/users`).child(`${userData.id}`).once('value')
                        .then(authsnapShot  => {
                            if(authsnapShot.exists()){
                                userData.role = 'admin'
                            }else{
                                userData.role = 'user'
                            }
                            commit('setUser', userData)
    
                        })
                   }) 
                }
        })
    },
    logout({commit}){
        firebaseApp.auth().signOut()
        commit('setUser', null)
    }
}

export const getters = {
    getUser(state){
        return state.user
    },
    loginStatus(state){
        return state.user !== null &&  state.user !== undefined
    },
    admin(state){
        if(state.user && state.user.role === 'admin'){
            return state.user
        }
    }
}