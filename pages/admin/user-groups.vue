<template>
  <div>
    <section class="section no-top-pad">  
      <h5 class="title is-5">User groups</h5><hr>

      <div class="columns">
        <div class="column is-one-third">
            <form @submit.prevent="handleGroup">
          <div class="field">
            <label class="label" v-if="!group">New user group</label>
            <label class="label" v-else>Update group</label>
            <div class="control">
              <input class="input" type="text"  v-model="name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button  type="submit" class="button is-primary">{{ !group ? 'Create' : 'Update'}}</button>
            </div>                    
          </div>
          </form>
        </div>
        <div class="column">
          <table class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>User group</th>
                <th>&nbsp;</th>
              </tr>
            </thead>  
            <tbody>
              <tr v-for="(group, index) in groups" :key="group.key">
                <th>{{ ++index }}</th>
                <td><a href="#" @click.prevent="selectGroup(group)">{{ group.name }}</a></td>
                <td><a href="#" @click.prevent="removeGroup(group)"><span class="icon has-text-danger"><i class="fa fa-lg fa-times-circle"></i></span></a></td>
              </tr>
            </tbody>
          </table>
        </div>                
      </div>                        
    </section>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        name: '',
        group: ''
      }
    },
    created(){
      const groupData = this.$store.getters['admin/groups']
      if(groupData.length === 0){
        this.$store.dispatch('admin/getGroups')
      }
    },
    methods: {
      handleGroup(){
        if(!this.group){
          this.$store.dispatch('admin/createGroup', 
          { name: this.name })
        }else{
          this.$store.dispatch('admin/updateGroup', 
          { name: this.name, group: this.group })
        }
      },
      selectGroup(group){
        //Seçilen grubun name değerini datadaki name ile eşitler
        this.group = group
        this.name  = group.name
      },
      removeGroup(group){
       this.$store.dispatch('admin/removeGroup', { group: group })
      }
    },
    computed: {
      groups(){
        return this.$store.getters['admin/groups']
      }
    }
  }
</script>