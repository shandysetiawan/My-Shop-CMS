<template>
  <tbody style="background-color:#eae7d9">
    <tr style="text-align:center">
      <th scope="row">{{ index+1 }}</th>
      <td>
        <img :src="product.image_url" :alt="product.name" style="width:100px;height:100px" />
      </td>
      <td>{{ product.name }}</td>
      <td>{{ product.stock }}</td>
      <td>{{ product.price }}</td>
      <td class="d-flex justify-content-center">
        <router-link v-bind:to="`/edit-product/${product.id}`">
          <button type="button" class="btn btn-primary mr-2">Edit Produk</button>
        </router-link>
        <button type="button" class="btn btn-info" @click="showModalDelete=true">Delete Produk</button>

        <div class="loadingModal" v-if="showModalDelete">
          <div class="theModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
                  <button type="button" class="close" @click="showModalDelete = !showModalDelete">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">Are you sure want to delete this?</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showModalDelete = !showModalDelete"
                  >Close</button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="removeDelete(product.id)"
                  >Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
// import axios from 'axios';
// import Modal from "@/components/Modal.vue";
const baseURL = "http://localhost:3000";
import axios from "axios";
export default {
  name: "ContentDashboard",
  data() {
    return {
      products: [],
      deleteClick: false,
      showModalDelete: false
    };
  },
  props: ["product", "index"],
  components: {},
  methods: {
    // deleteProduct(id) {
    //   this.$store.dispatch("deleteProduct", {
    //     id: id
    //   });
    // }
    removeDelete(id) {
      this.showModalDelete = false;

      axios({
        method: "delete",
        url: `${baseURL}/products/${id}`,
        headers: { access_token: localStorage.token }
      })
        .then(response => {
          // console.log(response.data);
          // console.log('can logged?')
          // this.$router.push({ name: "Dashboard" });
          // this.$emit("refresh");
          this.$store.dispatch("fetchProducts");
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loadingModal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1072;
  /*display: none;*/
}
​ .theModal {
  position: absolute;
  top: 20%;
  left: 50%;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  width: 100%;
  min-width: 600px;
  max-width: 800px;
  /*background: white;*/
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 1em;
  color: black;
  text-align: center;
}
</style>
