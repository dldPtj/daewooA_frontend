<script >
export default {
  emits: ['toggle-child'], // 이벤트 정의
  methods: {
    hideMe() {
      this.$emit('toggle-child', false);
    }
  }
};
</script>

<template>
  <p id="pUnderTitle">Login or Sign up to book</p>
  <input type="text" id="pPhonNumInput" placeholder="Phone Number">
  <p id="pUnderText">예약확인 문자/전화를 위해 전화번호를 남겨주세요</p>
  <button id="pContinueBtn" @click="hideMe">Continue</button>
  <div class="hr-sect">
    Or
  </div>
  <div id ="PaymentIconBoxes">
    <button type="button" id ="fBtn" class="pBtnGroup"><img src="../../assets/facebookLogin.png"></button>
    <button type="button" id = "GBtn" class="pBtnGroup"><img src="../../assets/googleLogin.png"></button>
    <button type="button" id = "ABtn" class="pBtnGroup"><img src="../../assets/appleLogin.png"></button>
  </div>
  <button type="button" id = "EBtn" class="pBtnGroupEmail" @click="$emit('switch-to-paymentSelectComponent')"><img src="../../assets/icon_email.png"> <a>Continue with email</a></button>
</template>

<style >

</style>