<script>
import HeaderComponent from '@/common/components/HeaderComponent.vue';
import FooterComponent from '@/common/components/FooterComponent.vue';
import CityLists from '@/common/components/CityLists.vue';
import { aTeamApi } from '@/util/axios';

export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    CityLists: CityLists,
  },
  name: 'HomePage',
  data() {
    return {
      cities: [],
      tours: [],
      token: localStorage.getItem('token'),

    };
  },
  async mounted() {
    const result = await aTeamApi.get('/api/travel-packages/popular');
    const resultData = result.data.content;
    console.log('data >>> ', resultData);
    this.cities = resultData || [];

    const mainRes = await aTeamApi.get('/api/travel-packages/main');
    const mainData = mainRes.data.content || mainRes.data;
    console.log('main data >>> ', mainData);
    this.tours = mainData || [];

    window.addEventListener("token-changed", this.updateToken);
  },
  beforeUnmount() {
    window.removeEventListener("token-changed", this.updateToken);
  },
  methods: {
    getFullImageUrl(url) {
      if (!url) return '';
      // 이미 절대 URL이면 그대로 반환
      if (url.startsWith('http://') || url.startsWith('https://')) return url;
      // Vue CLI 환경에서 process.env.VUE_APP_API_URL 사용
      const base = process.env.VUE_APP_API_URL || '';
      return `${base}${url}`;
    },
  }
};
</script>

<template>
  <!--HeaderComponent 부분-->
  <HeaderComponent/>
  <!--메인 사진-->
  <div class="main-photo">
    <img src="../assets/homepage-mainhotel-1.png" alt="메인호텔사진" />
  </div>

  <!--메인화면 부분-->
  <!--메인화면 상단 검색 바-->
  <div class="search-bar" @click="$router.push('/hotelsearchpage')">
    <div class="search-box-text">
      <span> Where are you staying? </span>
    </div>
    <div class="search-box">
      <!-- 여행지 입력 -->
      <form class="home-enter-destination">
        <fieldset>
          <legend>&nbsp;Enter Destination&nbsp;</legend>
          <div class="home-option-select">
            <i class="bx bx-bed" style="font-size: 24px"></i>
            <span class="home-search-input">여행지나 숙소를 검색해보세요</span>
          </div>
        </fieldset>
      </form>

      <!-- 체크인 -->
      <form class="home-checkinout">
        <fieldset>
          <legend>&nbsp;Check In&nbsp;</legend>
          <div class="home-option-select">
            <i class="bx bx-calendar" style="font-size: 24px"></i>
            <span class="home-search-input">날짜를 선택하세요</span>
          </div>
        </fieldset>
      </form>

      <!-- 체크아웃 -->
      <form class="home-checkinout">
        <fieldset>
          <legend>&nbsp;Check Out&nbsp;</legend>
          <div class="home-option-select">
            <i class="bx bx-calendar" style="font-size: 24px"></i>
            <span class="home-search-input">날짜를 선택하세요</span>
          </div>
        </fieldset>
      </form>

      <!-- 객실 / 인원 -->
      <div class="home-roomguests">
        <fieldset>
          <legend>&nbsp;Room & Guests&nbsp;</legend>
          <div class="home-option-select">
            <i class="bx bx-user" style="font-size: 22px"></i>
            <span class="home-search-input">방 개수, 인원 수를 선택하세요</span>
          </div>
        </fieldset>
      </div>
    </div>
  </div>

  <!--도시 선택 부분-->
  <div class="city-selection-bar">
    <div class="city-selection-text">
      <h2>여행에 빠지다</h2>
      <br/>
      <h4>특가상품으로 진행하는 여행을 예약해보세요</h4>
    </div>
    <div class="city-see-all">
      <button class="city-see-all-btn">See All</button>
    </div>
  </div>

  <div class="city-selection-imgs">
    <CityLists v-for="city in cities" :key="city.id" :cityInfo="city" />
  </div>

  <!--투어 선택 부분-->
  <div class="tour-selection-bar">
    <div class="tour-selection-text">
      <h2>여행 더보기</h2>
      <br/>
      <h4>
        Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam,
        we’ve got the travel tools to get you to your destination.
      </h4>
    </div>
    <div class="tour-see-all">
      <button class="tour-see-all-btn">See All</button>
    </div>
  </div>
  <!--투어 대표 이미지 및 설명-->
  <div class="tour">
    <div class="tour-description">
      <div class="tour-top-items">
        <h1>
          {{ tours.title }}
        </h1>
        <div class="tour-price">
          From
          <br />
          <h2>₩{{ tours.price }}</h2>
        </div>
      </div>
      <h5>
        {{ tours.description }}
      </h5>
      <div class="flight-book-btn">
        <button id="bookflight">Book Flight</button>
      </div>
    </div>
    <div class="tour-gallery">
      <div v-for="index in 4" :key="index" class="tour-imgs">
        <div v-if="tours.imageUrls && tours.imageUrls[index-1]" class="tour-image-container">
          <img
            :src="getFullImageUrl(tours.imageUrls[index-1])"
            :alt="tours.name + ' image ' + (index + 1)"
            class="tour-image-size"
          />
        </div>
        <div v-else>
          <div class="no-tour-image-slot">
            <span>이미지가 없습니다</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.search-bar:hover {
  border: #8ae6b2 solid 1px;
  box-shadow: 0px 0px 20px #8ae6b2;
}

.main-photo {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.search-bar {
  display: flex;
  text-align: left;
  justify-content: space-around;
  background-color: white;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0px 3px 10px #d3d3d3;
  position: relative;
  top: -75px;
  left: 50%;
  transform: translateX(-50%);
  width: 1290px;
  height: 150px;
  z-index: 2;
}

.search-box-text {
  margin-top: 20px;
  margin-left: 30px;
  font-size: 20px;
}

.home-enter-destination fieldset {
  align-items: center;
  border-radius: 5px;
  margin: auto 10px;
  width: 400px;
  height: 60px;
}

.home-option-select {
  display: flex;
  align-items: center;
  margin: -5px 10px;
}

.home-search-input {
  margin: 10px;
  color: #9e9a9a;
}

.home-checkinout fieldset {
  display: flex;
  align-items: center;
  margin: auto 10px;
  border-radius: 5px;
  width: 200px;
  height: 60px;
}

.home-roomguests fieldset {
  border-radius: 5px;
  width: 300px;
  height: 60px;
}

.city-selection-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 70px auto 40px;
  width: 1350px;
  padding: 0 50px 0 50px;
}

.city-selection-text {
  flex-direction: column;
  text-align: left;
}

.city-see-all-btn {
  border: #8ae6b2 solid 2px;
  border-radius: 8px;
  background-color: white;
  width: 70px;
  height: 45px;
}

.city-see-all-btn:hover {
  background-color: #8ae6b2;
}

.city-selection-imgs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.tour-selection-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 120px auto 40px;
  width: 1350px;
  padding: 0 50px 0 50px;
}

.tour-selection-text {
  text-align: left;
  max-width: 1100px;
}

.tour-see-all-btn {
  border: #8ae6b2 solid 2px;
  border-radius: 8px;
  background-color: white;
  width: 70px;
  height: 45px;
}

.tour-see-all-btn:hover {
  background-color: #8ae6b2;
}

.tour {
  display: flex;
  width: 1350px;
  margin: auto;
}

.tour-description {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 0 0 50px;
  border: #8ae6b2 solid 1px;
  background-color: #8ae6b2;
  border-radius: 20px;
  padding: 20px;
  max-width: 530px;
  text-align: left;
}
.tour-top-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tour-price {
  border-radius: 5px;
  border: #8ae6b2 solid 1px;
  background-color: white;
  text-align: center;
  padding: 5px;
}

.flight-book-btn {
  margin-top: 140px;
}
#bookflight:hover {
  background-color: #d3d3d3;
}

#bookflight {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 2px;
  border: none;
  width: 490px;
  height: 50px;
}
.tour-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-left: 30px;
  max-width: 650px;
}
.tour-image-container {
  border-radius: 15px;
  width: 330px;
  height: 200px;
  overflow: hidden;
}
.tour-image-size {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: #8ae6b2 solid 2px;
}
.no-tour-image-slot {
  background-color: #d9d9d9;
  color: #555;
  font-size: 16px;
  font-weight: bold;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 200px;
}
.no-tour-image-slot.main {
  width: 330px;
  height: 200px;
}
</style>