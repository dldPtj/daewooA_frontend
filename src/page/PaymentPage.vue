<script>
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";

export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
  }
}
</script>

<template>
  <HeaderComponent/>
  <div class="country-city-hotelname">
    <span class="hd-country">Turkey</span>&nbsp;>&nbsp;<span class="hd-city">Istanbul</span>&nbsp;>&nbsp;<span class="hd-hotelname">해튼호텔</span>
  </div>
  <div id="paymentContainer">
    <div id="paymentMain">
      <div id="pTitle">
       <p id="pRoomName">Superior room - 1 더블베드 or 2 트윈 베드</p><p id="PPrice">₩240,000/night</p>
      </div>
      <div id="pHotelDetail">

      </div>
      <div id="pDateTime">

      </div>
    </div>
    <div id="paymentList">

    </div>
  </div>
  <FooterComponent/>
</template>

<style>
#PPrice{
  font-size: 20px;
  font-weight: bold;
  color: #FF8682;

}
#pRoomName{
  font-family: Noto Sans;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;

}
#pDateTime{
  display: flex;
  margin: 40px auto 0;
  width: 742px;
  height: 49px;
  border: #FF8682 solid 1px;
}
#pHotelDetail{
  display: flex;
  margin: 0 auto;
  width: 742px;
  height: 95px;
  border: #FF8682 solid 1px;
}
#pTitle{
  display: flex;
  justify-content: space-between;
  margin: 32px 0 24px 0;
  padding: 0 24px;
  width: 100%;
  height: 33px;
}
#paymentContainer{
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 22px;
}
#paymentMain{
  display: flex;
  flex-direction: column;
  width: 790px;
  height: 305px;
  border: #FF8682 solid 1px;
}
#paymentList{
  display: flex;
  width: 450px;
  height: 470px;
  border: #FF8682 solid 1px;
}
</style>