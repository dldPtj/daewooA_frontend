<script >
export default {
  data() {
    return{

    }
  },

  props: {
    totalElements: {
      type: Object,
      required: true
    },
    currentLink:{
      type: Object,
      required: true
    }
  },



}
</script>

<template>
  <!--flight, hotel 선택 바-->
  <header class="favorites-selection-bar">
    <div class="favorites-selection">
      <button id="favorite-flights-count" @click="$emit('gotoFlight')" :class="{activeFavorite: currentLink==='flight'}" >
        <h3>Flights</h3>
        <span>0 marked</span>
      </button>
      <button id="favorite-places-count" @click="$emit('gotoPlaces')" :class="{activeFavorite: currentLink==='places'}">
        <h3>Places</h3>
        <span v-if="totalElements !== null">{{totalElements}} marked</span>
        <span v-else>0 marked</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
#favorite-flights-count {
  border: white solid 1px;
  box-shadow: 0px 3px 10px #d3d3d3;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 25px;
  background-color: white;
  width: 620px;
  text-align: left;
}
#favorite-flights-count:hover{
  background-color: #d3d3d3;
}

#favorite-flights-count.activeFavorite {
  box-shadow: 0px 6px #8ae6b2;
}

#favorite-places-count {
  border: white solid 1px;
  box-shadow: 0px 3px 10px #d3d3d3;
  border-left: #d3d3d3 solid 2px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 25px;
  background-color: white;
  width: 620px;
  text-align: left;
}

#favorite-places-count:hover{
  background-color: #d3d3d3;
}

#favorite-places-count.activeFavorite {
  box-shadow: 0px 6px #8ae6b2;
}



</style>