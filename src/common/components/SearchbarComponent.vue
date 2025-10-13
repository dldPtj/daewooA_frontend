<script>

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import aTeamApi from "@/util/axios";

export default {
  name: 'SearchbarComponent',
  components : {
    Datepicker,
  },
  data() {
    return {
      dataList: [],
      checkInDate: null,
      checkOutDate: null,
      showCheckInPicker: false,
      showCheckOutPicker: false,
      showPanel: false,
      room: 1, // 최소 방 개수 1
      guests: 1,
      isInitialText: true,
      searchTerm: '',
      isFocused: false,
    };
  },
  async mounted() {
    const result = await aTeamApi.get('/api/travel-packages/popular');
    const resultData = result.data.content;
    console.log('data >>> ', resultData);
    this.cities = resultData || [];

    this.dataList = this.cities.map(city => ({
      name: city.name, // 목록에 표시할 이름
      value: city.name.toLowerCase() // 검색을 위해 소문자 값 사용
    }));

    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    setSearchTerm(e) {
      this.searchTerm = e.target.value;
    },
    hideList() {
      // 목록 항목 클릭 이벤트가 처리될 시간을 주기 위해 짧은 지연(setTimeout)을 사용합니다.
      setTimeout(() => {
        this.isFocused = false;
      }, 150);
    },
    selectItem(name) {
      this.searchTerm = name; // 검색어(입력 필드 값)를 선택된 이름으로 설정
      this.isFocused = false; // 목록 숨기기
    },
    clearSearch() {
      this.searchTerm = '';
      // 입력 필드에 포커스를 유지하여 목록이 계속 표시되도록 합니다.
      this.isFocused = true;
    },

    handleCheckInSelected(date) {
      this.checkInDate = date;
      this.showCheckInPicker = false;
    },
    handleCheckOutSelected(date) {
      this.checkOutDate = date;
      this.showCheckOutPicker = false;
    },

    togglePanel() {
      this.showPanel = !this.showPanel;
    },
    closePanel() {
      this.showPanel = false;
      this.isInitialText = false;
    },
    increment(type) {
      if (type === 'room' && this.room < 10) {
        this.room++;
      } else if (type === 'guests' && this.guests < 20) {
        this.guests++;
      }
    },
    decrement(type) {
      if (type === 'room' && this.room > 1) {
        this.room--;
      } else if (type === 'guests' && this.guests > 1) {
        this.guests--;
      }
    },
    // 패널 외부 클릭 시 패널 닫기 처리
    handleClickOutside(event) {
      const roomGuestsElement = this.$refs.roomGuestsRef;

      // roomGuestsElement가 존재하고, 패널이 열려 있으며, 클릭 이벤트의 타겟이 roomGuests 영역 밖에 있을 때
      if (this.showPanel && roomGuestsElement && !roomGuestsElement.contains(event.target)) {
        this.showPanel = false;
        // 외부 클릭으로 닫힐 때도 요약 텍스트로 전환되도록 합니다.
        this.isInitialText = false;
      }
    }
  },
  computed: {
    filteredList() {
      if(this.searchTerm === '') {
        return this.dataList;
      }
      // 검색어와 값(value)을 소문자로 변환하여 일치 여부를 검사합니다.
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

      return this.dataList.filter(cityName => {
        // cityName가 검색어를 포함하는 경우 true를 반환하여 목록에 포함시킵니다.
        // name 속성 대신 value 속성(소문자)으로 검색하도록 수정되었습니다.
        return cityName.value.includes(lowerCaseSearchTerm);
      })
    },
    summaryText() {
      //summaryText 복수형 처리
      const roomText = `${this.room} Room${this.room > 1 ? 's' : ''}`;
      const guestText = `${this.guests} Guest${this.guests > 1 ? 's' : ''}`;

      return `${roomText}, ${guestText}`;
    }
  }
};
</script>

<template>
  <div class="search-box">
    <!-- 여행지 입력 -->
    <form class="enter-destination">
      <fieldset>
        <legend>&nbsp;Enter Destination&nbsp;</legend>
        <div class="city-hotel-select">
          <i class="bx bx-bed"></i>
          <input
              class="city-hotel-select-input"
              type="text"
              :value="searchTerm"
              @input="setSearchTerm"
              @focus="isFocused = true"
              @blur="hideList"
              placeholder="검색어를 입력하세요"
          />
          <!-- ✅ searchTerm이 있을 때만 X 버튼 표시 -->
          <i v-if="searchTerm" @click="clearSearch" class='bx bx-x' style='font-size: 24px; color:#000000; cursor: pointer; margin-right: 5px;'></i>
        </div>
        <!-- isFocused가 true일 때만 목록을 보여줍니다. -->
        <ul v-if="isFocused && cities.length > 0" class="search-list">
          <li
              v-for="city in cities"
              :key="city.id"
              class="list-item"
              @mousedown.prevent="selectItem(city.cityName)"
          >
            {{ city.cityName }}
          </li>
        </ul>
        <!-- 검색 결과가 없을 때 메시지 -->
        <div v-else-if="isFocused && filteredList.length === 0" class="search-list">
          검색 결과가 없습니다.
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
    <div class="roomguests" ref="roomGuestsRef">
      <fieldset>
        <legend>&nbsp;Room & Guests&nbsp;</legend>
        <!-- 설정 패널을 토글하는 버튼 -->
        <button @click="togglePanel" class="roomguests-btn" aria-expanded="showPanel">
          <i class='bx bx-user' style="font-size: 22px"></i>
          &nbsp;{{ isInitialText ? '방 개수, 인원 수를 선택하세요' : summaryText }}
        </button>
      </fieldset>

      <!-- 방/인원수 설정 패널 -->
      <div v-if="showPanel" class="selector-panel" @mousedown.stop>
        <!-- Room (방 개수) 설정 -->
        <div class="setting-row">
          <span>Room (방)</span>
          <div class="controls">
            <button @click="decrement('room')" :disabled="room <= 1" class="control-btn minus-btn">-</button>
            <span class="count">{{ room }}</span>
            <button @click="increment('room')" class="control-btn plus-btn">+</button>
          </div>
        </div>

        <!-- Guests (인원) 설정 -->
        <div class="setting-row">
          <span>Guests (인원)</span>
          <div class="controls">
            <button @click="decrement('guests')" :disabled="guests <= 1" class="control-btn minus-btn">-</button>
            <span class="count">{{ guests }}</span>
            <button @click="increment('guests')" class="control-btn plus-btn">+</button>
          </div>
        </div>

        <button @click="closePanel" class="done-btn">Done</button>
      </div>
    </div>

    <!-- 검색 버튼 -->
    <div class="hotel-search-btn">
      <button @click="$router.push('/hotelsearchpage')" id="hotel-search-btn">
        <i class='bxr  bx-search' style="font-size: 24px"></i>
      </button>
    </div>
  </div>
</template>

<style>
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
.search-list {
  position: absolute;
  top: 130px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 3px 10px #d3d3d3;
  max-height: 200px;
}
.list-item {
  margin: 10px auto;
  padding: 10px;
  cursor: pointer; /* 클릭 가능한 항목임을 표시 */
  transition: background-color 0.2s;
}
.list-item:hover {
  background-color: #f5f5f5;
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
.roomguests {
  position: relative; /* 패널 위치 지정을 위해 relative 추가 */
}
.roomguests fieldset {
  border-radius: 5px;
  width: 300px;
  height: 60px;
}
.roomguests-btn {
  display: flex;
  align-items: center;
  border: none;
  padding: 5px;
  margin: auto 10px;
  color: #9e9a9a;
  font-size: 16px;
  background-color: transparent;
  width: 100%; /* 버튼이 fieldset 너비에 꽉 차도록 설정 */
  justify-content: flex-start; /* 텍스트 시작 위치 정렬 */
  cursor: pointer;
}

/* Selector Panel (드롭다운) 스타일 - 이전 RoomGuestSelector.vue에서 가져온 스타일을 재사용 */
.selector-panel {
  position: absolute;
  top: 70px; /* Fieldset 높이 + 약간의 간격 */
  left: 0;
  width: 350px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 100; /* 다른 요소 위에 표시되도록 높임 */
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
.setting-row:last-of-type {
  border-bottom: none;
  margin-bottom: 10px;
}
.setting-row span {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* 컨트롤 버튼 스타일 */
.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #8ae6b2;
  background-color: white;
  color: #8ae6b2;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background-color: #e5f7ed;
}

.control-btn:disabled {
  border-color: #ddd;
  color: #ccc;
  cursor: not-allowed;
}

.count {
  font-weight: bold;
  font-size: 16px;
  min-width: 20px;
  text-align: center;
}

/* Done 버튼 스타일 */
.done-btn {
  width: 100%;
  padding: 10px;
  background-color: #8ae6b2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}
.done-btn:hover {
  background-color: #6acd97;
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