<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            
            <form @submit.prevent="handleSubmit" class="login-form">
              <h2>Registrate</h2>              
              <div class="form-group">
                <label for="lastName">Nombre de Usuario </label>
                <input
                  type="text"
                  v-model="user.nickname"
                  id="nickname"
                  name="lastName"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.nickname.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.user.nickname.required"
                  class="invalid-feedback"
                >
                  Last Name is required
                </div>
              </div>
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
                  <span v-if="!$v.user.email.required">Email is required</span>
                  <span v-if="!$v.user.email.email">Email is invalid</span>
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
                    >Password is required</span
                  >
                  <span v-if="!$v.user.password.minLength"
                    >Password must be at least 6 characters</span
                  >
                </div>
              </div>              
              <div class="form-group">
                <button class="btn btn-secondary" >Register</button>
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

export default {
  name: "app",
  data() {
    return {
      user: {        
        nickname: "",
        email: "",
        password: "",
        status: 1        
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      nickname: { required },      
      email: { required, email },
      password: { required, minLength: minLength(6) },      
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      console.log(this.user);
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
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



