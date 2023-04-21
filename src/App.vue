<template>
  <Navbar></Navbar>
  <Card :cars="cars" :getPrice="getPrice"></Card>
</template>

<script>
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
      cars: [
        {
          name: "Maruti Suzuki Swift",
          price: "₹5.81 - ₹8.56 Lakh",
          description:
            "The Maruti Suzuki Swift is a popular hatchback known for its sporty looks and excellent performance. It comes with a 1.2L petrol engine and offers great fuel efficiency, making it a top choice for city driving.",
          image:
            "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-profile-shots/swift-launch-2021/fireredmidnightblack.webp",
        },
        {
          name: "Mahindra Tuv 300",
          price: "₹9.00 - ₹15.70 Lakh",
          description:
            "The TUV 300 is a 7 seater 3 cylinder car and has length of 3995mm, width of 1795mm and a wheelbase of 2680mm.",
          image:
            "https://www.seekpng.com/png/full/250-2507030_mahindra-tuv300-mahindra-tuv-300-black.png",
        },
        {
          name: "Kia Seltos",
          price: "₹9.95 - ₹17.65 Lakh",
          description:
            "The Kia Seltos is a stylish and spacious SUV with a range of advanced features. It comes with a choice of petrol and diesel engines, and offers excellent performance on both city and highway roads.",
          image:
            "https://www.pngarts.com/files/6/Kia-Seltos-Transparent-Background-PNG.png",
        },
        {
          name: "Range Rover Sports",
          price: "₹5.80 - ₹9.56 Lakh",
          description:
            "Land Rover is crafted to reflect bold design with genuine capability & composure at heart. A reflection of modernity. Captivating in its simplicity.",
          image:
            "https://i.pinimg.com/originals/52/ac/01/52ac0169c1ead77f6e33180d129900af.png",
        },
        {
          name: "Mahindra Thar",
          price: "₹12.78 - ₹15.35 Lakh",
          description:
            "The Mahindra Thar is a rugged SUV with an iconic design and excellent off-road capabilities. It comes with a choice of petrol and diesel engines, and offers advanced features like touchscreen infotainment and cruise control.",
          image:
            "https://www.pharaohautomotive.com/wp-content/uploads/2022/06/Mahindra-Thar.png",
        },
        {
          name: "Honda City",
          price: "₹11.04 - ₹15.19 Lakh",
          description:
            "The Honda City is a premium sedan with a sleek and modern design. It comes with a range of advanced features including a touchscreen infotainment system, automatic climate control, and a sunroof.",
          image:
            "https://www.pngmart.com/files/22/Honda-City-PNG-Transparent.png",
        },
        {
          name: "Toyota Fortuner",
          price: "₹30.34 - ₹38.32 Lakh",
          description:
            "The Toyota Fortuner is a powerful SUV with a bold and rugged design. It comes with a choice of petrol and diesel engines,and offers advanced features like a touchscreen infotainment system, automatic climate control, and a panoramic sunroof.",
          image:
            "https://www.freepnglogos.com/uploads/fortuner-png/fortuner-gxl-automatic-melville-toyota-2.png",
        },
        {
          name: "Maruti Suzuki Alto",
          price: "₹3.04 - ₹4.41 Lakh",
          description:
            "The Maruti Suzuki Alto is a budget-friendly hatchback with a simple yet functional design. It comes with a choice of petrol engines and offers great fuel efficiency, making it a top choice for first-time car buyers.",
          image:
            "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-profile-shots/alto-800/alto800_blazing_red/alto800_blazing_red_new.ashx",
        },
        {
          name: "Renault Kwid",
          price: "₹3.32 - ₹5.88 Lakh",
          description:
            "The Renault Kwid is a stylish and compact hatchback with a bold design. It comes with a range of features including touchscreen infotainment, a reverse camera, and a digital instrument cluster.",
          image:
            "https://www.pharaohautomotive.com/wp-content/uploads/2022/06/Renault-Kwid.png",
        },
        {
          name: "Mahindra XUV300",
          price: "₹7.95 - ₹13.33 Lakh",
          description:
            "The Mahindra XUV300 is a stylish and spacious SUV with a range of advanced features. It comes with a choice of petrol and diesel engines, and offers excellent performance and fuel efficiency.",
          image:
            "https://prog-ace-cdn.azureedge.net/-/media/project/mahindra/dotcom/mahindra/dark-theme-mahindra-images/hello-xuv/xuv-300/xuv300_-dark-theme-_-hello-xuv_1920x745px_-desktop.png?rev=d70dcda99ef04ee3a2cc77ed3c9a0966",
        },
      ],
    };
  },
};
</script>
