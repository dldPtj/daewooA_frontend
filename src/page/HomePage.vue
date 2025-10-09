<script>
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import CityLists from "@/common/components/CityLists.vue";
import { aTeamApi } from "@/util/axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    CityLists: CityLists,
    Datepicker,
  },
  name: 'HomePage',
  data() {
    return {
      cities: [],
      searchQuery: "",
      groupList: [],
      checkInDate: null,
      checkOutDate: null,
      showCheckInPicker: false,
      showCheckOutPicker: false,
    };
  },
  async mounted() {
    const result = await aTeamApi.get('/api/travel-packages/popular');
    const resultData = result.data.content;
    console.log('data >>> ', resultData);
    this.cities = resultData || [];
  },
  methods: {
    searchGroup(event) {
      const len = this.cities.length;
      for (let i = 0; i < len; i++) {
        if (
            this.cities[i].name.includes(event.target.value) === false
        ) {
          document.querySelectorAll(".group-item")[i].style.display = "none";
        } else {
          document.querySelectorAll(".group-item")[i].style.display = "flex";
        }
      }
    },

    handleCheckInSelected(date) {
      this.checkInDate = date;
      this.showCheckInPicker = false;
    },
    handleCheckOutSelected(date) {
      this.checkOutDate = date;
      this.showCheckOutPicker = false;
    },
  },
};
</script>

<template>
  <!--HeaderComponent 부분-->
  <HeaderComponent />

  <!--메인 사진-->
  <div class="main-photo">
    <img src="../assets/homepage-mainhotel-1.png" alt="메인호텔사진">
  </div>

<!--메인화면 부분-->
  <!--메인화면 상단 검색 바-->
  <div class="search-bar">
      <div class="search-box-text">
            <span>
                Where are you staying?
            </span>
      </div>
    <div class="search-box">
      <!-- 여행지 입력 -->
      <form class="enter-destination">
        <fieldset>
          <legend>&nbsp;Enter Destination&nbsp;</legend>
          <div class="city-hotel-select">
            <i class="bx bx-bed"></i>
            <input @input="searchGroup($event)" class="city-hotel-select-input" type="text" v-model="searchQuery" placeholder="여행지나 숙소를 검색해보세요"/>
            <ul class="group-list">
              <li v-for="city in cities" :key="city.id" class="group-item">
                <span><i class="bx bx-location"></i> {{ cities.name }}</span>
              </li>
            </ul>
          </div>
        </fieldset>
      </form>

      <!-- 체크인 -->
      <form class="check-in">
        <fieldset>
          <legend>&nbsp;Check In&nbsp;</legend>
          <Datepicker placeholder="날짜를 선택하세요" class="datepicker" v-model="checkInDate" :format="'yyyy-MM-dd'"
                      @update:model-value="handleCheckInSelected"
                      @click="showCheckInPicker"
          />
        </fieldset>
      </form>

      <!-- 체크아웃 -->
      <form class="check-out">
        <fieldset>
          <legend>&nbsp;Check Out&nbsp;</legend>
          <Datepicker placeholder="날짜를 선택하세요" class="datepicker" v-model="checkOutDate" :format="'yyyy-MM-dd'"
                      @update:model-value="handleCheckOutSelected"
                      @click="showCheckOutPicker"
          />
        </fieldset>
      </form>

      <!-- 객실 / 인원 -->
      <form class="roomguests">
        <fieldset>
          <legend>&nbsp;Room & Guests&nbsp;</legend>
          <button class="roomguests-btn">
            <i class='bxr  bx-user'></i> &nbsp;방 개수, 인원 수를 선택하세요
          </button>
        </fieldset>
      </form>

      <!-- 검색 버튼 -->
      <div class="hotel-search-btn">
        <button @click="$router.push('/hotelsearch')" id="hotel-search-btn">
          <i class='bxr  bx-search'></i>
        </button>
      </div>
    </div>
  </div>

  <!--도시 선택 부분-->
  <div class="city-selection-bar">
    <div class="city-selection-text">
      <h2>
        여행에 빠지다
      </h2>
      <br>
      <h4>
        특가상품으로 진행하는 여행을 예약해보세요
      </h4>
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
      <h2>
        여행 더보기
      </h2>
      <br>
      <h4>
        Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.
      </h4>
    </div>
    <div class="tour-see-all">
      <button class="tour-see-all-btn">See All</button>
    </div>
  </div>
  <!--투어 대표 이미지 및 설명-->
  <div class="tour">
    <div class="tour-description">
      <h1>
        말라카 투어
        <br>
        <br>
      </h1>
      <h5>
        오래된 시간의 숨결이 머무는 도시, 말라카(Melaka).<br>말레이시아의 작은 보석 같은 이 도시는 동서양 문화가 만나는 관문이자, 세계문화유산으로 지정된 매혹적인 여행지입니다. 단 하루만 머물러도 그 깊은 매력에 빠지고, 며칠을 살아보면 다시 찾고 싶은 마음이 샘솟는 곳. 이제 저희 여행사가 준비한 특별한 말라카 투어상품과 함께 그 여정을 시작해 보세요.
      </h5>
      <div class="tour-price">
        From
        <br>
        <h2>$700</h2>
      </div>
      <div class="flight-book-btn">
        <button id="bookflight">
          Book Flight
        </button>
      </div>
    </div>
    <div class="tour-imgs">
      <img src="../assets/melaka-tour1.png">
      <img src="../assets/melaka-tour2.png">
      <img src="../assets/melaka-tour3.png">
      <img src="../assets/melaka-tour4.png">
    </div>
  </div>

  <FooterComponent />
  <link href='https://cdn.boxicons.com/fonts/basic/boxicons.min.css' rel='stylesheet'>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  margin: auto 30px;
  font-size: 20px;
}
.search-box {
  display: flex;
  justify-content: space-evenly;
  margin: auto;
  gap: 20px;
}
.enter-destination fieldset {
  display: flex;
  justify-content: left;
  border-radius: 5px;
  margin: auto 10px;
  width: 400px;
  height: 60px;
}
.city-hotel-select {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 24px;
  margin: auto 10px;
  width: 100%;
}
.city-hotel-select-input {
  flex: 1;
  min-width: 0;
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
  background-color: transparent;
}

.check-in fieldset {
  border-radius: 5px;
  width: 200px;
  height: 60px;
}
.check-out fieldset {
  border-radius: 5px;
  width: 200px;
  height: 60px;
}
.datepicker .dp__input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
}
.roomguests fieldset {
  border-radius: 5px;
  width: 300px;
  height: 60px;
}
.roomguests-btn {
  border: none;
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
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
  border: #8ae6b2 solid 1px;
  border-radius: 8px;
  background-color: white;
  width: 70px;
  height: 45px;
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
  border: #8ae6b2 solid 1px;
  border-radius: 8px;
  background-color: white;
  width: 70px;
  height: 45px;
}

.tour {
  display: flex;
  width: 1350px;
  margin: auto;
}
.tour-description {
  margin: 0 0 0 50px;
  border: #8ae6b2 solid 1px;
  background-color: #8ae6b2;
  border-radius: 20px;
  padding: 20px;
  max-width: 530px;
  text-align: left;
}
.tour-price {
  position: relative;
  top: -180px;
  border-radius: 5px;
  border: #8ae6b2 solid 1px;
  background-color: white;
  text-align: center;
  margin-left: 420px;
  padding: 5px;
}
.flight-book-btn {
  position: relative;
  top: 35px;
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
</style>