<script >

export default {
  props: {
    hotelName: String,
    roomNumber: String,
    checkinDate: String,
    checkoutDate: String,
    hotelCheckinTime: String,
    hotelCheckoutTime: String,
  }
};
</script>

<template>
  <div class= "ReservationList" >
    <div class="ReservationImage">
      <img src="../../assets/CommonProfileImg.png" alt="호텔 이미지가 나옵니다." id="ProfileImg">
    </div>
    <div class="Reservation_CheckInOut_Day">
      <a>Check-In</a><br>
      <span>{{checkinDate}}</span>
    </div>
    <div id="StickBar">—</div>
    <div class ="Reservation_CheckInOut_Day">
      <a>Check-Out</a><br>
      <span>{{checkoutDate}}</span>
    </div>
    <div class="OutLineStyle">
      <a class="OtherLine"></a>
    </div>
    <div class="Check_Time_Imges">
      <img src="../../assets/clock.png">
      <div>
        <img src="../../assets/clock.png">
      </div>
    </div>
    <div class="check_Time_Text">
      <p>체크인</p>
      <a>{{hotelCheckinTime}}</a>
      <p>체크아웃</p>
      <a>{{hotelCheckoutTime}}</a>
    </div>

    <div class="Room_num_img">
      <img src="../../assets/door.png ">
    </div>
    <div class="Room_num_Text">
      <p>방번호</p>
      <a>{{roomNumber}}</a>
    </div>
    <button type="button" id="TicketBtn">
      Download Ticket
    </button>
    <button type="button" id="MoreBtn">
      >
    </button>
  </div>
</template>

<style >
#ProfileImg{
  object-fit: cover;
}
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
  display: flex;
  background-color: white;
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
</style>