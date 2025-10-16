<script>
import eyeoff from '../assets/Eye off.png'
import eyeon from '../assets/Eye.png'
import LoginImg1 from '../assets/LoginImg1.jpg'
import LoginImg2 from '../assets/LoginImg2.jpg'
import { reactive } from "vue";
import {aTeamApi} from "@/util/axios";
import router from "@/router";
export default {
  data() {
    return {
      eyeImg : eyeoff,
      loginImg: LoginImg1,
      loginImgBtn1: LoginImg1,
      loginImgBtn2: LoginImg2,
      changeLBtn1: true,
      changeLBtn2: false,
      timerId : null,
      viewPassword : 'password',
    };
  },
  async mounted() {
    this.timerId = setInterval(this.TtoCIMG, 10000);


  },
  setup(){
    const state = reactive({
      form: {
        userEmail: "",
        userPw: "",
      },
    });
    const submit = async () => {
      const loginObj = {
        email: state.form.userEmail,
        password: state.form.userPw,
      };
      await aTeamApi.post('/api/auth/login', loginObj).then(async (res) => {
        alert("로그인 성공");
        await router.push("/");
        let token = res.data.content.accessToken;
        localStorage.setItem("token", token);
      }).catch((error)=> {
        if (error.response?.status === 500) {
          alert("아이디와 비밀번호가 일치 하지 않습니다. 다시 로그인 해주세요.");
        } else  {
          alert("정보를 가져오는데 실패했습니다.");
        }
      });
    };
    return { state, submit };
  },

  methods: {
    changeEyeImg(){
      if(this.eyeImg === eyeoff){
        this.eyeImg = eyeon;
        this.changeInputType();
      } else {
        this.eyeImg = eyeoff;
        this.changeInputType();
      }
    },
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
    changeInputType(){
      if(this.viewPassword === 'password'){
        this.viewPassword = 'text';
      }else{
        this.viewPassword = 'password';
      }
    },
  }

};
</script>

<template>
  <div id = "LoginMain">
    <div class="LoginBox">
      <div class="LoginText">
        <h1>Login</h1>
        <br>
        <a class="PlsL"> 로그인해주세요</a>
      </div>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">이메일</legend>
        <input type="email" placeholder="이메일을 입력하세요." value="" class="LTextBox" id="userEmail" v-model="state.form.userEmail">
      </fieldset>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Password</legend>
        <input :type="viewPassword" placeholder="비밀번호를 입력하세요." value="" class="LTextBox" id="userPw" v-model="state.form.userPw" autocomplete = "off">
        <div id = "eye-offBox">
          <img :src="eyeImg" @click = "changeEyeImg" id ="eye-off" alt="눈 감는 사진">
        </div>
      </fieldset>
      <div id = "PwdLine">
        <span id="LoginCheckboxLine">
        <input type="checkbox" class ="LoginCheckbox">  비밀번호 기억하기
        </span>
        <router-link to="/findpw" class = "FPwd">Forgot Password</router-link>
      </div>
      <button @click="submit" id="LoginBtn">Login</button>
      <div id = "SignUpLink">
        <router-link to="/signup" class="SignUpBtn">회원가입</router-link>
      </div>
      <div class="hr-sect">
        Or link with
      </div>
      <div id ="LoginIconBoxes">
        <button type="button" id ="fBtn" class="LBtnGroup"><img src="../assets/facebookLogin.png"></button>
        <button type="button" id = "GBtn" class="LBtnGroup"><img src="../assets/googleLogin.png"></button>
        <button type="button" id = "ABtn" class="LBtnGroup"><img src="../assets/appleLogin.png"></button>
      </div>
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
#PwdLine{
  margin-bottom: 40px;
  display: flex;
}
#LoginBtn{
  margin-bottom: 16px;
}
#SignUpLink{
  margin-bottom: 40px;
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
#eye-off{
  width: 24px;
  height: 24px;
}
#eye-offBox{
  width: 48px;
  height: 48px;
  float: right;
  display: flex;
  justify-content: center;
}
#LoginCheckboxLine{
  margin-right: 224px;
}
.LoginCheckbox{
  width: 18px;
  height: 18px;
  border: black solid 2px;
  position: relative;
  top: 3px;
}
.FPwd{
  color: #FF8682;
  text-decoration: none;
}
.FPwd:hover{
  color: #e0605d;
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
.SignUpBtn{
  text-decoration: none;
  color: black;
}
.SignUpBtn:hover{
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