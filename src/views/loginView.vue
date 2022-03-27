<template>
  <div class="login-form">      
      <h2>Ingresar</h2>    
      <b-form inline @submit.prevent="login()">        
        <label class="sr-only" for="inline-form-input-name">Email</label>
        <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Jane Doe"
          name="email"
          v-model="user_login.email"
        ></b-form-input>
        </b-input-group>
        <label class="sr-only" for="inline-form-input-username">Password</label>        
        <b-form-input 
        id="inline-form-input-username" 
        placeholder="Password" 
        type="password" 
        name="password"
        v-model="user_login.password"
        ></b-form-input>
        <b-button type="submit" id="button">Ingresar</b-button>
      </b-form>
</div>  
</template>

<style scoped>
  .login-form{
    display: grid;    
    justify-content: center;
    justify-items: center;
    margin-top: 10%;    
  }
  #button{
    margin-top: 5%;
    width: 100%;
  }
</style>

<script>

//import User_model from '../models/User_model'
import {required} from '@vuelidate/validators'
export default {
    name: 'loginView', 
    components:{
      
    },
    validations:{
      user_login:{
        email:{
            required,
        }
      }
    },
    data(){
      return{
        user_login:{
              email:'',                   
              password:'',
            }
      }
    },
    methods:{
      login(){
        console.log(this.user_login);
      }
    }

}
</script>