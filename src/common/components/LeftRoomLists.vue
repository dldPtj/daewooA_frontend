<script>
import router from "@/router";

export default {
  name: 'LeftRoomLists',
  props: {
    roomInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  methods:{
    goToPaymentPage(){
      if (this.isUserLoggedIn) {
        localStorage.setItem("roomId", this.roomInfo.id);
        router.push("/paymentpage");
      }
      else {
        alert('로그인이 필요한 기능입니다.');
      }
    }
  },
  computed: {
    isUserLoggedIn() {
      return !!localStorage.getItem('token');
    }
  }
};
</script>

<template>
  <div class="leftroom">
    <!--객실 리스트 왼쪽 편(객실이미지, 객실타입 및 침대개수)-->
    <div class="leftroom-sec">
      <!--객실 이미지-->
      <div class="leftroom-img">
        <img :src="roomInfo.roomImages[0]?.roomImgUrl" alt="room image"/>
      </div>
      <!--객실 타입-->
      <div class="leftroom-type">
        <span id="room-number">{{ roomInfo.roomNumber }}</span> -
        <span id="roomtype">{{ roomInfo.name }}</span> -
        <span id="room-view">{{ roomInfo.view }}</span> -
        <span id="bed-counts">{{ roomInfo.bed }}</span>
      </div>
    </div>

    <!--객실 리스트 오른쪽 편(객실가격, 객실예약버튼)-->
    <div class="leftroom-sec">
      <div class="room-price">₩<span id="room-price">{{ roomInfo?.price?.toLocaleString() }}</span><small>/night</small></div>
      <div class="room-book">
        <button id="room-book-btn" @click="goToPaymentPage">Book now</button>
      </div>
    </div>
  </div>
</template>

<style>
#room-book-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: #8ae6b2;
  width: 120px;
  height: 40px;
}
#room-book-btn:hover {
  background-color: #6acd97;
}
.room-book {
  margin: 0 0 0 50px;
}
.room-price {
  font-size: 30px;
  margin: auto;
}
.leftroom-type {
  margin: auto 15px;
}
.leftroom {
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  padding: 10px;
  border-bottom: #d9d9d9 solid 1px;
}
.leftroom-sec {
  display: flex;
  align-items: center;
}
</style>