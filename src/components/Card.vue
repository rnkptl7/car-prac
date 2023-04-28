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
            car.description.slice(0, 70) +
            (car.description.length > 70 ? "..." : "")
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
            @click="deleteItem(car.name)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cars: {
      type: Object,
    },
  },
  emits: ["get-price", "edit-item"],
  methods: {
    getPrice(carPrice, carName) {
      this.$emit("get-price", carPrice, carName);
    },
    deleteItem(carName) {
      alert(`Delete ${carName}`);
    },
    editItem(value) {
      this.$emit("edit-item", value);
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
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
