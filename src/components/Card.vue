<template>
  <div class="card-container">
    <div class="card" v-for="car in cars">
      <div class="card-image">
        <img :src="car.image" alt="" />
      </div>
      <div class="card-details">
        <p class="text-title">{{ car.name }}</p>
        <p class="text-body">
          {{
            car.description.slice(0, 50) +
            (car.description.length > 50 ? "..." : "")
          }}
        </p>
      </div>
      <button class="card-button" v-on:click="getPrice(car.price, car.name)">
        More info
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cars: {
      type: Object,
    },
    getPrice: Function,
  },
};
</script>
