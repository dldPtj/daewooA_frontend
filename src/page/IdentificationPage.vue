<script>
import LoginImg1 from '../assets/LoginImg1.jpg'
import LoginImg2 from '../assets/LoginImg2.jpg'
import LoginImg3 from  '../assets/LoginImg3.jpg'
import { reactive } from "vue";
import {aTeamApi} from "@/util/axios";
import router from "@/router";
export default {
  data() {
    return {
      loginImg: LoginImg1,
      loginImgBtn1: LoginImg1,
      loginImgBtn2: LoginImg2,
      loginImgBtn3: LoginImg3,
      changeLBtn1: true,
      changeLBtn2: false,
      changeLBtn3: false,
      timerId : null,
    };
  },
  async mounted() {
    this.timerId = setInterval(this.TtoCIMG, 10000);
  },
  beforeUnmount() {
    clearInterval(this.timerId);
  },
  setup(){
    const state = reactive({
      form: {
        token: "",
      },
    });
    const submit = async () => {
      const forgotPwObj = {
        token: state.form.token,
      };
      await aTeamApi.post('/api/auth/verify-code', forgotPwObj).then(async (res) => {
        alert("인증 되었습니다.");
        await router.push("/resetpw");
        let token = res.data.content.temporaryToken;
        localStorage.setItem("FindPwToken", token);
      }).catch(()=> {
          alert("인증번호가 일치하지 않습니다.");
      });
    };
    return { state, submit };
  },

  methods: {
    changeLoginImg(img) {
      if (img === 'img1') {
        this.loginImg = LoginImg1;
      } else if(img === 'img2'){
        this.loginImg = LoginImg2;
      }else if(img === 'img3'){
        this.loginImg = LoginImg3;
      }
    },
    changLBtn(btn) {
      if (btn === 'btn2') {
        this.changeLBtn2 = true;
        this.changeLBtn1 = false;
        this.changeLBtn3 = false;
        clearInterval(this.timerId);
        this.timerId = setInterval(this.TtoCIMG, 10000);

      } else if (btn === 'btn1') {
        this.changeLBtn1 = true;
        this.changeLBtn2 = false;
        this.changeLBtn3 = false;
        clearInterval(this.timerId);
        this.timerId = setInterval(this.TtoCIMG, 10000);
      }
      else if (btn === 'btn3') {
        this.changeLBtn3 = true;
        this.changeLBtn1 = false;
        this.changeLBtn2 = false;
        clearInterval(this.timerId);
        this.timerId = setInterval(this.TtoCIMG, 10000);
      }
    },
    TtoCIMG() {
      if (this.loginImg === LoginImg1) {
        this.loginImg = LoginImg2;
        this.changeLBtn2 = true;
        this.changeLBtn1 = false;
        this.changeLBtn3 = false;
      } else if (this.loginImg === LoginImg2) {
        this.loginImg = LoginImg3;
        this.changeLBtn1 = false;
        this.changeLBtn2 = false;
        this.changeLBtn3 = true;
      }
      else if (this.loginImg === LoginImg3) {
        this.loginImg = LoginImg1;
        this.changeLBtn1 = true;
        this.changeLBtn2 = false;
        this.changeLBtn3 = false;
      }
    },
  }

};
</script>

<template>
  <div id = "LoginMain">
    <div class="LoginBox">
      <div class="LoginText">
        <router-link to="/loginpage" id="backToLogin"><p >&lt; Back to Login</p></router-link>
        <h1>인증하기</h1>
        <br>
        <a class="PlsL">이메일로 받은 인증번호를 입력해주세요</a>
      </div>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Enter Code</legend>
        <input type="text" placeholder="이메일로 받은 코드를 입력하세요." class="LTextBox" id="userEmail" v-model="state.form.token">
      </fieldset>
      <button @click="submit" id="LoginBtn">제출</button>
    </div>
    <div class="LoginImages">
      <transition name="fade">
        <img :src="loginImg" :key="loginImg" style="width: 612px; height: 816px" class="LoginIMG" alt="로그인시 나오는 사진">
      </transition>
      <div class= "PicBtnBoxes">
         <span style="margin-right: 8px">
          <button type="button" @click="changeLoginImg('img1'), changLBtn('btn1')" class="NSelectPicBtn"
                  :class="{'SelectPicBtn': changeLBtn1}"></button>
         </span>
        <span style="margin-right: 8px">
          <button type="button" @click="changeLoginImg('img2'), changLBtn('btn2')" class="NSelectPicBtn"
                  :class="{'SelectPicBtn': changeLBtn2}"></button>
         </span>
        <span style="margin-right: 8px">
          <button type="button" @click="changeLoginImg('img3'), changLBtn('btn3')" class="NSelectPicBtn"
                  :class="{'SelectPicBtn': changeLBtn3}"></button>
         </span>
      </div>
    </div>
  </div>
</template>

<style>
#backToLogin{
  display: flex;
  margin-bottom: 20px;
  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  color: black;
  text-decoration-line: none;
}
#backToLogin:hover{
  color: #9e9a9a;
}

* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#LoginMain{
  display: flex;
  justify-content: center;
}


.LoginBox{
  margin: auto 104px  auto auto;
  width: 512px;
  height: 593px;
}
.LoginText{
  text-align: left;
  margin-bottom: 48px;
}
.PlsL{
  color: #112211;
}




.LegendLogin{
  text-align: left;
}
.fieldLogin{
  display: flex;
  margin-bottom: 24px;
  width: 512px;
  height: 56px;
  border-radius: 4px;
}

#LoginBtn{
  margin-bottom: 16px;
}

#LoginIconBoxes{
  margin-top: 40px;
  display: flex;
}
#fBtn{
  margin-right: 16px;
}
#GBtn{
  margin-right: 16px;
}
.LTextBox{
  display: flex;
  flex: 1;
  height: 30px;
  border: none;
  margin-left: 16px;
  background-color: white;
}
input.LTextBox:focus{
  outline: none;
}

#LoginBtn{
  width: 100%;
  height: 48px;
  background-color: #8DD3BB;
  border-radius: 4px;
  border: none;
  font-weight: bold;
}

#LoginBtn:hover{
  background-color: #93efc6;
  color: gray;
}
.LBtnGroup{
  border: #8DD3BB solid 1px;
  width: 160px;
  height: 56px;
  background-color: white;
}
.LBtnGroup:hover{
  background-color: #D9D9D9;
}
.hr-sect {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.25);
  font-size: 15px;
  margin: 8px 0px;
}
.hr-sect::before,
.hr-sect::after {
  content: "";
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.25);
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 16px;
}
.NSelectPicBtn{
  display: flex;
  position: relative;
  border: none;
  width: 10px;
  height: 10px;
  border-radius: 10px;
}
.SelectPicBtn{
  display: flex;
  position: relative;
  width: 32px;
  height: 10px;
  border-radius: 5px;
  background-color: #8DD3BB;
  border: none;
}

#PicBtnBoxes{
  display: flex;
  position: relative;
  width: 616px;
  height: 58px;
  right: 332px;
  margin: 758px 0 0 0;
  justify-content: center;
}

</style>