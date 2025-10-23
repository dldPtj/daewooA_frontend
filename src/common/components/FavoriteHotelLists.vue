<script>
export default {
  name: "FavoriteHotelLists",
  props: {
    favoriteHotelInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      favorite: true,
    }
  },
  computed: {
    fullImageUrl() {
      const baseUrl = process.env.VUE_APP_API_URL;
      return this.favoriteHotelInfo.imageUrls && this.favoriteHotelInfo.imageUrls[0]
        ? `${baseUrl}${this.favoriteHotelInfo.imageUrls[0]}`
        : "./default-favorite-img.png"; // 이미지가 없을 때 기본 이미지 경로
    },
    imageCount() {
      return this.favoriteHotelInfo.imageUrls?.length || 0;
    },
  },
  methods: {
    togglefavorites() {
      this.favorite = !this.favorite;
      // 찜 해제 이벤트를 부모에게 전달합니다. (hotelInfo.id 등을 보낼 수 있습니다)
      this.$emit('remove-favorite', this.favoriteHotelInfo.id);
    }
  }
}
</script>

<template>
  <div class="favorite-hotel">
    <div class="favorite-hotel-img">
      <img :src="fullImageUrl" alt="favorite hotel image">
      <div class="favorite-hotel-img-count">
        {{ imageCount }} images
      </div>
    </div>
    <!--호텔 정보-->
    <div class="favorite-hotel-info">
      <div class="favorite-hotel-info-top">
        <div class="favorite-hotel-info-left">
          <!--호텔 이름-->
          <div class="favorite-hotel-name">
            <h3 id="favorite-hotel-name-1">
              {{ favoriteHotelInfo.name }}
            </h3>
          </div>
          <!--호텔 위치-->
          <div class="favorite-hotel-location">
            <i class='bx  bx-location'  ></i>
            <span id="favorite-address">
              <small>{{ favoriteHotelInfo.address }}</small>
            </span>
          </div>
        </div>

        <!--호텔 가격-->
        <div class="favorite-hotel-price">
          <div>
            <small>starting from</small>
          </div>
          <div class="favorite-price">
            <b><span id="favorite-hotel-price">₩{{ favoriteHotelInfo?.price?.toLocaleString() }}</span></b><small>/night</small>
          </div>
          <div class="favorite-tax">
            <small>excl. tax</small>
          </div>
        </div>
      </div>

      <!--호텔 등급과 편의시설-->
      <div class="favorite-hotel-grade-amenities">
        <!--호텔 등급-->
        <div class="favorite-hotel-grade">
          <span id="favorite-grade-stars" v-for="value in hotelInfo.grade" :key="value">★</span>&nbsp;<span id="grade">{{ hotelInfo.grade }}</span> Star Hotel
        </div>
        <!--편의시설-->
        <div class="favorite-hotel-amenities">
          <i class='bxr  bx-cup-saucer'  ></i><strong>+<span id="amenities">20</span></strong>&nbsp;Amenities
        </div>
      </div>

      <!--호텔 리뷰 평점 및 개수-->
      <div class="favorite-hotel-rating-count">
        <!--호텔 리뷰 평점-->
        <div class="favorite-hotel-review-avg">
          <span id="favorite-review-rating">{{ favoriteHotelInfo.rating }}</span>
        </div>
        <!--호텔 만족도-->
        <div class="favorite-hotel-satisfaction">
          <b><span id="favorite-satisfaction">Very Good</span></b>
        </div>
        <!--호텔 평점 개수-->
        <div class="favorite-hotel-review-count">
          <span id="favorite-review-count">{{ favoriteHotelInfo.reviewCount }}</span>reviews
        </div>
      </div>

      <!--호텔 찜하기, 보기 버튼-->
      <div class="favorite-hotel-liked-view">
        <!--호텔 찜하기 버튼-->
        <div class="favorite-hotel-liked">
          <button id="favorite-hotel-liked-btn" @click="togglefavorites()">
            <i class='bxr' :class="{
              'bx-heart': !favorite,
              'bx-heart-square': favorite
            }" :style="{ 'font-size': favorite ? '65px' : '30px', 'color': '#8ae6b2' }"  ></i>
          </button>
        </div>
        <!--호텔 보기 버튼-->
        <div class="favorite-hotel-view-place">
          <button @click="$router.push(`/hoteldetailpage?id=${favoriteHotelInfo.id}`)" id="favorite-view-place-btn">
            <span>View Place</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.favorite-hotel-img-count {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: 10px 210px;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
}
#favorite-hotel-price {
  font-size: 25px;
}
.favorite-price {
  color: #FF8682;
}
.favorite-tax {
  text-align: right;
}
.favorite-hotel-price {
  flex-direction: column;
  color: grey;
}
.favorite-hotel-info-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.favorite-hotel-review-avg {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  width: 50px;
  height: 35px;
  text-align: center;
  padding: 7px;
}
.favorite-hotel-rating-count {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
}
.favorite-hotel-liked {
  display: flex;
}
#favorite-hotel-liked-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: white;
  width: 50px;
  height: 50px;
  text-align: center;
}
#favorite-hotel-liked-btn:hover {
  background-color: #d3d3d3;
}
.favorite-hotel-view-place {
  display: flex;
}
#favorite-view-place-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: #8ae6b2;
  width: 830px;
  height: 50px;
  text-align: center;
  margin: 0 0 0 10px;
  padding: 7px;
}
#favorite-view-place-btn:hover {
  background-color: #6acd97;
}
.favorite-hotel-liked-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: #D9D9D9 solid 1px;
  margin: 20px 0 0 0;
  padding: 20px 0 0 0;
}
.favorite-hotel-grade-amenities {
  display: flex;
  align-items: center;
  gap: 10px;
}
.favorite-hotel-amenities {
  display: flex;
  align-items: center;
}
#favorite-grade-stars {
  color: #FF8682;
}
.favorite-hotel {
  display: flex;
  border-radius: 15px;
  box-shadow: 0px 3px 10px #d3d3d3;
}
#favorite-address {
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.favorite-hotel-location {
  display: flex;
  align-items: center;
  text-align: left;
  margin: 20px 0 10px 0;
}
.favorite-hotel-img {
  display: flex;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
}
.favorite-hotel-info {
  display: flex;
  text-align: left;
  flex-direction: column;
  margin: auto 20px;
}
</style>