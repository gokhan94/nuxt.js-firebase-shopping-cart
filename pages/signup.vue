<template>
  <div>
    <section class="section no-top-pad">  
        <h5 class="title is-5">Signup</h5><hr>
        
        <div class="columns is-centered is-mobile">
          
            <div class="column is-half-desktop is-full-mobile is-full-tablet">
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input class="input" type="text" name="fullname" v-model="userName">
                  </div>
                </div>                               
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input" type="email" name="email" v-model="email">
                  </div>
                </div>                
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input class="input" type="password" name="password" v-model="password">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-primary" @click="register">Signup</button>
                  </div>                    
                </div>
            </div>
        
      </div>
    </section>
  </div>  
</template>

<script>
  export default {
    data(){
      return {
        userName: '',
        email: '',
        password: ''
      }
    },
    methods: {
      register(){
        const userData = {
          userName: this.userName,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('handleSignUp', {...userData})
      }
    }
  }
</script>