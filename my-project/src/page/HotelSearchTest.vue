<script >
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from  "@/components/FooterComponent.vue"
import HotelItem from "@/common/components/HotelItem.vue";
import axios from "@/common/commonAxios.js";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    HotelItem,
    
  },
  data() {
    return {
      hotels: []
    }
  },  
  async mounted() {
    const res = await axios.get('hotels/list');
    const data = res.data;
    console.log('data >>> ', data);
    this.hotels = data || [];
  }
}
</script>

<template>
  <HeaderComponent />

  <!--호텔 검색 바-->
  <div class="hotel-search-bar">

    <div class="hotel-search-box">
      <form class="enter-destination">
        <fieldset>
          <legend>
            &nbsp;Enter Destination&nbsp;
          </legend>
          <div class="hotel-search-bar-box">
            <img src="@/assets/ion_bed.png" alt="침대 아이콘">&nbsp;도시와 호텔을 선택하세요
          </div>
        </fieldset>
      </form>
      <form class="check-in">
        <fieldset>
          <legend>
            &nbsp;Check In&nbsp;
          </legend>
          <div class="hotel-search-bar-box">
            <button id="checkin" onclick="showCalendar()">
              날짜를 선택하세요&nbsp;&nbsp;<img class="calendar-icon" src="@/assets/calendar.png" alt="달력 아이콘">
            </button>
          </div>
        </fieldset>
      </form>
      <form class="check-out">
        <fieldset>
          <legend>
            &nbsp;Check Out&nbsp;
          </legend>
          <div class="hotel-search-bar-box">
            <button id="checkout" onclick="showCalendar()">
              날짜를 선택하세요&nbsp;&nbsp;<img class="calendar-icon" src="@/assets/calendar.png" alt="달력 아이콘">
            </button>
          </div>
        </fieldset>
      </form>
      <form class="roomguests">
        <fieldset>
          <legend>
            &nbsp;Room & Guests&nbsp;
          </legend>
          <div class="hotel-search-bar-box">
            <img src="@/assets/ion_user.png" alt="유저 아이콘">&nbsp;방 개수, 인원 수를 선택하세요
          </div>
        </fieldset>
      </form>
      <div class="hotel-search-btn">
        <button id="hotel-search-btn">
          <img src="@/assets/search.png">
        </button>
      </div>
    </div>

  </div>

  <!--호텔 검색 화면 메인 부분-->
  <div class="hotel-search-main">

    <!--호텔 필터링-->
    <div class="hotel-filters">
      <div class="filers">
        <h3>Filters</h3>
      </div>
      <!--가격 필터-->
      <div class="price-filter">
        <h4>Price</h4>
        <input type="range" id="mySlider" name="mySlider" min="0" max="100" value="50">
      </div>
      <!--호텔 평점 필터-->
      <div class="rating-filer">
        <h4>Rating</h4>
      </div>
      <!--호텔 무료 서비스 필터-->
      <div class="freebies-filter">
        <h4>Freebies</h4>
      </div>
      <!--호텔 편의시설 필터-->
      <div class="amenities-filter">
        <h4>Amenities</h4>
      </div>
    </div>

    <!--필터링 된 호텔-->
    <div class="filtered-hotel">
      <header class="accommodation">
        <div class="accommodation-selection">
          <button role="tab" id="hotel-count">
            <h3>Hotels</h3>
            <span>257 places</span>
          </button>
          <button role="tab" id="motel-count">
            <h3>Motels</h3>
            <span>51 places</span>
          </button>
          <button role="tab" id="resort-count">
            <h3>Resorts</h3>
            <span>72 places</span>
          </button>
        </div>
      </header>
      <div class="accommodation-sort">
        <div class="accommodation-sort-text">
          Showing 4 of <span id="accommodation-count">257 places</span>
        </div>
        <div>
          <label>Sort by&nbsp;</label>
          <select id="accommodation-sort-option">
            <option value=""><b>Hotel Sorting</b></option>
            <option value="highest-price">Highest Price</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-rated">Highest Rated</option>
          </select>
        </div>
      </div>

      <!--호텔 리스트-->
      <div class="hotel-lists">

        <HotelItem v-for="hotel in hotels" :key="hotel.id" :hotelInfo="hotel"/>

      </div>


    </div>
  </div>
  <FooterComponent />
</template>

<style >
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