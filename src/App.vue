<template>
  <Navbar @open-modal="isOpenModal"></Navbar>
  <Teleport to="body">
    <CarForm v-if="openModal" @alert-form="submitForm">
      <template v-slot:heading class="heading">
        <h1 class="heading" v-if="!editModal">Add Car</h1>
        <h1 class="heading" v-else>Edit Car</h1>
      </template>
      <template v-slot:fields class="fields">
        <div class="inputDiv">
          <label>Name:</label>
          <vee-field
            name="name"
            type="text"
            v-model="carName"
            placeholder="Name"
          />
          <ErrorMessage name="name" class="error" />
        </div>
        <div class="inputDiv">
          <label>Details:</label>
          <vee-field
            as="textarea"
            name="details"
            v-model="carDetails"
            type="text"
            placeholder="Car Details"
          ></vee-field>
          <ErrorMessage name="details" class="error" />
        </div>
        <div class="inputDiv">
          <label>Image:</label>
          <vee-field
            name="url"
            v-model="carUrl"
            type="text"
            placeholder="Enter Image Url"
          />
          <ErrorMessage name="url" class="error" />
        </div>
        <div class="inputDiv">
          <label>Price:</label>
          <vee-field
            name="price"
            v-model="carPrice"
            type="number"
            placeholder="Enter Price"
          />
          <ErrorMessage name="price" class="error" />
        </div>
      </template>
      <template v-slot:buttons class="buttons">
        <button type="submit" class="btn">Submit</button>
        <button class="btn" @click="closeModal">Cancel</button>
      </template>
    </CarForm>
  </Teleport>
  <Card :cars="cars" @get-price="getPrice" @edit-item="editItem"></Card>
</template>

<script>
import cars from "/cars.json";
import Swal from "sweetalert2";
import { ErrorMessage } from "vee-validate";
import "sweetalert2/src/sweetalert2.scss";

import Card from "@/components/Card.vue";
import Navbar from "./components/Navbar.vue";
import CarForm from "./components/CarForm.vue";

export default {
  components: {
    Card,
    Navbar,
    CarForm,
    ErrorMessage,
  },
  data() {
    return {
      carName: "",
      carDetails: "",
      carUrl: "",
      carPrice: "",
      cars,
      openModal: false,
      editModal: false,
    };
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
    isOpenModal(val) {
      this.openModal = val;
      window.scrollTo(0, 0);
    },
    submitForm() {
      this.openModal = false;
      Swal.fire({
        title: "Created Data",
        html: `<div class="alertData">
            <p><b>Car Name</b>: ${this.carName}</p><p class="alertDetail"><b>Details</b>: ${this.carDetails}</p>
            <p><b>Price</b>: ₹${this.carPrice}</p>
            <p><b>Image Url</b>: ${this.carUrl}</p>
        </div>`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        confirmButtonColor: "#082032",
      });
    },
    closeModal() {
      this.openModal = false;
      this.editModal = false;
      this.carName = "";
      this.carDetails = "";
      this.carUrl = "";
      this.carPrice = "";
    },
    editItem(value) {
      window.scrollTo(0, 0);

      let carPriceSplit = 0;
      if (value.price) {
        carPriceSplit = value.price.split(" ")[2].slice(1);
      }
      console.log(carPriceSplit);
      this.openModal = true;
      this.editModal = true;

      this.carName = value.name;
      this.carDetails = value.description;
      this.carPrice = carPriceSplit;
      this.carUrl = value.image;
    },
  },
};
</script>

<style lang="scss" scoped></style>
