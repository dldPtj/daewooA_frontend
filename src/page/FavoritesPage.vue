<script>

import {defineComponent} from "vue";
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import FavoriteHotelLists from '@/common/components/FavoriteHotelLists.vue';

export default defineComponent({
  components: { FavoriteHotelLists, FooterComponent, HeaderComponent}
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
      <button role="tab" id="favorite-flights-count">
        <h3>Flights</h3>
        <span>2 marked</span>
      </button>
      <button role="tab" id="favorite-places-count">
        <h3>Places</h3>
        <span>3 marked</span>
      </button>
    </div>
  </header>

  <div class="favorite-hotel-lists">
    <!--즐겨찾기한 호텔-->
    <FavoriteHotelLists />
  </div>
  <FooterComponent/>
</template>

<style>
.favorite-hotel-lists {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 40px auto;
  max-width: 1240px;
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
  padding: 25px;
  background-color: white;
  width: 600px;
  text-align: left;
  margin: auto 15px;
}
#favorite-flights-count:hover {
  border-bottom: #8ae6b2 solid 5px;
}
#favorite-places-count {
  border: white solid 1px;
  border-left: #d3d3d3 solid 2px;
  padding: 25px;
  background-color: white;
  width: 600px;
  text-align: left;
}
#favorite-places-count:hover {
  border-bottom: #8ae6b2 solid 5px;
}
.favoritespage-title {
  display: flex;
  margin: 100px auto 40px;
  max-width: 1240px;
}
</style>