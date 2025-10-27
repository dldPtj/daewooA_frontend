<script>
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import LeavePhoneNum from "@/common/components/LeavePhoneNum.vue"
import TosspageMoveComponent from "@/common/components/TosspageMoveComponent.vue"
import aTeamApi from "@/util/axios";
import dayjs from 'dayjs';
import CouponComponent from "@/common/components/CouponComponent.vue";

export default {
  components: {

    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    LeavePhoneNum: LeavePhoneNum,
    TosspageMoveComponent: TosspageMoveComponent,
    CouponComponent: CouponComponent,
  },
  data() {
    return {
      showChild: true,
      hotelName: {},
      roomName: {},
      checkInDate: {},
      checkoutDate: {},
      subtotal: {},
      taxes: {},
      serviceFee: {},
      totalPrice: {},
      reviewCount: {},
      avgRating: {},
      coupone: [],
      discountPrice: {},
      total: {},
    };
  },
  methods: {
    handleToggle(value) {
      this.showChild = value;
    },
    FinalTotal(val) {
      const target = this.items.find((i) => i.name === val.name);
      if (target) target.selected = val.selected;
    },
  },
  async mounted() {
    const roomId = localStorage.getItem("roomId");
    const checkInDate = localStorage.getItem("checkin");
    const checkOutDate = localStorage.getItem("checkout");

    const formatCheckInDate = dayjs(checkInDate).format('YYYY-MM-DD');
    const formatCheckOutDate = dayjs(checkOutDate).format('YYYY-MM-DD');


    if (!roomId) {
      console.warn('room ID가 없습니다.');
      return;
    }
    if (!checkInDate) {
      console.warn('checkInDate ID가 없습니다.');
      return;
    }
    if (!checkOutDate) {
      console.warn('checkOutDate ID가 없습니다.');
      return;
    }

    try {
      const result = await aTeamApi.get(`/api/reservations/preview?roomId=${roomId}&checkInDate=${formatCheckInDate}&checkOutDate=${formatCheckOutDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = result.data;
      this.hotelName = data.hotelName;
      this.roomName = data.roomName;
      this.checkInDate = data.checkInDate;
      this.checkoutDate = data.checkoutDate;
      this.subtotal = data.subtotal;
      this.taxes = data.taxes;
      this.serviceFee = data.serviceFee;
      this.totalPrice = data.totalPrice;
      this.reviewCount = data.reviewCount;
      this.avgRating = data.avgRating;

      console.log('roomInfo', data);
    } catch (error) {
      console.error('호텔 정보 로드 실패:', error);
    }

    const couponList = await aTeamApi.get(`/api/my/coupons`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    this.coupone = couponList.data || couponList.data.content;


  },
  computed: {
    totalDiscount() {
      // ✅ 선택된 항목만 합산
      return this.coupone
          .filter((item) => item.selected)
          .reduce((sum, item) => sum + item.discount, 0);
    },
  },

}
</script>

<template>
  <HeaderComponent/>
  <div class="country-city-hotelname">
    <span class="hd-country">Turkey</span>&nbsp;>&nbsp;<span class="hd-city">Istanbul</span>&nbsp;>&nbsp;<span
      class="hd-hotelname">{{ hotelName }}</span>
  </div>
  <div id="paymentContainer">
    <div id="paymentMain">
      <div id="paymentHotelInfo">
        <div id="pTitle">
          <p id="pRoomName">{{ roomName }} - 1 더블베드 or 2 트윈 베드</p>
          <p id="PPrice">₩{{ totalPrice }}/night</p>
        </div>
        <div id="pHotelDetail">
          <img alt="호텔 이미지" class="paymentHotelImg">
          <div id="paymentHotelName">
            <a>{{ hotelName }}</a>
            <p><img alt="위치 아이콘" src="../assets/ion-location.png">Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
          </div>
        </div>
        <div id="pDateTime">
          <div id="pCheckIn">
            <a>{{ checkInDate }}</a>
            <p>Check-In</p>
          </div>
          <div class="miniCircle"></div>
          <div class="pBorderline"></div>
          <img src="../assets/building.png">
          <div class="pBorderline"></div>
          <div class="miniCircle"></div>
          <div id="pCheckOut">
            <a>{{ checkoutDate }}</a>
            <p>Check-Out</p>
          </div>
        </div>
      </div>
      <!--      결제 방법 선택 -->
      <div id="pSelectPayment">
        <button id="fullPaymentBtn">
          <div><a>전체결제</a>
            <p>전체 결제 후 예약 확정</p></div>
          <img src="../assets/icon_radioSelect.png"></button>
        <button id="partialPaymentBtn">
          <div><a>부분 결제, 나머지 계산</a>
            <p>부분결제 후 자동적으로 나머지 결제가 이루어집니다</p></div>
          <img src="../assets/icon_radioNoSelect.png"></button>
      </div>
      <!--      전화번호 입력후 버튼을 누르면 결제수단 선택가능한 부분의 뒷배경-->
      <div id="pUnderContainer">
        <LeavePhoneNum v-if="showChild === true " @toggle-child="handleToggle"/>
        <TosspageMoveComponent v-if="showChild === false"/>
      </div>
    </div>
    <div id="rightPList">
      <div class="paymentList">
        <div id="pListTop">
          <img src="../assets/hotel-img-1.png" id="pHotelListImage">
          <div id="pListTopTextBox">
            <p id="pListTopText1">CVK Park Bosphorus...</p>
            <p id="pListTopText2">{{ roomName }} - 1 더블베드 or 2 트윈 베드</p>
            <div id="pRatingReviewContainer">
              <div id="pRatingContainer"><a>{{ avgRating }}</a></div>
              <a id="pListTopText3">Very Good <span>{{ reviewCount }} reviews</span></a>
              <!--            리뷰 평점에 따른 택스트 변화시키기-->
            </div>
          </div>
        </div>
        <hr>
        <p class="marginTopBottom16" id="protectText">Your booking is protected by<span>&nbsp;golobe</span></p>
        <hr>
        <div id="priceList">
          <p id="priceDetail">Price Details</p>
          <div id="pBaseFare" class="fontMontserrat"><a>Base Fare </a><a>₩{{ subtotal }}</a></div>
          <div id="pDiscount" class="fontMontserrat"><a>Discount</a><a>₩0</a></div>
          <div id="pTaxes" class="fontMontserrat"><a>Taxes</a><a>₩{{ taxes }}</a></div>
          <div id="pServiceFee" class="fontMontserrat"><a>Service Fee</a><a>₩{{ serviceFee }}</a></div>
        </div>
        <hr>
        <div id="pTotal" class="fontMontserrat"><a>Total </a><a>₩{{ total }}</a></div>
      </div>
      <div class="paymentList">
        <div id="couponTitle">
          <a>할인 쿠폰 선택</a>
        </div>
        <div class="couponList">
          <input type="radio" name="coupon" style="width: 20px; height: 20px; margin: auto 0">
          <div class="couponMain">
            선택 안함
          </div>
        </div>
          <coupon-component v-for="(item, index) in coupone"
                            :key="index"
                            :id="item.id"
                            :name="item.name"
                            :expiry-date="item.expiryDate"
                            :discount-amount="item.discountAmount"
                            :item="item"
                            @discount-amount="FinalTotal"
          />
      </div>
    </div>
  </div>

  <FooterComponent/>
</template>

<style>
#rightPList {
  display: flex;
  flex-direction: column;
}

.fontMontserrat {
  font-family: Montserrat;
  font-weight: bold;
  font-size: 16px;
  line-height: 100%;
}

#priceDetail {
  font-family: Acme;
  font-weight: bold;
  font-size: 16px;
  line-height: 100%;

}

#protectText {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
}

#protectText span {
  font-family: Montserrat;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
}

#pTotal {
  display: flex;
  margin-top: 16px;
}

.marginTopBottom16 {
  display: flex;
  margin: 16px 0;
}

#pTotal {
  display: flex;
  justify-content: space-between;
}

#pServiceFee {
  display: flex;
  justify-content: space-between;
}

#pTaxes {
  display: flex;
  justify-content: space-between;
}

#pDiscount {
  display: flex;
  justify-content: space-between;
}

#pBaseFare {
  display: flex;
  justify-content: space-between;
}

#priceList {
  display: flex;
  flex-direction: column;
  width: 402px;
  gap: 16px;
  text-align: left;
  margin: 16px 0;
}

#pRatingReviewContainer {
  display: flex;
  margin-top: 16px;
  gap: 8px;
}

#pRatingContainer {
  display: flex;
  justify-content: center;
  width: 40px;
  height: 32px;
  border: #8DD3BB solid 1px;
}

#pRatingContainer a {
  display: flex;
  margin: auto;
}

#pListTopText3 {
  font-family: Montserrat;
  font-weight: 700;
  font-size: 12px;
  leading-trim: NONE;
  line-height: 100%;
  margin: auto 0;
}

#pListTopText3 span {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
}

#pListTopText2 {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  text-align: left;
}

#pListTopText1 {
  font-family: Montserrat;
  text-align: left;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
}

#pListTopTextBox {
  display: flex;
  flex-direction: column;
  margin-left: 24px;
}

#pListTop {
  display: flex;
  width: 402px;
  height: 120px;
}

#pHotelListImage {
  display: flex;
  width: 120px;
  height: 120px;
}

#pContinueBtn {
  display: flex;
  justify-content: center;
  padding: 14px 0;
  width: 742px;
  height: 48px;
  background-color: #8DD3BB;
  border: none;
  border-radius: 4px;

}

#pUnderText {
  display: flex;
  text-align: left;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
}

#pPhonNumInput {
  display: flex;
  width: 742px;
  height: 56px;
  border-radius: 4px;
  border: black solid 1px;
  padding: 18px 16px;
}

#pUnderTitle {
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 100%;
  text-align: left;
}

.pBtnGroupEmail {
  display: flex;
  justify-content: center;
  margin: 16px auto 0;
  border: #8DD3BB solid 1px;
  width: 742px;
  height: 56px;
  background-color: white;
  gap: 16px;
}

.pBtnGroupEmail img {
  width: 24px;
  height: 24px;
  margin: auto 0;
}

.pBtnGroupEmail a {
  display: flex;
  margin: auto 0;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;

}

.pBtnGroup {
  border: #8DD3BB solid 1px;
  width: 236px;
  height: 56px;
  background-color: white;
}

.pBtnGroup:hover {
  background-color: #D9D9D9;
}

#PaymentIconBoxes {
  display: flex;
  margin: 24px auto 0;
}

#partialPaymentBtn {
  display: flex;
  background-color: white;
  border: none;
  justify-content: space-between;
  text-align: left;
  padding: 16px;
  border-radius: 12px;
  margin: 0 auto 16px;
  width: 758px;
  height: 80px;
  box-shadow: 0px 2px 5px #d3d3d3;
}

#partialPaymentBtn img {
  margin: 14px;
  width: 20px;
  height: 20px;
}

#partialPaymentBtn a {
  font-family: Noto Sans;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
}

#partialPaymentBtn p {
  font-family: Montserrat;
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
}

#fullPaymentBtn {
  display: flex;
  background-color: #8DD3BB;
  border: none;
  justify-content: space-between;
  text-align: left;
  padding: 16px;
  border-radius: 12px;
  margin: 16px auto 0;
  width: 758px;
  height: 80px;
}

#fullPaymentBtn img {
  margin: 14px;
  width: 20px;
  height: 20px;
}

#fullPaymentBtn a {
  font-family: Noto Sans;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
}

#fullPaymentBtn p {
  font-family: Montserrat;
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
}

#pCheckOut {
  margin-left: 136px;
}

#pCheckOut a {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;

}

#pCheckOut p {
  text-align: left;
  margin-top: 8px;
  color: gray;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
}

.miniCircle {
  margin: auto 0;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: black;
}

.pBorderline {
  margin: auto 0;
  width: 36px;
  height: 0px;
  opacity: 1;
  border: black solid 1px;

}

#pCheckIn {
  margin-right: 136px;
}

#pCheckIn a {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
}

#pCheckIn p {
  margin-top: 8px;
  color: gray;
  text-align: left;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
}

#paymentHotelName a {
  display: flex;
  text-align: left;
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 20px;
  line-height: 100%;
}

#paymentHotelName p {
  font-family: Montserrat;
  margin-top: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
}

#paymentHotelName {
  display: flex;
  flex-direction: column;
  height: 50px;
  margin: 22px 0 22px;
}

.paymentHotelImg {
  display: flex;
  margin: 16px 16px 32px;
  width: 63px;
  height: 63px;
  background-color: gray;
}

#pUnderContainer {
  display: flex;
  padding: 24px;
  flex-direction: column;
  margin-top: 40px;
  width: 790px;
  box-shadow: 0px 2px 5px #d3d3d3;
  gap: 16px;
}

#paymentMain {
  display: flex;
  flex-direction: column;
  width: 790px;
  height: 1040px;
}

#pSelectPayment {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 790px;
  height: 217px;
  margin-top: 40px;
  box-shadow: 0px 2px 5px #d3d3d3;
}

#PPrice {
  font-size: 20px;
  font-weight: bold;
  color: #FF8682;
}

#pRoomName {
  font-family: Noto Sans;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;

}

#pDateTime {
  display: flex;
  justify-content: center;
  margin: 40px auto 0;
  width: 742px;
  height: 49px;
}

#pDateTime img {
  margin: 0 24px 0 24px;
}

#pHotelDetail {
  display: flex;
  gap: 24px;
  margin: 0 auto;
  width: 742px;
  height: 95px;
  border: #8DD3BB solid 1px;
}

#pTitle {
  display: flex;
  justify-content: space-between;
  margin: 32px 0 24px 0;
  padding: 0 24px;
  width: 100%;
  height: 33px;
}

#paymentContainer {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 22px;
}

#paymentHotelInfo {
  display: flex;
  flex-direction: column;
  width: 790px;
  height: 305px;
  box-shadow: 0px 2px 5px #d3d3d3;
}

.paymentList {
  display: flex;
  flex-direction: column;
  width: 450px;
  box-shadow: 0px 2px 5px #d3d3d3;
  padding: 24px;
  margin-bottom: 15px;
}
</style>