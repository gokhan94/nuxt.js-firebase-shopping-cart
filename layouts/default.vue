<template>
  <div>
    <div class="container main-body">
      <nav class="navbar section">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/">
            <img src="/nshop-logo.png" width="120" height="28">
          </nuxt-link>
          
          <div class="navbar-burger burger" data-target="top-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>  

        <div id="top-menu" class="navbar-menu">
          <div class="navbar-start">
            <nuxt-link class="navbar-item" to="/">
                Home
            </nuxt-link>        
            <div v-if="admin" class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link is-active" href="#">
                Admin
              </a>
              <div class="navbar-dropdown ">
                <nuxt-link class="navbar-item" to="/admin/product-list">
                  Products
                </nuxt-link>
                <nuxt-link class="navbar-item" to="/admin/product-categories">
                  Product Categories
                </nuxt-link>  
                <a class="navbar-item " href="#">
                  Orders
                </a>
                <a class="navbar-item " href="#">
                  Customers
                </a>
                <nuxt-link class="navbar-item" to="/admin/administrators">
                  Administrators
                </nuxt-link>                      
                <nuxt-link class="navbar-item" to="/admin/user-groups">
                  User Groups
                </nuxt-link>
              </div>
            </div>
          </div>

          <div v-if="userProfile" class="navbar-end">   
            <div class="navbar-item">
              Welcome, {{ userProfile.userName }}
            </div>     
            <div class="navbar-item">
              <div class="field is-grouped is-grouped-multiline">
                <p class="control">
                  <button class="button is-primary" @click="logout">Çıkış</button>
                </p>
              </div>
            </div>   
            <div class="navbar-item">
              <div class="field is-grouped is-grouped-multiline">
                <p class="control">
                  <nuxt-link class="button" to="/cart">  
                    <span class="icon is-small">
                      <i class="fa fa-shopping-cart"></i>
                    </span>
                    <span>&bullet; {{ cart.items.length }} {{ cart.items.length > 1 ? 'items' : 'item' }} {{ cartTotal }} USD</span>
                  </nuxt-link>
                </p>
              </div>
            </div>
          </div>
          <div class="navbar-item" v-else>
            <div class="field is-grouped is-grouped-multiline">
                <p class="control">
                  <nuxt-link class="button is-primary" to="/login">  
                      <span class="icon is-small">
                          <i class="fa fa-unlock-alt"></i>
                      </span>
                      <span>
                        Login
                      </span>
                  </nuxt-link>
                </p>

                <p class="control">
                  <nuxt-link class="button is-info" to="/signup">  
                    <span class="icon is-small">
                      <i class="fa fa-user-o"></i>
                    </span>
                    <span>Sign up</span>
                  </nuxt-link>
                </p>
            </div>
          </div>
        </div>
      </nav>
      <nuxt/> <!-- This is where the pages are presented -->
    </div>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            &copy; Gshop<br>
            Nuxt Shopping
            
          </p>
          <p>
            <img src="/nshop-icon.png">
          </p>
        </div>
      </div>
    </footer>    
  </div>
</template>
<script>
import cartMixin from '@/mixins/cartMixin'
export default {
  mixins: [cartMixin],
  created(){
    if(!this.loginUserStatus){
      this.$store.dispatch('setAuthStatus')
    }
  },
  computed: {
    userProfile(){
      return this.$store.getters.getUser
    },
    loginUserStatus(){
      return this.$store.getters.loginStatus
    },
    admin(){
      return this.$store.getters.admin
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
}
</script>
