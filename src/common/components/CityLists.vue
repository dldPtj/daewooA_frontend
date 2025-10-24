<script>
export default {
  name: "CityLists",
  props: {
    cityInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    fullImageUrl() {
      const baseUrl = process.env.VUE_APP_API_URL; // 환경변수 사용
      return this.cityInfo.imageUrl
          ? `${baseUrl}${this.cityInfo.imageUrl}`
          : "";
    },
  }
};
</script>

<template>
  <!--도시-->
  <div class="first-city">
    <div class="city-img-container">
      <img :src="fullImageUrl" alt="city image" class="city-img-size">
    </div>

    <div class="city-item">
      <div class="city-content">
        <h3 class="city-title">
          {{ cityInfo.cityName }}
        </h3>
        <span class="city-detail">
          <!--한줄(두줄)에는 공백포함 18자(40자)만 허용하기-->
          {{ cityInfo.title }}
        </span>
      </div>
      <div class="homepage-hotel-price">
        <h3>
          {{ cityInfo?.price?.toLocaleString() }}원
        </h3>
      </div>
    </div>
    <div class="hotel-book-btn">
      <button id="bookhotel">Book a Hotel</button>
    </div>

  </div>
</template>

<style>
.first-city:hover {
  transition: transform 0.3s ease-out;
  transform: translateY(-15px);
}
.city-img-container {
  border-radius: 15px;
  width: 300px;
  height: 420px;
  overflow: hidden;
}
.city-img-size {
  display: flex;
  width: 200%;
  height: 100%;
  object-fit: cover;
}
.city-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  width: 250px;
  margin: -140px 25px 25px;
}
.city-content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  z-index: 2;
  color: white;
}
.city-title {
  text-shadow: 0 0 5px black;
}
.city-detail {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  text-shadow: 0 0 5px black;
}
.homepage-hotel-price {
  display: flex;
  z-index: 2;
  color: white;
  text-shadow: 0 0 5px black;
}
#bookhotel {
  width: 250px;
  height: 50px;
  font-size: 15px;
  background-color: #8ae6b2;
  border-radius: 5px;
  border: #8ae6b2 solid 1px;
}
.hotel-book-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -10px auto;
}
#bookhotel:hover {
  border-radius: 5px;
  border: #67bd95 solid 1px;
  background-color: #6ec89e;
}
</style>