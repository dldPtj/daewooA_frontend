<script >
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import ProfileComponent from "@/common/components/ProfileComponent.vue";
import ReservationComponent from "@/common/components/ReservationComponent.vue";
import aTeamApi from "@/util/axios";
export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    ProfileComponent: ProfileComponent,
    ReservationComponent: ReservationComponent,

  },
  data() {
    return {
      // hotelName: {},
      // roomNumber: {},
      // checkinDate: {},
      // checkoutDate: {},
      // HotelCheckinTime: {},
      // HotelCheckoutTime: {},
      // HotelImageUrl: {},
      reservations:[],
    }
  },
  async mounted() {
    const res = await aTeamApi.get('/api/users/me/reservations');
    const data = res.data.content;
    console.log('data >>> ', data);
    this.reservations = data;
    // this.hotelName = data.content.hotelName;
    // this.roomNumber = data.content.roomNumber;
    // this.checkinDate = data.content.checkinDate;
    // this.checkoutDate = data.content.checkoutDate;
    // this.HotelCheckinTime = data.content.HotelCheckinTime;
    // this.HotelCheckoutTime = data.content.HotelCheckoutTime;
    // this.HotelImageUrl = data.content.HotelImageUrl;

  }
}
</script>

<template>
  <header-component/>
  <profile-component/>
  <!--  프로필 아래 메뉴 선택 버튼 -->
  <div class="ChangeAccountMenu">
    <button type="button" class="NOselectAcPage" @click="$router.push('/account')">계정</button>
    <a class="OtherLine"></a>
    <button type="button" class="selectAcPage" @click="$router.push('/reservation')">내역</button>
    <a class="OtherLine"></a>
    <button type="button" class="NOselectAcPage" @click="$router.push('/paymentadd')">결제수단</button>
  </div>

  <div id="ReservationMain">
    <div id="ReservationSpace-btw">
      <h1>예약 내역</h1>
      <div>
        <select id="ReservationDropDownStyle">
          <option value="Upcoming"><b>Upcoming</b></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>
    </div>
    <div id="ReservationSub">
      <img src="../assets/ion_bed.png" id ="bedImage" > <h3>객실</h3>
    </div>
    <ReservationComponent  v-for="(item, index) in reservations"
                           :key = "index"
                           :hotel-name="item.hotelName"
                           :room-number="item.roomNumber"
                           :checkin-date="item.checkinDate"
                           :checkout-date="item.checkoutDate"
                           :hotel-checkin-time="item.hotelCheckinTime"
                           :hotel-checkout-time="item.hotelCheckoutTime"
    />
  </div>


  <FooterComponent/>
</template>

<style>

#ReservationDropDownStyle{
  margin-top: 20px;
  display: flex;
  position: relative;
  border: white solid 1px;
  font-size: 15px;
  font-weight: bold;
  height: 20px;
  width: 100px;
}

#ReservationSpace-btw{
  display: flex;
  justify-content: space-between;
}
#ReservationMain{
  text-align: left;
  width: 1232px;
  margin: 40px auto 119px;
}
#ReservationSub{
  display: flex;
  position: relative;
  margin: auto 0;
  width: 1232px;
  height: 56px;
  box-shadow: 0px 2px 5px #d3d3d3;
}
#ReservationSub h3 {
  margin: auto 0;
}
#bedImage{
  margin: auto 0 auto 25px;
  width: 21px;
  height: 16px;
}
</style>