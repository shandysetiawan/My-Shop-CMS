<template>
  <div>
    <div style="overflow-x:auto;">
      <h3 style="text-align:left" class="mt-3 mb-3">List Produk</h3>
      <router-link v-bind:to="{ name: 'AddProduct' }">
        <button type="button" class="btn btn-warning btn-lg mt-3 mb-3">Tambah Produk</button>
      </router-link>
      <router-view></router-view>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Gambar</th>
            <th scope="col">Nama Produk</th>
            <th scope="col">Stok</th>
            <th scope="col">Harga</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <ContentDashboard
          v-for="(product, idx) in getProducts"
          :key="idx"
          :product="product"
          :index="idx"
        ></ContentDashboard>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ContentDashboard from "@/components/ContentDashboard.vue";
// import axios from 'axios';

export default {
  name: "TableDashboard",
  components: {
    ContentDashboard
  },
  data() {
    return {};
  },
  methods: {
    // refreshPage() {
    //   this.getProducts;
    // }
  },
  created() {
    if (localStorage.token) {
      this.$store.dispatch("fetchProducts");
    }
  },
  computed: {
    getProducts() {
      // console.log(this.$store.state.products);
      return this.$store.state.products;
    }
  }
};
</script>
