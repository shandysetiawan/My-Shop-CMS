<template>
  <div class="home">
    <Navbar></Navbar>
    <TableDashboard></TableDashboard>
  </div>
</template>

<script>
// @ is an alias to /src
import ContentDashboard from "@/components/ContentDashboard.vue";
import TableDashboard from "@/components/TableDashboard.vue";
import Navbar from "@/components/Navbar.vue";
// import axios from 'axios';

export default {
  name: "Dashboard",
  components: {
    TableDashboard,
    Navbar
  },
  data() {
    return {
      // products: getProducts,
    };
  },
  methods: {},
  created() {
    if (localStorage.token) {
      // this.$store.dispatch('fetchProducts');
    }
  },
  computed: {
    
  }
};
</script>
