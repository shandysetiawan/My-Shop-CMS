<template>
  <form @submit.prevent="loginUser">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="emailLogin"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="passwordLogin"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import axios from 'axios';

const baseURL = 'http://localhost:3000';
export default {
  name: 'FormLogin',
  data() {
    return {
      emailLogin: '',
      passwordLogin: '',
    };
  },
  methods: {
    loginUser() {
      axios
        .post(`${baseURL}/login`, {
          email: this.emailLogin,
          password: this.passwordLogin,
        })
        .then((response) => {
          // console.log(response.data);
          // console.log('can logged?')

          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('idUser', response.data.idUser);
          localStorage.setItem('emailUser', response.data.emailUser);
          this.$router.push('Dashboard');
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
  },
};
</script>

<style></style>
