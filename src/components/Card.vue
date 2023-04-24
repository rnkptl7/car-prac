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
            car.description.slice(0, 80) +
            (car.description.length > 80 ? "..." : "")
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
  height: 254px;
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
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.card-details {
  color: #fff;
  gap: 0.5em;
  display: grid;
  place-content: center;
}

.card-button {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #334756;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
  cursor: pointer;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  border: 2px solid #395b64;
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

.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
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
