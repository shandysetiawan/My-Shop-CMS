<template>
  <div>
    <div class="msgBox">
      <div class="alert alert-primary" role="alert" v-if="msg">{{this.msg}}</div>
    </div>
    <div class="formLog">
      <form @submit.prevent="loginUser">
        <h3>E-Commerce CMS</h3>
        <h4>Please Login</h4>
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
          <input type="password" class="form-control" id="password" v-model="passwordLogin" />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" @click="showPassword()" />
          <label class="form-check-label" for="exampleCheck1">Show Password</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const baseURL = "https://e-commerce-atma.herokuapp.com";
export default {
  name: "FormLogin",
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
      msg: ""
    };
  },
  methods: {
    loginUser() {
      axios
        .post(`${baseURL}/login`, {
          email: this.emailLogin,
          password: this.passwordLogin
        })
        .then(response => {
          // console.log(response.data);
          // console.log('can logged?')

          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("emailUser", response.data.emailUser);
          this.$store.dispatch("setLogin");
          this.$router.push({ name: "Dashboard" });
        })
        .catch(error => {
          if (error.response.data.message == "Internal Server Error!") {
            this.msg =
              "Pastikan Name password dan email (dengan format email) sudah terisi";
          } else {
            this.msg = error.response.data.message;
          }

          setTimeout(() => {
            this.msg = "";
          }, 5000);
        });
    },
    showPassword() {
      let pass = document.getElementById("password");
      if (pass.type == "password") {
        pass.type = "text";
      } else {
        pass.type = "password";
      }
    }
  }
};
</script>

<style>
.msgBox {
  position: absolute;
}

.formLog {
  margin-top: 100px;
  padding-bottom: 20px;
}

input[type="email"] {
  width: 50%;
  margin-left: 25%;
}

input[type="password"] {
  width: 50%;
  margin-left: 25%;
}
</style>
