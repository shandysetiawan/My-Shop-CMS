<template>
  <div>
    <nav class="navbar navbar-light" style="background-color:#eae7d9">
      <router-link v-bind:to="{ name: 'Dashboard' }">Dashboard</router-link>
      <router-link to="/about">Logout</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {},
};
</script>

<style></style>
