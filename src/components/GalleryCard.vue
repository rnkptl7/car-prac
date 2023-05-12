<template>
  <div v-if="loading" class="loader">
    <div>
      <ScalingSquaresSpinner
        :animation-duration="1000"
        :size="60"
        color="#fff"
      />
      <h2>Loading...</h2>
    </div>
  </div>
  <div v-else>
    <div v-if="isError" class="errorDiv">
      <div>
        <img src="/images/error_icon.png" alt="" />
        <p>{{ error }}</p>
      </div>
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
              car.details?.slice(0, 70) + (car.details.length > 70 ? "..." : "")
            }}
          </p>
        </div>
        <div>
          <div>
            <button
              v-if="car.price"
              class="card-button"
              v-on:click="getPrice(car.price, car.name)"
            >
              More info
            </button>
            <button disabled v-else class="card-button">Available Soon</button>
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
import { ScalingSquaresSpinner } from "epic-spinners";

import CarForm from "./CarForm.vue";

export default {
  props: {
    openModal: Function,
    editModal: Boolean,
  },
  components: {
    CarForm,
    ScalingSquaresSpinner,
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
      isError: false,
      error: "",
      loading: true,
    };
  },
  emits: ["edit-item", "close-modal"],
  created() {
    this.getData();
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
                .then(() => {
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
        alert(error.response.data);
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
      try {
        const response = await axios.put(
          `https://testapi.io/api/dartya/resource/cardata/${this.editCarId}`,
          this.form
        );

        this.getData();

        this.closeModal();
      } catch (error) {
        alert(error.response.data);
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
        alert(error);
      }
    },
    async getData() {
      this.loading = true;
      try {
        const response = await axios.get(
          "https://testapi.io/api/dartya/resource/cardata"
        );

        this.cars = response.data.data;
        this.loading = false;
      } catch (error) {
        this.isError = true;
        this.error = error.response.status + " " + error.response.statusText;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card-container {
  padding: 100px 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  margin: 10px 5px;
  width: 200px;
  height: 280px;
  border-radius: 20px;
  background: #334756;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #395b64;
  transition: 0.5s ease-out;
  overflow: visible;
  cursor: pointer;

  .card-image {
    height: 140px;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.editDeleteBtn {
  position: absolute;
  right: 10px;
  bottom: 13px;
  display: flex;

  img {
    width: 20px;
    opacity: 0.8;
    padding: 5px;

    &:hover {
      opacity: 1;
    }
  }
}

.card-details {
  color: #fff;
  gap: 0.5em;
  display: grid;
  place-content: center;
}

.card-button {
  width: 50%;
  border-radius: 1rem;
  border: none;
  background-color: #334756;
  color: #fff;
  font-size: 0.9rem;
  padding: 0.4rem 0.5rem;
  position: absolute;
  left: 7%;
  bottom: 10px;
  transition: 0.3s ease-out;
  cursor: pointer;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  border: 2px solid #395b64;
  opacity: 1;
}

.text-body {
  color: rgb(255 255 255 / 73%);
}

/*Text*/
.text-title {
  font-size: 1.5em;
  font-weight: bold;
  margin: 5px 0;
  height: 42px;
}

/*Hover*/
.card:hover {
  border-color: rgb(255 255 255 / 73%);
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

button:disabled {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

button:disabled:hover {
  cursor: not-allowed;
}

@media only screen and (min-width: 630px) and (max-width: 1300px) {
  .card-container {
    padding: 100px 40px;
  }
}

@media (max-width: 629px) {
  .card-container {
    padding: 50px 40px;
  }
}
</style>
