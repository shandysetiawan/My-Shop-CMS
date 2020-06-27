<template>
  <div>
    <Navbar></Navbar>
    <FormEdit></FormEdit>
  </div>
</template>

<script>
import FormEdit from "@/components/FormEdit.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "EditProduct",
  components: { FormEdit, Navbar }
};
</script>

<style></style>
