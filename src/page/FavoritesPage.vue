<script>

import {defineComponent} from "vue";
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";

export default defineComponent({
  components: {FooterComponent, HeaderComponent}
})
</script>

<template>
  <!--HeaderComponent 부분-->
  <HeaderComponent />

  <header>
    <h1 class="favoritespage-title">Favorites</h1>
  </header>

  <!--flight, hotel 선택 바-->
  <header class="favorites-selection-bar">
    <div class="favorites-selection">
      <button role="tab" id="favorite-flights-count">
        <h3>Flights</h3>
        <span>2 marked</span>
      </button>
      <button role="tab" id="favorite-places-count">
        <h3>Places</h3>
        <span>3 marked</span>
      </button>
    </div>
  </header>

  <div class="favorite-hotel-lists">
    <!--즐겨찾기한 호텔-->
    <div class="favorite-hotel">
      <div class="favorite-hotel-img">
        <img src="../assets/hotel-img-1.png">
        <div class="favorite-hotel-img-count">
          9 images
        </div>
      </div>
      <!--호텔 정보-->
      <div class="favorite-hotel-info">
        <div class="favorite-hotel-info-left">
          <!--호텔 이름-->
          <div class="favorite-hotel-name">
            <h3 id="favorite-hotel-name-1">
              해튼 호텔
            </h3>
          </div>
          <!--호텔 위치-->
          <div class="favorite-hotel-location">
            <img src="../assets/ion-location.png">
            <span id="favorite-address">
              <small>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 344371111111111111111111111111111111111111111111111</small>
            </span>
          </div>

          <!--호텔 등급과 편의시설-->
          <div class="favorite-hotel-grade-amenities">
            <!--호텔 등급-->
            <div class="favorite-hotel-grade">
              <span id="favorite-grade-stars">☆☆☆☆☆</span>&nbsp;<span id="grade">5</span> Star Hotel
            </div>
            <!--편의시설-->
            <div class="favorite-hotel-amenities">
              <img src="../assets/amenities.png"><strong>+<span id="amenities">20</span></strong>&nbsp;Amenities
            </div>
          </div>

          <!--호텔 리뷰 평점 및 개수-->
          <div class="favorite-hotel-rating-count">
            <!--호텔 리뷰 평점-->
            <div class="favorite-hotel-review-avg">
              <span id="favorite-review-rating">4.2</span>
            </div>
            <!--호텔 만족도-->
            <div class="favorite-hotel-satisfaction">
              <b><span id="favorite-satisfaction">Very Good</span></b>
            </div>
            <!--호텔 평점 개수-->
            <div class="favorite-hotel-review-count">
              <span id="favorite-review-count">271</span>reviews
            </div>
          </div>
        </div>


          <!--호텔 가격-->
          <div class="favorite-hotel-price">
            <div>
              <small>starting from</small>
            </div>
            <div class="favorite-price">
              <b><span id="favorite-hotel-price">₩240,000</span></b><small>/night</small>
            </div>
            <div class="favorite-tax">
              <small>excl. tax</small>
            </div>
          </div>

        <!--호텔 찜하기, 보기 버튼-->
        <div class="favorite-hotel-liked-view">
          <!--호텔 찜하기 버튼-->
          <div class="favorite-hotel-liked">
            <button id="favorite-hotel-liked-btn">
              <img src="../assets/heart.png">
            </button>
          </div>
          <!--호텔 보기 버튼-->
          <div class="favorite-hotel-view-place">
            <button @click="$router.push('/hoteldetail')" id="favorite-view-place-btn">
              <span>View Place</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent/>
</template>

<style>
.favorite-hotel-lists {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 40px auto;
  max-width: 1240px;
  gap: 20px;
}
.favorite-hotel-img-count {
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
  display: flex;
  position: absolute;
  flex-direction: column;
  color: grey;
  margin: 15px 0 0 730px;
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
  gap: 10px;
}
.favorite-hotel-liked {
  display: flex;
}
#favorite-hotel-liked-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: white;
  width: 50px;
  height: 50px;
  text-align: center;
  padding: 7px;
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
.favorites-selection {
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 1240px;
  margin: 0 auto;
  text-align: left;
  border-radius: 10px;
  box-shadow: 0px 3px 10px #d3d3d3;
}
#favorite-flights-count {
  border: white solid 1px;
  padding: 25px;
  background-color: white;
  width: 600px;
  text-align: left;
  margin: auto 15px;
}
#favorite-flights-count:hover {
  border-bottom: #8ae6b2 solid 5px;
}
#favorite-places-count {
  border: white solid 1px;
  border-left: #d3d3d3 solid 2px;
  padding: 25px;
  background-color: white;
  width: 600px;
  text-align: left;
}
#favorite-places-count:hover {
  border-bottom: #8ae6b2 solid 5px;
}
.favoritespage-title {
  display: flex;
  margin: 100px auto 40px;
  max-width: 1240px;
}
</style>