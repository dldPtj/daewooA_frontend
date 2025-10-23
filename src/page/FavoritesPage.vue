<script>

import {defineComponent} from "vue";
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import FavoriteHotelLists from '@/common/components/FavoriteHotelLists.vue';

export default defineComponent({
  components: {
    FavoriteHotelLists,
    FooterComponent,
    HeaderComponent
  },
  data() {
    return {
      favoriteHotels: [],
    }
  },
  methods: {
    // HotelLists에서 발생하는 이벤트를 처리하는 메서드
    handleToggleFavorite(hotelData) {
      const index = this.favoriteHotels.findIndex(h => h.id === hotelData.id);

      if (index === -1) {
        // 배열에 없으면 (찜하기) -> 추가
        this.favoriteHotels.push(hotelData);
        console.log(`호텔 ${hotelData.name}이(가) 찜 목록에 추가되었습니다.`);
      } else {
        // 배열에 있으면 (찜 해제) -> 삭제
        this.favoriteHotels.splice(index, 1);
        console.log(`호텔 ${hotelData.name}이(가) 찜 목록에서 제거되었습니다.`);
      }
    },
    // FavoriteHotelLists에서 찜 해제 이벤트를 처리하는 메서드
    handleRemoveFavorite(hotelId) {
      const index = this.favoriteHotels.findIndex(h => h.id === hotelId);
      if (index !== -1) {
        this.favoriteHotels.splice(index, 1);
        console.log(`ID ${hotelId} 호텔이 찜 목록에서 제거되었습니다.`);
      }
    }
  }
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
      <button id="favorite-flights-count">
        <h3>Flights</h3>
        <span>2 marked</span>
      </button>
      <button id="favorite-places-count">
        <h3>Places</h3>
        <span>3 marked</span>
      </button>
    </div>
  </header>

  <!--즐겨찾기한 호텔-->
  <div class="favorite-hotel-lists">
    <div v-if="favoriteHotels.length === 0">
      <p style="text-align: center; font-size: 1.2em;">찜한 호텔이 없습니다.</p>
    </div>

    <FavoriteHotelLists
      v-for="hotel in favoriteHotels"
      :key="hotel.id"
      :favorite-hotel-info="hotel"
      @toggle-favorite="handleToggleFavorite"
      @remove-favorite="handleRemoveFavorite"
    />
  </div>
  <FooterComponent/>
</template>

<style>
.favorite-hotel-lists {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 40px auto;
  width: 1240px;
  gap: 20px;
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
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 25px;
  background-color: white;
  width: 620px;
  text-align: left;
}
#favorite-flights-count:hover {
  box-shadow: 0px 6px #8ae6b2;
}
#favorite-places-count {
  border: white solid 1px;
  border-left: #d3d3d3 solid 2px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 25px;
  background-color: white;
  width: 620px;
  text-align: left;
}
#favorite-places-count:hover {
  box-shadow: 0px 6px #8ae6b2;
}
.favoritespage-title {
  display: flex;
  margin: 100px auto 40px;
  max-width: 1240px;
}
</style>