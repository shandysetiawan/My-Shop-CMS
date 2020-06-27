<template>
  <div>
    <nav class="navbar navbar-light" style="background-color:#eae7d9">
      <div style="color:black">Welcome {{this.currentLogin}}</div>
      <router-link v-bind:to="{ name: 'Dashboard' }">Dashboard</router-link>
      <a href v-on:click="logOutUser">Logout</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      currentLogin: localStorage.emailUser
    };
  },
  methods: {
    logOutUser() {
      // console.log("ke logout");
      localStorage.removeItem("token");
      localStorage.removeItem("emailUser");
      this.$router.push({ name: "Login" });
    }
  },
  computed: {}
};
</script>

<style></style>
