<template>
  <div v-if="store.loading" class="loader"><Loading /></div>
  <div v-else class="carCard">
    <div v-if="store.isError" class="errorDiv">
      <Error />
    </div>
    <div v-else class="navigationBar">
      <div class="backBtn" @click="$router.push({ name: 'Home' })">
        <img src="/images/back.png" alt="" />
        <p>Back</p>
      </div>
    </div>
    <div v-if="!store.isError" class="carDetails">
      <div class="carImage">
        <img :src="car?.image" alt="" srcset="" />
      </div>
      <div class="carDesc">
        <div>
          <h1>{{ car.name }}</h1>
          <p class="details">{{ car.details }}</p>
        </div>
        <div class="carInfo">
          <button class="btn">Buy Now</button>
          <p>₹{{ car.price }}</p>
        </div>
      </div>
    </div>

    <div class="card-container">
      <div class="card cardHeight" v-for="car in carsData">
        <div class="card-image">
          <img :src="car.image" alt="" />
        </div>
        <div class="cardDetails">
          <p class="text-title">{{ car.name }}</p>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";

import axios from "axios";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";

export default {
  components: {
    Loading,
    Error,
  },
  data() {
    return {
      car: "",
      carsData: "",
      store,
    };
  },
  methods: {
    async initData() {
      try {
        store.loading = true;
        const response = await axios.get(
          `https://testapi.io/api/dartya/resource/cardata/${this.$route.params.id}`
        );
        if (response.status === 200) {
          console.log(response);
          this.car = response.data;
        }

        const data = await axios.get(
          `https://testapi.io/api/dartya/resource/cardata/`
        );
        if (data.status === 200) {
          let response = data.data.data;
          let carsFilter = response.filter(
            (response) => response.id != this.$route.params.id
          );

          this.carsData = carsFilter.slice(0, 3);
        }
        store.loading = false;
      } catch (error) {
        store.loading = false;
        store.isError = true;
        store.error = error.response.status + " " + error.response.statusText;
        console.log(error);
        // alert(error);
      }
    },
  },
  async created() {
    this.initData();

    this.$watch(() => this.$route.params, this.initData);
  },
};
</script>

<style lang="scss">
.carCard {
  //   height: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .navigationBar {
    width: 70%;
    margin: 3rem 0 0;
    // background: red;

    .backBtn {
      display: flex;
      align-items: center;
      cursor: pointer;
      width: fit-content;
      img {
        width: 35px;
      }
      p {
        font-size: 1.5rem;
        font-weight: 800;
        color: #ffffffd1;
      }
    }
  }

  .cardHeight {
    height: auto;
  }

  .carDetails {
    display: flex;
    background: #334756;
    width: 900px;
    margin: 5rem 0;
    padding: 2rem;
    border-radius: 10px;

    .carImage {
      width: 60%;
      height: 300px;
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .carDesc {
      width: 40%;
      padding: 2rem;

      h1 {
        color: #fff;
        margin: 1rem 0;
      }
      p {
        color: rgba(255, 255, 255, 0.73);
        font-size: 18px;
      }
      .details {
        height: 8rem;
      }

      .carInfo {
        width: 70%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-weight: 800;
          letter-spacing: 1px;
        }
      }
    }
  }
}

.cardDetails {
  display: flex;
  padding: 2rem;
  justify-content: space-around;
  align-items: center;

  p {
    color: #ffffffd1;
    font-size: 1.5rem;
    font-weight: 800;
  }

  a {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    text-decoration: none;
  }
}
@media only screen and (min-width: 630px) and (max-width: 1027px) {
  .carCard {
    .carDetails {
      width: 80%;

      .carDesc {
        padding: 1.3rem;

        .carInfo {
          width: 90%;
        }
      }
    }
  }
}

@media (max-width: 629px) {
  .carCard {
    .carDetails {
      width: 80%;
      flex-direction: column;

      .carDesc {
        width: 100%;
      }
      .carImage {
        width: 100%;
      }
    }
  }
}

@media (max-width: 500px) {
  .carCard {
    .carDetails {
      width: 70%;
      flex-direction: column;

      .carImage {
        width: 100%;
        height: 230px;
      }

      .carDesc {
        padding: 2rem 1rem;

        .details {
          height: 6rem;
        }
        .carInfo {
          width: 70%;
        }
      }
    }
  }
}
</style>
