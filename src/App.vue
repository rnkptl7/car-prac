<template>
  <Navbar></Navbar>
  <Card :cars="cars" :getPrice="getPrice"></Card>
</template>

<script>
import cars from "/cars.json";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import Card from "@/components/Card.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Card,
    Navbar,
  },
  methods: {
    getPrice(price, name) {
      Swal.fire({
        title: "Price of " + name,
        text: price,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        confirmButtonColor: "#082032",
      });
    },
  },
  data() {
    return {
      cars,
    };
  },
};
</script>
