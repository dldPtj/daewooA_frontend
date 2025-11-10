<script >
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import ProfileComponent from "@/common/components/ProfileComponent.vue";
import ReservationComponent from "@/common/components/ReservationComponent.vue";
import AccountSelectBtnComponent  from "@/common/components/AccountSelectBtnComponent.vue";

import aTeamApi from "@/util/axios";
export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    ProfileComponent: ProfileComponent,
    ReservationComponent: ReservationComponent,
    AccountSelectBtnComponent: AccountSelectBtnComponent,
  },
  data() {
    return {
      reservations:[],
    }
  },
  async mounted() {
    const res = await aTeamApi.get('/api/users/me/reservations');
    const data = res.data.content;
    console.log('data >>> ', data);
    this.reservations = data;
  },

}
</script>

<template>
  <header-component/>
  <profile-component/>
  <!--  프로필 아래 메뉴 선택 버튼 -->
 <AccountSelectBtnComponent/>

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
                           :check-in-date="item.checkInDate"
                           :check-out-date="item.checkOutDate"
                           :check-in-time="item.checkInTime"
                           :check-out-time="item.checkOutTime"
                           :booking-reference="item.bookingReference"
                           :room-bed-info="item.roomBedInfo"
                           :room-name="item.roomName"
                           :user-name="item.userName"
                           :user-profile-image-url="item.userProfileImageUrl"
                           :view="item.view"
                           :hotel-image-url="item.hotelImageUrl"

    />
  </div>


  <FooterComponent/>
</template>

<style>
* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
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
  margin: 40px auto 0;
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