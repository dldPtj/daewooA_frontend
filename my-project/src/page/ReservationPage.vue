<script >
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import ProfileComponent from "@/common/components/ProfileComponent.vue";
export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    ProfileComponent: ProfileComponent,
  }
}
</script>

<template>
  <header-component/>
  <profile-component/>
  <!--  프로필 아래 메뉴 선택 버튼 -->
  <div class="ChangeAccountMenu">
    <button type="button" class="NOselectAcPage">계정</button>
    <a class="OtherLine"></a>
    <button type="button" class="selectAcPage">내역</button>
    <a class="OtherLine"></a>
    <button type="button" class="NOselectAcPage">결제수단</button>
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
    <div class= "ReservationList" >
      <div class="ReservationImage">
        <img src="" alt="호텔 이미지가 나옵니다.">
      </div>
      <div class="Reservation_CheckInOut_Day">
        <a>Check-In</a><br>
        <span>Thur, Dec 8</span>
      </div>
      <div id="StickBar">—</div>
      <div class ="Reservation_CheckInOut_Day">
        <a>Check-Out</a><br>
        <span>Thur, Dec 8</span>
      </div>
      <div class="OutLineStyle">
        <a class="OtherLine"></a>
      </div>
      <div class="Check_Time_Imges">
        <img src="../assets/clock.png">
        <div>
          <img src="../assets/clock.png">
        </div>
      </div>
      <div class="check_Time_Text">
        <p>체크인</p>
        <a>12:00pm</a>
        <p>체크아웃</p>
        <a>12:00pm</a>
      </div>

      <div class="Room_num_img">
        <img src="../assets/door.png ">
      </div>
      <div class="Room_num_Text">
        <p>방번호</p>
        <a>On arrival</a>
      </div>
      <button type="button" id="TicketBtn">
        Download Ticket
      </button>
      <button type="button" id="MoreBtn">
        >
      </button>
    </div>
  </div>


  <FooterComponent/>
</template>

<style>
#MoreBtn {
  width: 48px;
  height: 48px;
  margin: auto 0 auto 16px;
  border: #8DD3BB solid 1px;
  background-color: white;
}
#TicketBtn{
  width: 152px;
  height: 48px;
  display: flex;
  margin: auto 0 auto 330px;
  align-items: center;
  justify-content: center;
  background-color: #8DD3BB;
  border: none;
}
.Room_num_Text a{
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  leading-trim: NONE;
  line-height: 100%;

}
.Room_num_Text p{
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
}
.Room_num_Text{
  margin-top: 30px;
}
.Room_num_img{
  margin-top: 30px;
  margin-left: 24px;
  margin-right: 10px;
}
.Check_Time_Imges{
  margin: auto 10px auto 0;
}
.Check_Time_Imges img{
  display: flex;
  margin: 0px 0 8px 0;
}
.check_Time_Text{
 margin: auto 0;
}
.check_Time_Text p{
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;

}
.check_Time_Text a{
  display: flex;
  margin-bottom: 12px;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  leading-trim: NONE;
  line-height: 100%;

}
.OutLineStyle{
  display: flex;
  margin: auto 24px;
}
#StickBar{
  margin: auto 14px;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 100%;
}
.Reservation_CheckInOut_Day{
  margin: auto 0 auto;
}
.ReservationCheckInOut a{
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  leading-trim: NONE;
  line-height: 100%;
  color: #9e9a9a;
}
.ReservationCheckInOut span{
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 100%;

}
.ReservationImage{
  background-color: black;
  width: 80px;
  height: 80px;
  margin: auto 32px auto 24px;
}
.ReservationList{
  box-shadow: 0px 2px 5px #d3d3d3;
  display: flex;
  margin-top: 16px;
  width: 1232px;
  height: 144px;
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