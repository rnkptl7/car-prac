<template>
  <div v-if="store.loading" class="loader">
    <Loading />
  </div>
  <div v-else>
    <div v-if="store.isError" class="errorDiv">
      <Error />
    </div>
    <div v-else class="card-container">
      <div class="card" v-for="car in cars">
        <div class="card-image">
          <img :src="car.image" alt="" />
        </div>
        <div class="card-details">
          <p class="text-title">{{ car.name }}</p>
          <p class="text-body">
            {{
              car.details?.slice(0, 70) +
              (car.details?.length > 70 ? "..." : "")
            }}
          </p>
          <div class="cardBtn">
            <div>
              <router-link
                v-if="car.price"
                class="card-button"
                :to="{ name: 'Details', params: { id: car.id } }"
                >Info</router-link
              >
              <button disabled v-else class="card-button">
                Available Soon
              </button>
            </div>
            <div class="editDeleteBtn">
              <img
                class="editImage"
                src="/images/edit.png"
                alt="edit button"
                @click="editItem(car)"
              />
              <img
                src="/images/delete.png"
                alt="delete button"
                @click="deleteItem(car.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <CarForm v-if="openModal">
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
              v-model="form.name"
              placeholder="Name"
            />
            <ErrorMessage name="name" class="error" />
          </div>
          <div class="inputDiv">
            <label>Details:</label>
            <vee-field
              as="textarea"
              name="details"
              v-model="form.details"
              type="text"
              placeholder="Car Details"
            ></vee-field>
            <ErrorMessage name="details" class="error" />
          </div>
          <div class="inputDiv">
            <label>Image:</label>
            <vee-field
              name="url"
              v-model="form.image"
              type="text"
              placeholder="Enter Image Url"
            />
            <ErrorMessage name="url" class="error" />
          </div>
          <div class="inputDiv">
            <label>Price:</label>
            <vee-field
              name="price"
              v-model="form.price"
              type="number"
              placeholder="Enter Price"
            />
            <ErrorMessage name="price" class="error" />
          </div>
        </template>
        <template v-slot:buttons class="buttons">
          <button
            v-if="editModal"
            type="submit"
            @click.prevent="updateData"
            class="btn"
          >
            Update
          </button>
          <button v-else type="submit" class="btn" @click.prevent="submitForm">
            Submit
          </button>
          <button class="btn" @click="closeModal">Cancel</button>
        </template>
      </CarForm>
    </Teleport>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ErrorMessage } from "vee-validate";
import "sweetalert2/src/sweetalert2.scss";
// import { ScalingSquaresSpinner } from "epic-spinners";

import CarForm from "./CarForm.vue";
import Loading from "./Loading.vue";
import Error from "./Error.vue";
import { store } from "../store";

export default {
  props: {
    openModal: Function,
    editModal: Boolean,
  },
  components: {
    CarForm,
    Loading,
    Error,
    // ScalingSquaresSpinner,
  },
  data() {
    return {
      form: {
        name: "",
        details: "",
        image: "",
        price: "",
      },
      cars: "",
      editCarId: "",
      store,
    };
  },
  emits: ["edit-item", "close-modal"],
  created() {
    this.getData();
    // store.getData();
  },
  methods: {
    getPrice(carPrice, carName) {
      Swal.fire({
        title: "Price of " + carName,
        text: `₹ ${carPrice}`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        confirmButtonColor: "#082032",
      });
    },
    async deleteItem(id) {
      try {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              axios
                .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
                .then((res) => {
                  console.log(res);
                  swalWithBootstrapButtons.fire(
                    "Deleted!",
                    "Your data has been deleted.",
                    "success"
                  );

                  this.getData();
                })
                .catch((err) => {
                  alert(err.response.data);
                  this.getData();
                });
            }
          });
      } catch (error) {
        store.loading = false;
        store.isError = true;
        store.error = error.response.status + " " + error.response.statusText;
      }
    },
    editItem(value) {
      this.$emit("edit-item");
      window.scrollTo(0, 0);

      this.editCarId = value.id;

      this.form.name = value.name;
      this.form.details = value.details;
      this.form.price = value.price;
      this.form.image = value.image;
    },
    async updateData() {
      if (
        this.form.name === "" ||
        this.form.details === "" ||
        this.form.image === "" ||
        this.form.price === ""
      ) {
        alert("Please fill the form");
      } else {
        try {
          const response = await axios.put(
            `https://testapi.io/api/dartya/resource/cardata/${this.editCarId}`,
            this.form
          );

          this.getData();

          this.closeModal();
        } catch (error) {
          store.loading = false;
          store.isError = true;
          store.error = error.response.status + " " + error.response.statusText;
        }
      }
    },
    closeModal() {
      this.$emit("close-modal");

      this.form.name = "";
      this.form.details = "";
      this.form.image = "";
      this.form.price = "";
      this.editCarId = "";
    },
    async submitForm() {
      if (
        this.form.name === "" ||
        this.form.details === "" ||
        this.form.image === "" ||
        this.form.price === ""
      ) {
        alert("Please fill the form");
      } else {
        try {
          const response = await axios.post(
            "https://testapi.io/api/dartya/resource/cardata",
            this.form
          );

          if (response.status === 201) {
            this.$emit("close-modal");
            Swal.fire({
              title: "Created Data",
              html: `<div class="alertData">
              <p><b>Car Name</b>: ${this.form.name}</p><p class="alertDetail"><b>Details</b>: ${this.form.details}</p>
          <p><b>Price</b>: ₹${this.form.price}</p>
          <p><b>Image Url</b>: ${this.form.image}</p>
          </div>`,
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
              confirmButtonColor: "#082032",
            });

            this.getData();
          }
        } catch (error) {
          store.loading = false;
          store.isError = true;
          store.error = error.response.status + " " + error.response.statusText;
        }
      }
    },
    async getData() {
      store.loading = true;
      try {
        const response = await axios.get(
          "https://testapi.io/api/dartya/resource/cardata"
        );

        this.cars = response.data.data;
        store.loading = false;
      } catch (error) {
        // alert(error);
        store.loading = false;
        store.isError = true;
        store.error = error.response.status + " " + error.response.statusText;
      }
    },
  },
};
</script>
