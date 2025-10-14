<script>
import LoginImg1 from '../assets/LoginImg1.jpg'
import LoginImg2 from '../assets/LoginImg2.jpg'
import { reactive } from "vue";
import {aTeamApi} from "@/util/axios";
import router from "@/router";
export default {
  data() {
    return {
      loginImg: LoginImg1,
      loginImgBtn1: LoginImg1,
      loginImgBtn2: LoginImg2,
      changeLBtn1: true,
      changeLBtn2: false,
      timerId : null,
    };
  },
  async mounted() {
    this.timerId = setInterval(this.TtoCIMG, 10000);


  },
  setup(){
    const state = reactive({
      form: {
        newPassword: "",
        confirmPassword: ""
      },
    });
    const submit = async () => {
      const forgotPwObj = {
        newPassword: state.form.newPassword,
        confirmPassword: state.form.confirmPassword,
      };
      await aTeamApi.post('/api/auth/reset-password', forgotPwObj,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("FindPwToken")}`
            }
          }
      ).then(async () => {
        alert("비밀번호가 수정 되었습니다.");
        await router.push("/");
      }).catch(()=> {
          alert("비밀번호가 일치하지 않습니다.");
      });
    };
    return { state, submit };
  },

  methods: {
    changeLoginImg(img){
      if(img === this.loginImgBtn1){
        this.loginImg = LoginImg1;
      }else {
        this.loginImg = LoginImg2;
      }
    },
    changLBtn(btn){
      if(btn === this.changeLBtn2){
        this.changeLBtn2 = true;
        this.changeLBtn1 = false;
      }else if(btn === this.changeLBtn1){
        this.changeLBtn1 = true;
        this.changeLBtn2 = false;
      }
    },
    TtoCIMG(){
      if(this.loginImg === LoginImg1){
        this.loginImg = LoginImg2;
        this.changeLBtn2 = true;
        this.changeLBtn1 = false;
      }else if(this.loginImg === LoginImg2){
        this.loginImg = LoginImg1;
        this.changeLBtn1 = true;
        this.changeLBtn2 = false;
      }
    },
  }

};
</script>

<template>
  <div id = "LoginMain">
    <div class="LoginBox">
      <div class="LoginText">
        <h1>비밀번호 설정</h1>
        <br>
        <a class="PlsL">비밀번호 다시 설정하기</a>
      </div>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Create Password</legend>
        <input type="password" placeholder="새로운 비밀번호를 입력하세요." class="LTextBox" id="userPw" v-model="state.form.newPassword">
      </fieldset>
      <fieldset class="fieldLogin">
      <legend class="LegendLogin">Enter Code</legend>
      <input type="password" placeholder="다시 한번 입력하세요." class="LTextBox" id="userPw" v-model="state.form.confirmPassword">
    </fieldset>
      <button @click="submit" id="LoginBtn">제출</button>
    </div>
    <div class="LoginImages">
      <transition name="fade-in">
        <img :src="loginImg" style="width: 612px; height: 816px" class="LoginIMG" alt="로그인시 나오는 사진">
      </transition>
      <div id = "PicBtnBoxes">
         <span style="margin-right: 8px">
          <button type="button" @click ="changeLoginImg(loginImgBtn1), changLBtn(changeLBtn1)" class="NSelectPicBtn" :class="{'SelectPicBtn': changeLBtn1}"  ></button>
         </span>
        <span style="margin-right: 8px">
          <button type="button" @click="changeLoginImg(loginImgBtn2), changLBtn(changeLBtn2)" class="NSelectPicBtn" :class="{'SelectPicBtn': changeLBtn2}" ></button>
         </span>
        <span style="margin-right: 8px">
          <button type="button" class="NSelectPicBtn"></button>
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
.LoginImages{
  display: flex;
  justify-content: space-between;
  margin: auto auto auto 0;
  width: 616px;
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



.LoginIMG{
  width: 618px;
  height: 816px;
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