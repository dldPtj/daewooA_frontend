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
      selectedSearchTerm: '',
    };
  },
  async mounted() {
    try {
      const result = await aTeamApi.get(`/api/hotels/filter?size=999`);
      const data = result.data;

      const allHotels = data.hotels || [];

      this.hotels = allHotels;
      console.log('allHotelsData >>> ', this.hotels);

      this.dataList = this.hotels
        .filter(hotel => hotel && hotel.name && hotel.address && hotel.city)
        .map(hotel => ({
          hotelName: hotel.name,
          hotelLocation: hotel.address,
          city: hotel.city
        }));

    } catch (error) {
      console.error('호텔 목록을 불러오는 중 오류 발생:', error);
      this.hotels = [];
      this.dataList = [];
    }

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
    selectItem(fullText) {
      // 표시되는 텍스트는 전체 (도시 / 호텔)
      this.searchTerm = fullText;

      // API 필터링을 위해 도시 이름만 추출 (예: '서울 / 호텔 신라'에서 '서울' 추출)
      const cityOnly = fullText.split(' / ')[0].trim();
      this.selectedSearchTerm = cityOnly;

      this.isFocused = false;
    },
    clearSearch() {
      this.searchTerm = '';
      // 입력 필드에 포커스를 유지하여 목록이 계속 표시되도록 합니다.
      this.isFocused = true;
    },

    handleCheckInSelected(date) {
      this.checkInDate = date;
      localStorage.setItem("checkin", date);
      this.showCheckInPicker = false;
    },
    handleCheckOutSelected(date) {
      this.checkOutDate = date;
      localStorage.setItem("checkout", date);
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
    },
    searchHotels() {
      // 룸/인원 패널이 열려있다면 닫고 텍스트 요약
      if (this.showPanel) {
        this.closePanel();
      }

      // 1. 필수 검색 조건 확인
      const isSearchTermMissing = !this.searchTerm.trim();
      const isCheckInMissing = !this.checkInDate;
      const isCheckOutMissing = !this.checkOutDate;

      // 2. '모두 비어 있는 경우' 확인 (새로고침 조건)
      if (isSearchTermMissing && isCheckInMissing && isCheckOutMissing) {
        // 아무것도 입력하지 않고 검색 버튼을 눌렀을 때 페이지 새로고침
        window.location.reload();
        return; // 새로고침 후 함수 종료
      }

      // 3. '하나라도 빠져 있는 경우' 확인 (alert 조건)
      if (isSearchTermMissing || isCheckInMissing || isCheckOutMissing) {
        alert("검색 조건을 모두 입력해주세요");
        return; // 알림 후 함수 종료
      }

      // 4. 모든 조건이 충족되면 검색 실행
      // 부모 컴포넌트로 검색 조건과 함께 이벤트를 발생시킵니다.
      this.$emit('perform-search', {
        city: this.selectedSearchTerm || this.searchTerm.split(' / ')[0].trim(), // 최종 검색어 또는 입력된 내용
        checkIn: this.checkInDate,
        checkOut: this.checkOutDate,
        room: this.room,
        guests: this.guests,
      });
    },
  },
  computed: {
    filteredList() {
      if (this.searchTerm === '') {
        // 검색어가 비어 있으면 전체 dataList 반환 (선택 사항: 전체 목록 반환하거나 빈 배열 반환)
        return this.dataList;
      }

      const searchTermLower = this.searchTerm.toLowerCase();

      return this.dataList.filter(item => {
        // 호텔 이름, 도시 이름, 주소 중 하나라도 검색어를 포함하면 true 반환
        return (
          item.hotelName.toLowerCase().includes(searchTermLower) ||
          item.city.toLowerCase().includes(searchTermLower) ||
          item.hotelLocation.toLowerCase().includes(searchTermLower)
        );
      });
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
              placeholder="여행지나 숙소를 검색해보세요"
          />
          <i v-if="searchTerm" @click="clearSearch" class='bx bx-x' style='font-size: 24px; color:#000000; cursor: pointer; margin-right: 5px;'></i>
        </div>
        <!-- isFocused가 true일 때만 목록을 보여줍니다. -->
        <ul v-if="isFocused && filteredList.length > 0" class="search-list">
          <li
            v-for="(item, index) in filteredList"
            :key="index"
            class="list-item"
            @mousedown.prevent="selectItem(`${item.city} / ${item.hotelName}`)"
          >
            <strong>{{ item.city }}</strong> / {{ item.hotelName }}
          </li>
        </ul>
        <div v-else-if="isFocused && filteredList.length === 0 && searchTerm.length > 0" class="search-list">
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
        <button @click="togglePanel" class="roomguests-btn" aria-expanded="showPanel" :class="{ 'summary-active': !isInitialText }">
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
      <button @click="searchHotels" id="hotel-search-btn">
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
.enter-destination fieldset:hover {
  border: #8ae6b2 solid 1px;
  box-shadow: 0px 0px 10px #8ae6b2;
}
.enter-destination fieldset {
  display: flex;
  justify-content: left;
  border-radius: 5px;
  margin: auto 10px;
  width: 400px;
  height: 60px;
}
.enter-destination fieldset legend {
  background-color: white;
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
  top: 250px;
  list-style: none;
  padding: 10px;
  margin: 0;
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 3px 10px #d3d3d3;
  max-height: 200px;
  overflow-y: auto;
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
.check-in fieldset:hover {
  border: #8ae6b2 solid 1px;
  box-shadow: 0px 0px 10px #8ae6b2;
}
.check-in fieldset legend {
  background-color: white;
}
.check-out fieldset {
  border-radius: 5px;
  width: 200px;
  height: 60px;
}
.check-out fieldset:hover {
  border: #8ae6b2 solid 1px;
  box-shadow: 0px 0px 10px #8ae6b2;
}
.check-out fieldset legend {
  background-color: white;
}
.datepicker .dp__input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
}
.roomguests {
  position: relative;
}
.roomguests fieldset {
  border-radius: 5px;
  width: 300px;
  height: 60px;
}
.roomguests fieldset:hover {
  border: #8ae6b2 solid 1px;
  box-shadow: 0px 0px 10px #8ae6b2;
}
.roomguests fieldset legend {
  background-color: white;
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
  width: 100%;
  justify-content: flex-start;
  cursor: pointer;
}
.roomguests-btn.summary-active {
  color: black;
}
.selector-panel {
  position: absolute;
  top: 70px;
  left: 0;
  width: 350px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 100;
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
#hotel-search-btn:hover {
  background-color: #6acd97;
}
</style>