<script>

import {defineComponent} from "vue";
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import FavoriteHotelLists from '@/common/components/FavoriteHotelLists.vue';
import aTeamApi from "@/util/axios";

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
    async toggleFavorite(hotelId) {
      try {
        // 서버에 찜 토글 요청
        await aTeamApi.post(`/api/favorites/${hotelId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        // 현재 찜 목록에서 hotelId가 있는지 찾기
        const idx = this.favoriteHotels.findIndex(f => f.id === hotelId);

        if (idx !== -1) {
          // 찜 해제 → 배열에서 제거
          this.favoriteHotels.splice(idx, 1);

          alert("즐겨찾기를 해제.");
        } else {
          // 찜 추가 → 배열에 추가
          this.favoriteHotels.push({
            id: hotelId,
            favoriteId: true
          });

          alert("즐겨찾기를 추가.");
        }

      } catch (err) {
        console.error("즐겨찾기 토글 오류:", err);
      }

    }

  },
  async mounted() {
    try {
      const res = await aTeamApi.get("/api/favorites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      this.favoriteHotels = res.data.content;

    } catch (err) {
      console.error(err);
    }
  },
  watch: {
    toggleFavorite() {

    }
  }

})
</script>

<template>
  <!--HeaderComponent 부분-->
  <HeaderComponent/>

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
        @toggle-favorite="toggleFavorite"
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