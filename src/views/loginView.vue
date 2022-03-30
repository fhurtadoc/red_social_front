<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <form @submit.prevent="handleSubmit" class="login-form">              
              <h2>Ingresar</h2>                            
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email es Necesario</span>
                  <span v-if="!$v.user.email.email">Email es invalido</span>
                </div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  id="password"
                  name="password"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.password.required"
                    >Password es requerido</span
                  >
                  <span v-if="!$v.user.password.minLength"
                    >Password debe contener 6 caracteres</span
                  >
                </div>
              </div>              
              <div class="form-group">
                <button class="btn btn-secondary" >Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import enviromentApi from '../../enviromentApi';
import axios from 'axios';
import Vue from 'vue'


export default {
  name: "app",
  data() {
    return {
      url:enviromentApi.URL,
      user: {                
        email: "",
        password: "",        
      },
      submitted: false,
    };
  },
  validations: {
    user: {      
      email: { required, email },
      password: { required, minLength: minLength(6) },      
    },
  },
  methods: {
    handleSubmit() {      
      this.submitted = true;      
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }      
      /*let form_data=new FormData();
      form_data.append('email',this.user.email)
      form_data.append('password',this.user.password) */
      axios({
                method:"post",
                url: this.url+'/user/login',
                data:this.user,                  
            })
            .then((res)=>{
                if(res.data.codigo===402) {
                    alert(res.data.menssaje + "registrate")
                    setTimeout(()=>{
                    this.$router.push('/logup');
                  },1000)
              }
                if(res.data.codigo===200) {
                const payload = Vue.$jwt.decode(res.data.token, 'process.env.TOKEN_FORGOT')
                var user=payload.user;
                var token=res.data.token 
                localStorage.setItem('User', JSON.stringify(user));
                localStorage.setItem('Token', JSON.stringify(token));
                this.$router.push('/Perfil');
              }
            })
            .catch((res)=>{
                console.log(res);
            })

      /*axios({
                method:"post",
                url: this.url+'/login/newUser',
                data:form_data,  
                headers: { "Content-Type": "multipart/form-data"}                              
            })
      .then((res)=>{
        
      })
      .catch((err)=>{
        console.log(err);
      })*/
    },
  },
};
</script>

<style scoped>
  .login-form{
    display: grid;    
    justify-content: center;
    justify-items: center;
    margin-top: 10%;    
  }
  .btn-secondary{
    margin-top: 5%;
    width: 100%;
  }
  .alert{
    color: red;
  }
</style>
