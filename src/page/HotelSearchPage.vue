<script >
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import {aTeamApi} from "@/util/axios";
import HotelLists from "@/common/components/HotelLists.vue";
import SearchbarComponent from "@/common/components/SearchbarComponent.vue";

export default {
  components: {
    SearchbarComponent,
    HotelLists,
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
  },
  name: 'HotelSearch',
  data() {
    return {
      hotellists: [],
      FilterOpen: true,
      priceFilterOpen: false,
      ratingFilterOpen: false,
      freebiesFilterOpen: false,
      amenitiesFilterOpen: false
    }
  },
  async mounted() {
    const result = await aTeamApi.get('/api/hotels/filter');
    const resultData = result.data.hotels;
    console.log('data >>> ', resultData);
    this.hotellists = resultData || [];
  },
  methods: {
    toggleFilter(filterName) {
      if (filterName === 'price') {
        this.priceFilterOpen = !this.priceFilterOpen;
      } else if (filterName === 'rating') {
        this.ratingFilterOpen = !this.ratingFilterOpen;
      } else if (filterName === 'freebies') {
        this.freebiesFilterOpen = !this.freebiesFilterOpen;
      } else if (filterName === 'amenities') {
        this.amenitiesFilterOpen = !this.amenitiesFilterOpen;
      }
    },
  }
}
</script>

<template>
  <HeaderComponent />

  <!--호텔 검색 바-->
  <div class="hotel-search-bar">
    <SearchbarComponent />
  </div>

  <!--호텔 검색 화면 메인 부분-->
  <div class="hotel-search-main">

    <!--호텔 필터링-->
    <div class="hotel-filters">
      <!--가격 필터-->
      <div class="filers">
        <h3>Filters</h3>
      </div>
      <div class="filter-items">
        <div class="filter">
          <div class="filter-header">
            <h4>Price</h4>
            <button id="dropdown-btn" @click="toggleFilter('price')">
              <i class='bxr' :class="{
              'bx-chevron-up': priceFilterOpen,
              'bx-chevron-down': !priceFilterOpen
            }"></i>
            </button>
          </div>
          <div v-if="priceFilterOpen">
            <input type="range" id="priceSlider" min="0" max="100" value="₩5">
            <div class="price-range">
              <span>₩0</span><span>{{}}</span><span>₩1,000,000</span>
            </div>
          </div>
        </div>

        <!--호텔 평점 필터-->
        <div class="filter">
          <div class="filter-header">
            <h4>Rating</h4>
            <button id="dropdown-btn" @click="toggleFilter('rating')">
              <i class='bxr' :class="{
              'bx-chevron-up': ratingFilterOpen,
              'bx-chevron-down': !ratingFilterOpen
            }"></i>
            </button>
          </div>
          <div v-if="ratingFilterOpen">
            <div class="rating-range">
              <button id="rating-btn">0+</button>
              <button id="rating-btn">1+</button>
              <button id="rating-btn">2+</button>
              <button id="rating-btn">3+</button>
              <button id="rating-btn">4+</button>
            </div>
          </div>
        </div>
        <!--호텔 무료 서비스 필터-->
        <div class="filter">
          <div class="filter-header">
            <h4>Freebies</h4>
            <button id="dropdown-btn" @click="toggleFilter('freebies')">
              <i class='bxr' :class="{
              'bx-chevron-up': freebiesFilterOpen,
              'bx-chevron-down': !freebiesFilterOpen
            }"></i>
            </button>
          </div>
          <div v-if="freebiesFilterOpen" class="freebies-checkboxes">
            <div>
              <input type="checkbox"><label for="조식포함">조식포함</label>
            </div>
            <div>
              <input type="checkbox"><label for="무료주차">무료주차</label>
            </div>
            <div>
              <input type="checkbox"><label for="WIFI">WIFI</label>
            </div>
            <div>
              <input type="checkbox"><label for="공항셔틀">공항셔틀</label>
            </div>
            <div>
              <input type="checkbox"><label for="무료취소">무료취소</label>
            </div>
          </div>
        </div>
        <!--호텔 편의시설 필터-->
        <div class="filter">
          <div class="filter-header">
            <h4>Amenities</h4>
            <button id="dropdown-btn" @click="toggleFilter('amenities')">
              <i class='bxr' :class="{
              'bx-chevron-up': amenitiesFilterOpen,
              'bx-chevron-down': !amenitiesFilterOpen
            }"></i>
            </button>
          </div>
          <div v-if="amenitiesFilterOpen" class="amenities-checkboxes">
            <div>
              <input type="checkbox"><label for="24시 프론트데스크">24시 프론트데스크</label>
            </div>
            <div>
              <input type="checkbox"><label for="에어컨">에어컨</label>
            </div>
            <div>
              <input type="checkbox"><label for="피트니스">피트니스</label>
            </div>
            <div>
              <input type="checkbox"><label for="수영장">수영장</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--필터링 된 호텔-->
    <div class="filtered-hotel">
      <header class="accommodation">
        <div class="accommodation-selection">
          <button id="hotel-count">
            <h3>Hotels</h3>
            <span>257 places</span>
          </button>
          <button id="motel-count">
            <h3>Motels</h3>
            <span>51 places</span>
          </button>
          <button id="resort-count">
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
        <HotelLists v-for="hotel in hotellists" :key="hotel.id" :hotelInfo="hotel" />
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style >
.filter-items {
  margin: 10px 20px 0 0;
}
.filter {
  border-bottom : #D9D9D9 solid 1px;
  margin: 10px auto;
  padding-bottom: 10px;
}
.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#dropdown-btn {
  background-color: transparent;
  border: none;
  font-size: 40px;
}
input[type=range] {
  -webkit-appearance: none;
  background-color: grey;
  width: 385px;
  height: 2px;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #8ae6b2;
  cursor: pointer;
}
.price-range {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}
.rating-range {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px auto;
}
#rating-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: white;
  width: 40px;
  height: 30px;
}
.freebies-checkboxes {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  gap: 10px;
}
.freebies-checkboxes>div {
  display: flex;
  align-items: center;
}
.amenities-checkboxes {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  gap: 10px;
}
.amenities-checkboxes>div {
  display: flex;
  align-items: center;
}
input[type=checkbox] {
  width: 20px;
  height: 20px;
  border: 3px solid #8ae6b2;
  margin-right: 10px;
}
.hotel-filters {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 410px;
  border-right: #D9D9D9 solid 1px;
}

.hotel-lists {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 40px auto;
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
  margin: 30px auto;
}
.accommodation-sort-text {
  font-weight: bold;
}
#accommodation-count {
  font-weight: bold;
  color: #FF8682;
}
.accommodation {
  width: 750px;
}
.accommodation-selection {
  border-radius: 15px;
  box-shadow: 0px 3px 10px #d3d3d3;
}
#hotel-count {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border: white solid 1px;
  background-color: white;
  padding: 25px;
  width: 250px;
  text-align: left;
}
#hotel-count:hover {
  box-shadow: 0px 5px #8ae6b2;
}
#motel-count {
  border: white solid 1px;
  border-left: #d3d3d3 solid 2px;
  padding: 25px;
  background-color: white;
  width: 250px;
  text-align: left;
}
#motel-count:hover {
  box-shadow: 0px 5px #8ae6b2;
}
#resort-count {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: white solid 1px;
  border-left: #d3d3d3 solid 2px;
  padding: 25px;
  background-color: white;
  width: 250px;
  text-align: left;
}
#resort-count:hover {
  box-shadow: 0px 5px #8ae6b2;
}
.hotel-search-main {
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 1240px;
}

.hotel-search-bar {
  display: flex;
  text-align: left;
  justify-content: space-around;
  background-color: white;
  flex-direction: column;
  width: 1290px;
  height: 100px;
  z-index: 2;
  margin: 100px auto 40px;
  padding: 10px;
  border: white solid 1px;
  box-shadow: 0px 3px 10px #d3d3d3;
  border-radius: 20px;
}
</style>