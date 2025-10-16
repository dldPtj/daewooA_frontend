<script>
export default {
  name: "HotelLists",
  data() {
    return {
      favorite: false,
    }
  },
  props: {
    hotelInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    fullImageUrl() {
      const baseUrl = process.env.VUE_APP_API_URL; // 환경변수 사용
      return this.hotelInfo.imageUrls[0]
          ? `${baseUrl}${this.hotelInfo.imageUrls[0]}`
          : "";
    },
    imageCount() {
      return this.hotelInfo.imageUrls?.length || 0;
    },
  },
  methods: {
    togglefavorites() {
      this.favorite = !this.favorite;
    }
  }
};
</script>

<template>
  <div class="hotel-1">
    <div class="hotel-img">
      <div v-if="hotelInfo.imageUrls && hotelInfo.imageUrls.length > 0">
        <!-- 이미지가 있을 때 -->
        <div class="hotel-img-count">
          {{ imageCount }} images
        </div>
        <img
          :src="fullImageUrl"
          alt="hotel image"
          class="hotel-img-size"
        >
      </div>
      <!-- 이미지가 없을 때 (회색 배경 div) -->
      <div
        v-else
        class="hotel-img-placeholder"
      >
        No Image
      </div>

    </div>
    <!--호텔 정보-->
    <div class="hotel-info">
      <!--호텔 이름-->
      <div class="hotel-name">
        <h3 id="hotel-name-1">
          {{ hotelInfo.name }}
        </h3>
      </div>
      <!--호텔 위치-->
      <div class="hotel-location">
        <i class='bx  bx-location'  ></i>
        <span id="address">
          <small>{{ hotelInfo.address }}</small>
        </span>
      </div>

      <!--호텔 등급과 편의시설-->
      <div class="hotel-grade-amenities">
        <!--호텔 등급-->
        <div class="hotel-grade">
          <span id="grade-stars" v-for="value in hotelInfo.grade" :key="value">★</span>&nbsp;<span id="grade">{{ hotelInfo.grade }}</span> Star Hotel
        </div>
        <!--편의시설-->
        <div class="hotel-amenities">
          <i class='bxr  bx-cup-saucer'  ></i> <strong>+<span id="amenities">{{ hotelInfo.amenitiesCount }}</span></strong>&nbsp;Amenities
        </div>
      </div>

      <!--호텔 리뷰 평점 및 개수-->
      <div class="hotel-rating-count">
        <!--호텔 리뷰 평점-->
        <div class="hotel-review-avg">
          <span id="review-rating">{{ hotelInfo.rating }}</span>
        </div>
        <!--호텔 만족도-->
        <div class="hotel-satisfaction">
          <b><span id="satisfaction">Very Good</span></b>
        </div>
        <!--호텔 평점 개수-->
        <div class="hotel-review-count">
          <span id="review-count">{{ hotelInfo.reviewCount }}</span>&nbsp;reviews
        </div>
      </div>

      <!--호텔 찜하기, 보기 버튼-->
      <div class="hotel-liked-view">
        <!--호텔 찜하기 버튼-->
        <div class="hotel-liked">
          <button id="hotel-liked-btn" @click="togglefavorites()">
            <i class='bxr' :class="{
              'bx-heart': !favorite,
              'bx-heart-square': favorite
            }" :style="{ 'font-size': favorite ? '65px' : '30px', 'color': '#8ae6b2' }"  ></i>
          </button>
        </div>
        <!--호텔 보기 버튼-->
        <div class="hotel-view-place">
          <button @click="$router.push(`/hoteldetailpage?id=${hotelInfo.id}`)" id="view-place-btn">
            <span>View Place</span>
          </button>
        </div>
      </div>
      <!--호텔 가격-->
      <div class="hotel-price">
        <div>
          <small>starting from</small>
        </div>
        <div class="price">
          <b><span id="hotel-price">₩{{ hotelInfo.price }}</span></b><small>/night</small>
        </div>
        <div class="tax">
          <small>excl. tax</small>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.hotel-img-size {
  display: flex;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 300px;
  height: 273px;
}
.hotel-img-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 300px;
  height: 273px;
  background-color: #666; /* 회색 배경 */
  color: #303030;
  font-size: 18px;
  font-weight: bold;
}
.hotel-img-count {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: 10px 210px;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  background-color: rgba(255,255,255,0.5);
}
#hotel-price {
  font-size: 25px;
}
.price {
  color: #FF8682;
}
.tax {
  text-align: right;
}
.hotel-price {
  display: flex;
  position: absolute;
  margin: 0 0 0 300px;
  flex-direction: column;
  color: grey;
}
.hotel-review-avg {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  width: 50px;
  height: 35px;
  text-align: center;
  padding: 7px;
}
.hotel-rating-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 240px 0 0;
}
.hotel-amenities {
  display: flex;
  align-items: center;
}
.hotel-liked {
  display: flex;
}
#hotel-liked-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: #8ae6b2 solid 2px;
  border-radius: 5px;
  background-color: white;
  width: 50px;
  height: 50px;
  text-align: center;
  padding: 7px;
  font-size: 20px;
}
.hotel-view-place {
  display: flex;
}
#view-place-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: #8ae6b2;
  width: 400px;
  height: 50px;
  text-align: center;
  margin: 0 0 0 10px;
  padding: 7px;
}
.hotel-liked-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: #D9D9D9 solid 1px;
  margin: 20px 0 0 0;
  padding: 20px 0 0 0;
}
.hotel-grade-amenities {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 150px 0 0;
}
#grade-stars {
  color: #FF8682;
}
.hotel-1 {
  display: flex;
  border-radius: 15px;
  box-shadow: 0px 3px 10px #d3d3d3;
}
#address {
  max-width: 310px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hotel-location {
  display: flex;
  align-items: center;
  text-align: left;
  margin: 20px 0 10px 0;
}
.hotel-img {
  display: flex;
  border-radius: 20px 0 0 20px;
}
.hotel-info {
  display: flex;
  text-align: left;
  flex-direction: column;
  margin: auto 20px;
}
</style>