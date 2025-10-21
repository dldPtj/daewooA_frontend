<script >
import aTeamApi from "@/util/axios";
import {reactive} from "vue";

export default {
  data() {
    return {
      pAModal: false,
    }
  },
  methods: {
    pAModalOpen() {
      this.pAModal = !this.pAModal
    },
    pAModalClose() {
      if (this.pAModal === true) {
        this.pAModal = false;
      }
    },
  },
  watch: {
    pAModal: function (val) {
      if (val) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  setup(){
    const state = reactive({
      form: {
        paymentNumber: "",
        expirationDate: "",
        cvc: "",
        cardUser: "",
        country: "",
      },
    });
    const submit = async () => {
      const cardAdd = {
        paymentNumber: state.form.paymentNumber,
        expirationDate: state.form.expirationDate,
        cvc: state.form.cvc,
        cardUser: state.form.cardUser,
        country: state.form.country,

      };
      await aTeamApi.post('/api/payments/me', cardAdd,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(async () => {
        alert("카드 추가 성공");
        window.location.reload();
      }).catch(()=> {
          alert("정보를 가져오는데 실패했습니다.");
      });
    };
    return { state, submit };
  },
}
</script>

<template>
  <button type="button" class = "AddNewCard" @click="pAModalOpen">
    <div class="AddNewCardMain">
      <div class="PlusBtn">
        <a>+</a>
      </div>
      <span>Add a new card</span>
    </div>
  </button>
  <div class="AccountModalWrap" v-show="pAModal">
    <div class="ACModalContainer">
      <!--      취소 버튼-->
      <img src="../../assets/ModalClose.png" alt="취소 사진" @click="pAModalClose" class="ModalCloseBtn">
      <h1>카드 추가</h1>
      <div class="AddCardList">
        <fieldset class="fieldModal">
          <legend class="LegendLogin">Card Number</legend>
          <!--  카드 번호 입력 하는곳-->
          <input type="text" placeholder="카드 번호를 입력하세요." class="LTextBox" v-model="state.form.paymentNumber">
        </fieldset>
        <div id="half">
        <fieldset class="fieldModalHalf">
          <legend class="LegendLogin">Exp. Date</legend>
          <!--    만료 날짜 입력 하는곳-->
          <input type="text" placeholder="만료 날짜를 입력하세요." class="LTextBox" v-model="state.form.expirationDate">
        </fieldset>
        <fieldset class="fieldModalHalf">
          <legend class="LegendLogin">CVC</legend>
          <!--          cvc 번호 입력 하는곳-->
          <input type="text" placeholder="cvc를 입력하세요." class="LTextBox" v-model="state.form.cvc">
        </fieldset>
        </div>
        <fieldset class="fieldModal">
          <legend class="LegendLogin">Name On Card</legend>
          <!--          카드 명의인 입력하는 곳-->
          <input type="text" placeholder="카드 명의인을 입력하세요." class="LTextBox" v-model="state.form.cardUser">
        </fieldset>
        <fieldset class="fieldModal">
          <legend class="LegendLogin">Country or Region</legend>
          <!--          국가/지역 입력하는 곳-->
          <input type="text" placeholder="국가/지역을 입력하세요." class="LTextBox" v-model="state.form.country">
        </fieldset>
        <div id="CardFooter">
         <input type="checkbox" class="LoginCheckbox"><a>정보 저장하기</a>
        </div>
      </div>
      <!--      클릭시 추가 완료-->
      <button @click="submit" class="ModalBtnStyle">Add Card</button>
    </div>
  </div>
</template>
<style >
#CardFooter{
  display: flex;
  margin-bottom: 40px;
}
#CardFooter input{
  display: flex;
  margin-right: 4px;
}
#half{
  display: flex;
  gap: 24px
}

.fieldModalHalf {
  display: flex;
  margin-bottom: 24px;
  width: 255px;
  height: 56px;
  border-radius: 4px;
}
.AddNewCardMain{
  font-weight: bold;
}
.PlusBtn span{
  display: flex;
  width: 96px;
  height: 15px;
  margin: 0 auto;
}
.PlusBtn a{
  font-size: 39px;
  color: #8DD3BB;
  margin-bottom: 18px;
}
.PlusBtn{
  width: 48px;
  height: 48px;
  border: #8DD3BB solid 2px;
  border-radius: 48px;
  margin: 0 auto 18px;
}
.AddNewCard{
  display: flex;
  width: 378px;
  height: 212px;
  border: #8DD3BB dashed 2px;
  background-color: white;
  justify-content: center;
  align-items: center;
}
.AddNewCard:hover{
  cursor: pointer;
}
.AddNewCard:active{
  background: #9e9a9a;
}


</style>