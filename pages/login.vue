<template>
  <div>
    <section class="section no-top-pad">  
      <h5 class="title is-5">Login</h5><hr>
        
      <div class="columns is-centered is-mobile">        
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
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
                  <button class="button is-primary" @click="login">Login</button>
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
      email: '',
      password: ''
    }
  },
  methods: {
    login(){
      const userData = {
          email:    this.email,
          password: this.password
      }
        
      this.$store.dispatch('signIn', userData)
    }
  }
}
</script>