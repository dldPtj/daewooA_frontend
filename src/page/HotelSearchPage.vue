<script>
import HeaderComponent from '@/common/components/HeaderComponent.vue';
import FooterComponent from '@/common/components/FooterComponent.vue';
import { aTeamApi } from '@/util/axios';
import HotelLists from '@/common/components/HotelLists.vue';
import SearchbarComponent from '@/common/components/SearchbarComponent.vue';

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
      totalHotels: 0,
      totalPages: 0,
      currentPage: 0,
      FilterOpen: true,
      priceFilterOpen: true,
      ratingFilterOpen: false,
      freebiesFilterOpen: false,
      amenitiesFilterOpen: false,
      selectedType: 'hotel',
      sliderValue: 500000,
      maxPrice: 1000000,
      stepValue: 50000,

      // 🌟 서버 필터링을 위해 필요한 다른 상태값 (예시)
      // 실제 사용하지 않아도 API에 전달하기 위해 초기화
      currentSortBy: 'rating',
      filterParams: {
        breakfastIncluded: false,
        freeParking: false,
        freeWifi: false,
        airportShuttlebus: false,
        freeCancellation: false,
        frontDesk24: false,
        airConditioner: false,
        fitnessCenter: false,
        pool: false,
        checkInDate: '2025-10-01', // 초기값 설정 필요
        checkOutDate: '2025-10-05', // 초기값 설정 필요
      }
    };
  },

  watch: {
    sliderValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        // 슬라이더 값이 변경되면 필터링된 새 목록을 첫 페이지(0)부터 로드
        this.fetchHotels(0);
      }
    }
  },

  async mounted() {
    await this.fetchMaxPrice();
    this.fetchHotels(0);
  },

  methods: {
    async fetchMaxPrice() {
      if (this.selectedType !== 'hotel') return;

      let maxPriceFound = 0;
      let page = 0;
      let totalPages = 1;

      try {
        // 최대 가격을 찾을 때는 가격 외 다른 필터는 사용하지 않고 전체 데이터를 기준으로 찾습니다.
        let result = await aTeamApi.get(`/api/hotels/filter?page=${page}&size=4`);
        let data = result.data;
        totalPages = data.totalPages || 1;

        const initialPrices = (data.hotels || []).map(hotel => hotel.price);
        if (initialPrices.length > 0) {
          maxPriceFound = Math.max(...initialPrices);
        }

        for (page = 1; page < totalPages; page++) {
          result = await aTeamApi.get(`/api/hotels/filter?page=${page}&size=4`);
          const nextPageData = result.data;
          const nextPrices = (nextPageData.hotels || []).map(hotel => hotel.price);

          if (nextPrices.length > 0) {
            const currentMax = Math.max(...nextPrices);
            maxPriceFound = Math.max(maxPriceFound, currentMax);
          }
        }

        this.maxPrice = maxPriceFound;
        this.sliderValue = maxPriceFound;

      } catch (error) {
        console.error('최대 가격을 불러오는 중 오류 발생:', error);
      }
    },

    // 🌟🌟🌟 수정된 fetchHotels: sliderValue를 maxPrice 필터로 전달 🌟🌟🌟
    async fetchHotels(page) {
      if (this.selectedType !== 'hotel') {
        this.hotellists = [];
        this.totalHotels = 0;
        this.totalPages = 0;
        this.currentPage = 0;
        return;
      }

      try {
        // 1. 기본 쿼리 파라미터
        let query = `/api/hotels/filter?page=${page}&size=4&sortBy=${this.currentSortBy}`;

        // 2. 가격 필터 (슬라이더 값) 추가
        query += `&maxPrice=${this.sliderValue}`; // 👈 이 부분이 핵심

        // 3. 기타 필터 파라미터 추가 (API 구조에 맞춤)
        // filterParams 객체를 순회하며 쿼리를 동적으로 생성
        for (const key in this.filterParams) {
          query += `&${key}=${this.filterParams[key]}`;
        }

        const result = await aTeamApi.get(query);
        const data = result.data;

        this.hotellists = data.hotels || [];
        // 필터링된 결과에 따라 totalHotels, totalPages가 서버에서 변경되어 옴
        this.totalHotels = data.totalHotels || 0;
        this.totalPages = data.totalPages || 0;
        this.currentPage = data.currentPage || page;

      } catch (error) {
        console.error('호텔 데이터를 불러오는 중 오류 발생:', error);
      }
    },

    changePage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.fetchHotels(page);
      }
    },
    selectAccommodation(type) {
      this.selectedType = type;
      if (type === 'hotel') {
        this.fetchMaxPrice().then(() => {
          this.fetchHotels(0);
        });
      } else {
        this.hotellists = [];
        this.totalHotels = 0;
        this.totalPages = 0;
        this.currentPage = 0;
      }
    },
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
    formattedPrice(value) {
      if (value === undefined || value === null) return '₩0';
      return '₩' + value.toLocaleString('ko-KR');
    },
  },
};
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
              <i
                class="bxr"
                :class="{
                  'bx-chevron-up': priceFilterOpen,
                  'bx-chevron-down': !priceFilterOpen,
                }"
              ></i>
            </button>
          </div>
          <div v-if="priceFilterOpen">
            <span class="sliderValue">{{ formattedPrice(sliderValue) }}</span>
            <input
              type="range"
              id="priceSlider"
              min="0"
              :max="maxPrice"
              :step="stepValue"
              v-model.number="sliderValue"
            />
            <div class="price-range">
              <span>₩0</span>
              <span>{{ formattedPrice(maxPrice) }}</span>
            </div>
          </div>
        </div>

        <!--호텔 평점 필터-->
        <div class="filter">
          <div class="filter-header">
            <h4>Rating</h4>
            <button id="dropdown-btn" @click="toggleFilter('rating')">
              <i
                class="bxr"
                :class="{
                  'bx-chevron-up': ratingFilterOpen,
                  'bx-chevron-down': !ratingFilterOpen,
                }"
              ></i>
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
              <i
                class="bxr"
                :class="{
                  'bx-chevron-up': freebiesFilterOpen,
                  'bx-chevron-down': !freebiesFilterOpen,
                }"
              ></i>
            </button>
          </div>
          <div v-if="freebiesFilterOpen" class="freebies-checkboxes">
            <div><input type="checkbox" /><label for="조식포함">조식포함</label></div>
            <div><input type="checkbox" /><label for="무료주차">무료주차</label></div>
            <div><input type="checkbox" /><label for="WIFI">WIFI</label></div>
            <div><input type="checkbox" /><label for="공항셔틀">공항셔틀</label></div>
            <div><input type="checkbox" /><label for="무료취소">무료취소</label></div>
          </div>
        </div>
        <!--호텔 편의시설 필터-->
        <div class="filter">
          <div class="filter-header">
            <h4>Amenities</h4>
            <button id="dropdown-btn" @click="toggleFilter('amenities')">
              <i
                class="bxr"
                :class="{
                  'bx-chevron-up': amenitiesFilterOpen,
                  'bx-chevron-down': !amenitiesFilterOpen,
                }"
              ></i>
            </button>
          </div>
          <div v-if="amenitiesFilterOpen" class="amenities-checkboxes">
            <div>
              <input type="checkbox" /><label for="24시 프론트데스크">24시 프론트데스크</label>
            </div>
            <div><input type="checkbox" /><label for="에어컨">에어컨</label></div>
            <div><input type="checkbox" /><label for="피트니스">피트니스</label></div>
            <div><input type="checkbox" /><label for="수영장">수영장</label></div>
          </div>
        </div>
      </div>
    </div>

    <!--필터링 된 호텔-->
    <div class="filtered-hotel">
      <header class="accommodation">
        <div class="accommodation-selection">
          <button
            id="hotel-count"
            @click="selectAccommodation('hotel')"
            :class="{ 'selected': selectedType === 'hotel' }"
          >
            <h3>Hotels</h3>
            <span>{{ totalHotels }} places</span>
          </button>

          <button
            id="motel-count"
            @click="selectAccommodation('motel')"
            :class="{ 'selected': selectedType === 'motel' }"
          >
            <h3>Motels</h3>
            <span>0 places</span>
          </button>

          <button
            id="resort-count"
            @click="selectAccommodation('resort')"
            :class="{ 'selected': selectedType === 'resort' }"
          >
            <h3>Resorts</h3>
            <span>0 places</span>
          </button>
        </div>
      </header>
      <div class="accommodation-sort">
        <div class="accommodation-sort-text">
          Showing {{ hotellists.length }} of <span id="accommodation-count">{{ totalHotels }} places</span>
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
        <template v-if="hotellists.length > 0">
          <HotelLists v-for="hotel in hotellists" :key="hotel.id" :hotelInfo="hotel" />

          <div class="page-btns">
            <button id="page-btn" :disabled="currentPage === 0" @click="changePage(currentPage - 1)"><i class='bx  bx-chevron-left' style="margin-top: 7px"></i></button>
            <span id="page-info">{{ currentPage + 1 }} of {{ totalPages }}</span>
            <button id="page-btn" :disabled="currentPage === totalPages - 1" @click="changePage(currentPage + 1)"><i class='bx  bx-chevron-right' style="margin-top: 7px"></i></button>
          </div>
        </template>

        <div v-else class="no-results">
          <div class="no-accommodations">
            <h3>검색 결과가 없습니다.</h3>
            <p>선택하신 숙소 유형에 대한 숙소를 찾지 못했습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style>
.filter-items {
  margin: 10px 20px 0 0;
}
.filter {
  border-bottom: #d9d9d9 solid 1px;
  margin: 10px auto;
  padding-bottom: 10px;
}
.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sliderValue {
  display: flex;
  justify-content: center;
  margin: 10px auto;
  width: 150px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bold;
  color: #FF8682;
}
#dropdown-btn {
  background-color: transparent;
  border: none;
  font-size: 40px;
}
input[type='range'] {
  -webkit-appearance: none;
  background-color: grey;
  width: 385px;
  height: 2px;
}
input[type='range']::-webkit-slider-thumb {
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
#rating-btn:hover {
  background-color: #d3d3d3;
}
#rating-btn.selected {
  background-color: #8ae6b2;
}
.freebies-checkboxes {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  gap: 10px;
}
.freebies-checkboxes > div {
  display: flex;
  align-items: center;
}
.amenities-checkboxes {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  gap: 10px;
}
.amenities-checkboxes > div {
  display: flex;
  align-items: center;
}
input[type='checkbox'] {
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
  border-right: #d9d9d9 solid 1px;
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
  color: #ff8682;
}
.accommodation {
  width: 800px;
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
  width: 266px;
  text-align: left;
}
#hotel-count:hover {
  background-color: #e1e1e1;
}
#hotel-count.selected {
  box-shadow: 0px 5px #8ae6b2;
}
#motel-count {
  border: white solid 1px;
  border-left: #d3d3d3 solid 2px;
  padding: 25px;
  background-color: white;
  width: 266px;
  text-align: left;
}
#motel-count:hover {
  background-color: #e1e1e1;
}
#motel-count.selected {
  box-shadow: 0px 5px #8ae6b2;
}
#resort-count {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: white solid 1px;
  border-left: #d3d3d3 solid 2px;
  padding: 25px;
  background-color: white;
  width: 266px;
  text-align: left;
}
#resort-count:hover {
  background-color: #e1e1e1;
}
#resort-count.selected {
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
.page-btns {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
#page-info {
  font-size: 25px;
}
#page-btn {
  background-color: transparent;
  width: 100px;
  border-radius: 20px;
  border: none;
  font-size: 40px;
}
#page-btn:hover {
  background-color: #d3d3d3;
}
.no-accommodations {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0px 3px 10px #d3d3d3;
  padding: 110px;
}
</style>