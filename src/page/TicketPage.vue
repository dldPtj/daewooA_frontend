<script>
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import html2canvas from "html2canvas";
import aTeamApi from "@/util/axios";

export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
  },
  data(){
    return{
      reservationInfo: {},
      profileImg: {},
      hotelImg: [],
    }
  },
  async mounted() {
    const reservationId = this.$route.query.id;

    try {
      const result = await aTeamApi.get(`/api/users/me/reservations/${reservationId}/ticket`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      this.reservationInfo = result.data.content;
      this.profileImg = this.reservationInfo.userProfileImageUrl;
      this.hotelImg = this.reservationInfo.hotelImageUrl;
      console.log('reservationInfo', this.reservationInfo);
    } catch (error) {
      console.error('예약 정보 로드 실패:', error);
    }
  },
  methods: {
    async downloadTicketBtn() {
      const element = document.getElementById("downloadTicket2");

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
      if (typeof path !== "string") {
        console.warn("⚠️ path가 문자열이 아님:", path);
        return "";
      }
      return path.startsWith('http')
          ? path
          : `${baseUrl}${path}`;
    }
  },

}


</script>

<template>
  <HeaderComponent/>
  <div id="TicketPageMain">
    <div class="country-city-hotelname">
      <span class="hd-country">Turkey</span>&nbsp;>&nbsp;<span class="hd-city">Istanbul</span>&nbsp;>&nbsp;<span
        class="hd-hotelname">{{ reservationInfo.hotelName }}</span>
    </div>

    <!--    티켓 내용-->
    <div id="TicketPageTitle">
      <div id="paymentHotelName">
        <a>{{ reservationInfo.hotelName }}</a>
        <p><img alt="위치 아이콘" src="../assets/ion-location.png">{{reservationInfo.hotelAddress}}</p>
      </div>
      <!--      가격 정보와 버튼 컨테이너-->
      <div id="TicketPriceAndBtn">
        <p id="PPrice">{{reservationInfo.totalPrice?.toLocaleString()}}/night</p>
        <div id="TicketBtnBox">
          <button id="ShareBtn"><img src="../assets/share.png"></button>
          <button id="DownloadBtn" @click="downloadTicketBtn">Download</button>
        </div>

      </div>
    </div>
    <div class="ticketImg" id="downloadTicket2">
      <div class="ticketDate">
        <a class="ticketDateFont">{{ reservationInfo.checkInDate }}</a>
        <p class="ticketCheckFont" style="margin-bottom: 16px">Check-In</p>
        <img src="../assets/ticketImg.png" alt="이 그림 사이에 건물이 끼어있습니다." class="TicketImg1">
        <img src="../assets/building.png" alt="건물사진" class="TicketBuilding">
        <img src="../assets/ticketImg.png" alt="이 그림 사이에 건물이 끼어있습니다." class="TicketImg1">
        <a class="ticketDateFont" style="margin-top: 16px">{{ reservationInfo.checkOutDate }}</a>
        <p class="ticketCheckFont">Check-Out</p>
      </div>
      <div class="ticketDetail">
        <div class="ticketDetailTop">
          <div class="ticketProfile">
            <div class="ticketProfileImg">
              <img :src="getFullUrl(profileImg)" alt="사용자 프로필" v-if="profileImg !== null">
              <img src="@/assets/userImg.png" v-if="profileImg === null">
            </div>
            <div class="ticketProfileName">
              {{ reservationInfo.userName }}
            </div>
          </div>
          <div class="ticketRoomDetail">
            {{ reservationInfo.roomName }} {{ reservationInfo.roomBedInfo }} ({{ reservationInfo.view }})
          </div>
        </div>
        <div class="ticketDetailMiddle">
          <div class="ticketDetailBox">
            <div class="Check_Time_Imges">
              <img src="../assets/clock.png">
            </div>
            <div class="check_Time_Text">
              <p>체크인</p>
              <a>{{ reservationInfo.checkInTime }}</a>
            </div>
          </div>
          <div class="ticketDetailBox">
            <div class="Check_Time_Imges">
              <img src="../assets/clock.png">
            </div>
            <div class="check_Time_Text">
              <p>체크아웃</p>
              <a>{{ reservationInfo.checkOutTime }}</a>
            </div>
          </div>
          <div class="ticketDetailBox">
            <div class="Check_Time_Imges">
              <img src="../assets/door.png">
            </div>
            <div class="check_Time_Text">
              <p>방번호</p>
              <a>{{ reservationInfo.roomNumber }}</a>
            </div>
          </div>
        </div>
        <div class="ticketDetailBottom">
          <div class="ticketCountry">
            <a class="ticketDateFont">{{ reservationInfo.bookingReference }}</a>
            <p class="ticketCheckFont">ABC12345</p>
          </div>
          <div class="barcodeImg">
            <img src="../assets/barcode.png" alt="바코드 입니다.">
          </div>
        </div>
      </div>
      <div class="ticketHotelImg">
        <img :src="getFullUrl(hotelImg[0])">
      </div>
    </div>
    <!--    티켓 페이지 아래 설명글-->
    <div id="TicketPageUnder">
      <h2 style="font-weight: bold">Terms and Conditions</h2>

      <h3>Payments</h3>
      <div class="TicketUnderText">
        <a>ㆍ</a>
        <p>If you are purchasing your ticket using a debit or credit card via the Website, we will process these
          payments via the automated secure common payment gateway which will be subject to fraud screening
          purposes. </p>
      </div>
      <div class="TicketUnderText">
        <a>ㆍ</a>
        <p>If you do not supply the correct card billing address and/or cardholder information, your booking will not be
          confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is
          declined for any reason or if you have supplied incorrect card information. If we become aware of, or is
          notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be
          cancelled and you will be liable for all costs and expenses arising from such cancellation, without prejudice
          to any action that may be taken against us.</p>
      </div>
      <div class="TicketUnderText">
        <a>ㆍ</a>
        <p>Golobe may require the card holder to provide additional payment verification upon request by either
          submitting an online form or visiting the nearest Golobe office, or at the airport at the time of check-in.
          Golobe reserves the right to deny boarding or to collect a guarantee payment (in cash or from another credit
          card) if the card originally used for the purchase cannot be presented by the cardholder at check-in or when
          collecting the tickets, or in the case the original payment has been withheld or disputed by the card issuing
          bank. Credit card details are held in a secured environment and transferred through an internationally
          accepted system.</p>
      </div>

      <h3>Contact Us</h3>
      <div class="TicketUnderText" style="flex-direction: column">
        <p>If you have any questions about our Website or our Terms of Use, please contact:</p>
        <p>Golobe Group Q.C.S.C</p>
        <P>Golobe Tower</P>
        <P>P.O. Box: 22550</P>
        <p>Doha, State of Qatar</p>
        <p>Further contact details can be found at golobe.com/help</p>
      </div>
    </div>
  </div>

  <FooterComponent/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#TicketBtnBox {
  display: flex;
  gap: 15px;

}

#TicketPriceAndBtn {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

#DownloadBtn {
  display: flex;
  width: 150px;
  height: 45px;
  background: #8DD3BB;
  border: none;
  border-radius: 4px;
  justify-content: center;
  flex-direction: column;
}

#ShareBtn {
  display: flex;
  width: 45px;
  height: 45px;
  background: white;
  border-radius: 4px;
  border: #8DD3BB solid 1px;
}

#ShareBtn img {
  display: flex;
  width: 20px;
  height: 20px;
  margin: auto;
}

.TicketUnderText {
  display: flex;
}

#TicketPageUnder {
  display: flex;
  flex-direction: column;
  gap: 34px;
  text-align: left;
  margin-top: 64px;
}

#TicketPageMain {
  display: flex;
  flex-direction: column;
  width: 1232px;
  margin: 0 auto;
}

#TicketPageTitle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
}
</style>