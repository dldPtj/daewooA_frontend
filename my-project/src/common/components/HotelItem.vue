<template>
        <!--첫번째 호텔-->
        <div class="hotel-1">
          <div class="hotel-img">
            <img src="@/assets/hotel-img-1.png">
            <div class="hotel-img-count">
              9 images
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
                <img src="@/assets/ion-location.png">
                <span id="address">
                  <small>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 344371111111111111111111111111111111111111111111111</small>
                </span>
              </div>

              <!--호텔 등급과 편의시설-->
              <div class="hotel-grade-amenities">
                <!--호텔 등급-->
                <div class="hotel-grade">

                  <span id="grade-stars">
                    <template v-for="value in hotelInfo.grade" :key="value">
                      <span>★</span>
                    </template>
                  </span>
                  &nbsp;
                  <span id="grade">{{ hotelInfo.grade }}</span> 
                  Star Hotel

                </div>
                <!--편의시설-->
                <div class="hotel-amenities">
                  <img src="@/assets/amenities.png"><strong>+<span id="amenities">20</span></strong>&nbsp;Amenities
                </div>
              </div>

            <!--호텔 리뷰 평점 및 개수-->
            <div class="hotel-rating-count">
              <!--호텔 리뷰 평점-->
              <div class="hotel-review-avg">
                <span id="review-rating">4.2</span>
              </div>
              <!--호텔 만족도-->
              <div class="hotel-satisfaction">
                <b><span id="satisfaction">Very Good</span></b>
              </div>
              <!--호텔 평점 개수-->
              <div class="hotel-review-count">
                <span id="review-count">271</span>reviews
              </div>
            </div>

            <!--호텔 찜하기, 보기 버튼-->
            <div class="hotel-liked-view">
              <!--호텔 찜하기 버튼-->
              <div class="hotel-liked">
                <button id="hotel-liked-btn">
                  <img src="@/assets/heart.png">
                </button>
              </div>
              <!--호텔 보기 버튼-->
              <div class="hotel-view-place">
                <button id="view-place-btn">
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
                <b><span id="hotel-price">₩240,000</span></b><small>/night</small>
              </div>
              <div class="tax">
                <small>excl. tax</small>
              </div>
            </div>

          </div>
        </div>
</template>





<script>
  export default {
    name: "HotelItem",
    props: {
      hotelInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  };  

</script>




<style scoped>
.price-filter {
  margin: 40px 10px 20px 0;
}
.rating-filer {
  border-top : #D9D9D9 solid 1px;
  margin: 20px 10px 20px 0;
}
.freebies-filter {
  border-top : #D9D9D9 solid 1px;
  margin: 20px 10px 20px 0;
}
.amenities-filter {
  border-top : #D9D9D9 solid 1px;
  margin: 20px 10px 20px 0;
}
.hotel-filters {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 410px;
  border-right: #D9D9D9 solid 1px;
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
.hotel-liked {
  display: flex;
}
#hotel-liked-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: white;
  width: 50px;
  height: 50px;
  text-align: center;
  padding: 7px;
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
.hotel-2 {
  display: flex;
  border-radius: 15px;
  box-shadow: 0px 3px 10px #d3d3d3;
}
.hotel-3 {
  display: flex;
  border-radius: 15px;
  box-shadow: 0px 3px 10px #d3d3d3;
}
.hotel-4 {
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
.hotel-lists {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
#accommodation-sort-option {
  border: white solid 1px;
  font-size: 15px;
  font-weight: bold;
  height: 20px;
  width: 130px;
}
.accommodation-sort {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px;
}
.accommodation-sort-text {
  font-weight: bold;
}
#accommodation-count {
  font-weight: bold;
  color: #FF8682;
}
.accommodation-selection {
  border-radius: 10px;
  box-shadow: 0px 3px 10px #d3d3d3;
  padding: 30px;
}
#hotel-count {
  border: white solid 1px;
  border-right: #d3d3d3 solid 2px;
  background-color: white;
  width: 230px;
  text-align: left;
}
#motel-count {
  border: white solid 1px;
  border-right: #d3d3d3 solid 2px;
  background-color: white;
  width: 230px;
  text-align: left;
  margin: auto 20px;
}
#resort-count {
  border: white solid 1px;
  background-color: white;
  width: 230px;
  text-align: left;
}
.hotel-search-main {
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 1240px;
}

.hotel-search-bar {
  display: flex;
  margin: 100px auto 40px;
  padding: 10px;
  border: white solid 1px;
  box-shadow: 0px 3px 10px #d3d3d3;
  border-radius: 20px;
  max-width: 1240px;
}
.hotel-search-box {
  display: flex;
  margin: 20px auto;
  gap: 10px;
  text-align: left;
}
.hotel-search-bar-box {
  display: flex;
  align-items: center;
  margin: auto 10px;
}
.hotel-search-btn{
  display: flex;
  align-items: center;
  margin: 6px auto;
}

#hotel-search-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: #8ae6b2;
  width: 55px;
  height: 55px;
}

</style>