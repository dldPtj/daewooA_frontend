<script>
import html2canvas from "html2canvas";

export default {
  props: {
    hotelName: String,
    roomNumber: String,
    checkInDate: String,
    checkOutDate: String,
    checkInTime: String,
    checkOutTime: String,
    userName: String,
    roomName: String,
    roomBedInfo: String,
    bookingReference: String,
    userProfileImageUrl: String,
    view: String,
    hotelImageUrl: String,
    reservationId: Number,
  },
  methods: {
    async downloadTicketBtn() {
      const element = document.getElementById("downloadTicket");

      html2canvas(element, {
        useCORS: true,
        allowTaint: false,
        scale: 2
      }).then(canvas => {
        const imageUrl = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = 'ticket.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

      })

    },
    getFullUrl(path) {
      const baseUrl = process.env.VUE_APP_API_URL;
      return path.startsWith('http')
          ? path
          : `${baseUrl}${path}`;
    },
    goToTicketPage(){
      this.$router.push(`/ticketPage?id=${this.reservationId}`);
    }
  },

}
</script>

<template>
  <div class="ReservationList">
    <div class="ReservationImage">
      <img :src="getFullUrl(hotelImageUrl[0])" alt="호텔 이미지가 나옵니다." id="ProfileImg">
    </div>
    <div class="Reservation_CheckInOut_Day">
      <a>Check-In</a><br>
      <span>{{ checkInDate }}</span>
    </div>
    <div id="StickBar">—</div>
    <div class="Reservation_CheckInOut_Day">
      <a>Check-Out</a><br>
      <span>{{ checkOutDate }}</span>
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
      <a>{{ checkInTime }}</a>
      <p>체크아웃</p>
      <a>{{ checkOutTime }}</a>
    </div>

    <div class="Room_num_img">
      <img src="../../assets/door.png ">
    </div>
    <div class="Room_num_Text">
      <p>방번호</p>
      <a>{{ roomNumber }}</a>
    </div>
    <button type="button" id="TicketBtn" @click="downloadTicketBtn">
      Download Ticket
    </button>
    <button type="button" id="MoreBtn" @click="goToTicketPage">
      >
    </button>

  </div>

  <div class="ticketImg" id="downloadTicket">
    <div class="ticketDate">
      <a class="ticketDateFont">{{ checkInDate }}</a>
      <p class="ticketCheckFont" style="margin-bottom: 16px">Check-In</p>
      <img src="../../assets/ticketImg.png" alt="이 그림 사이에 건물이 끼어있습니다." class="TicketImg1">
      <img src="../../assets/building.png" alt="건물사진" class="TicketBuilding">
      <img src="../../assets/ticketImg.png" alt="이 그림 사이에 건물이 끼어있습니다." class="TicketImg1">
      <a class="ticketDateFont" style="margin-top: 16px">{{ checkOutDate }}</a>
      <p class="ticketCheckFont">Check-Out</p>
    </div>
    <div class="ticketDetail">
      <div class="ticketDetailTop">
        <div class="ticketProfile">
          <div class="ticketProfileImg">
            <img :src="getFullUrl(userProfileImageUrl)" alt="사용자 프로필" v-if="userProfileImageUrl !== null">
            <img src="@/assets/userImg.png" v-else>
          </div>
          <div class="ticketProfileName">
            {{ userName }}
          </div>
        </div>
        <div class="ticketRoomDetail">
          {{ roomName }} {{ roomBedInfo }} ({{ view }})
        </div>
      </div>
      <div class="ticketDetailMiddle">
        <div class="ticketDetailBox">
          <div class="Check_Time_Imges">
            <img src="../../assets/clock.png">
          </div>
          <div class="check_Time_Text">
            <p>체크인</p>
            <a>{{ checkInTime }}</a>
          </div>
        </div>
        <div class="ticketDetailBox">
          <div class="Check_Time_Imges">
            <img src="../../assets/clock.png">
          </div>
          <div class="check_Time_Text">
            <p>체크아웃</p>
            <a>{{ checkOutTime }}</a>
          </div>
        </div>
        <div class="ticketDetailBox">
          <div class="Check_Time_Imges">
            <img src="../../assets/door.png">
          </div>
          <div class="check_Time_Text">
            <p>방번호</p>
            <a>{{ roomNumber }}</a>
          </div>
        </div>
      </div>
      <div class="ticketDetailBottom">
        <div class="ticketCountry">
          <a class="ticketDateFont">{{ bookingReference }}</a>
          <p class="ticketCheckFont">ABC12345</p>
        </div>
        <div class="barcodeImg">
          <img src="../../assets/barcode.png" alt="바코드 입니다.">
        </div>
      </div>
    </div>
    <div class="ticketHotelImg">
      <img :src="getFullUrl(hotelImageUrl[0])">
    </div>
  </div>
</template>

<style>
#downloadTicket {
  position: absolute;
  left: -99999px;
  top: 0;
  opacity: 1;
  visibility: visible;
}

.ticketHotelImg {
  display: flex;
  margin: auto 0;
  justify-content: center;
  width: 375px;
  height: 309px;
  object-fit: cover;
}

.ticketHotelImg img {
  display: flex;
  width: 100%;
  height: 100%;
}

.barcodeImg {
  display: flex;
}

.barcodeImg img {
  width: 240px;
  height: 75px;
  margin-top: 44px;
}

.ticketCountry {
  display: flex;
  width: 90px;
  margin: 37px 0 34px 30px;
  flex-direction: column;
}

.ticketDetailBottom {
  display: flex;
  width: 375px;
  justify-content: space-between;

}

.ticketDetailBox {
  display: flex;

}

.ticketDetailMiddle {
  display: flex;
  text-align: left;
  gap: 32px;
  padding: 24px;
}

.ticketRoomDetail {
  width: 228px;
  display: flex;
  margin: auto 0;
  font-family: Acme;
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  text-align: right;

}

.ticketProfileName {
  display: flex;
  margin: auto 0;
  font-family: Acme;
  font-weight: bold;
  font-size: 20px;
  line-height: 100%;

}

.ticketProfile {
  display: flex;
  width: 205px;
  gap: 16px
}

.ticketProfileImg {
  display: flex;
  align-items: center;
}

.ticketProfileImg img {
  width: 48px;
  height: 48px;
  border: 1px solid #FFFFFF;
  border-radius: 50%;


}

.ticketDetailTop {
  display: flex;
  padding: 24px 24px;
  justify-content: space-between;
  width: 610px;
  background: #8DD3BB;
}

.ticketDetail {
  display: flex;
  flex-direction: column;
  width: 610px;

}

.ticketDateFont {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 32px;
  line-height: 100%;
  text-align: left;
  margin-bottom: 4px;

}

.ticketCheckFont {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  text-align: left;

}

.TicketBuilding {
  width: 24px;
  height: 24px;
}

.TicketImg1 {
  width: 26px;
  height: 36px;
}

.ticketDate {
  display: flex;
  flex-direction: column;
  width: 246px;

  padding: 34px 24px;
  background: #EBF6F2;
}

.ticketImg {
  display: flex;
  width: 1231px;
  box-shadow: 5px 5px 18px 5px #d3d3d3;
}


#ProfileImg {
  width: 100%;
  object-fit: cover;
}

#MoreBtn {
  width: 48px;
  height: 48px;
  margin: auto 0 auto 16px;
  border: #8DD3BB solid 1px;
  background-color: white;
}

#TicketBtn {
  width: 152px;
  height: 48px;
  display: flex;
  margin: auto 0 auto 330px;
  align-items: center;
  justify-content: center;
  background-color: #8DD3BB;
  border: none;
}

#TicketBtn:hover {
  background-color: #b6b2b2;
  cursor: pointer;
}

#TicketBtn:active {
  background: #9e9a9a;
}

.Room_num_Text a {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  leading-trim: NONE;
  line-height: 100%;

}

.Room_num_Text p {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
}

.Room_num_Text {
  margin-top: 30px;
}

.Room_num_img {
  margin-top: 30px;
  margin-left: 24px;
  margin-right: 10px;
}

.Check_Time_Imges {
  margin: auto 10px auto 0;
}

.Check_Time_Imges img {
  display: flex;
  margin: 0px 0 8px 0;
}

.check_Time_Text {
  margin: auto 0;
}

.check_Time_Text p {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;

}

.check_Time_Text a {
  display: flex;
  margin-bottom: 12px;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  leading-trim: NONE;
  line-height: 100%;

}

.OutLineStyle {
  display: flex;
  margin: auto 24px;
}

#StickBar {
  margin: auto 14px;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 100%;
}

.Reservation_CheckInOut_Day {
  margin: auto 0 auto;
}

.ReservationCheckInOut a {
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  leading-trim: NONE;
  line-height: 100%;
  color: #9e9a9a;
}

.ReservationCheckInOut span {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 100%;

}

.ReservationImage {
  display: flex;
  background-color: white;
  width: 80px;
  height: 80px;
  margin: auto 32px auto 24px;
}

.ReservationList {
  box-shadow: 0px 2px 5px #d3d3d3;
  display: flex;
  margin-top: 16px;
  width: 1232px;
  min-height: 144px;
}
</style>