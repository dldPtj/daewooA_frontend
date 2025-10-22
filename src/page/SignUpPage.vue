<script>
import LoginImg1 from '../assets/LoginImg1.jpg'
import LoginImg2 from '../assets/LoginImg2.jpg'
import eyeoff from "@/assets/Eye off.png";
import eyeon from "@/assets/Eye.png";
import {reactive} from "vue";
import {aTeamApi} from "@/util/axios";
import router from "@/router";
export default {
  data(){
    return{
      eyeImg1 : eyeoff,
      eyeImg2 : eyeoff,
      loginImg: LoginImg1,
      loginImgBtn1: LoginImg1,
      loginImgBtn2: LoginImg2,
      timerId : null,
      changeLBtn1: true,
      changeLBtn2: false,
      viewPassword: 'password',
      viewConPassword : 'password',
    };
  },
  setup() {
    const state = reactive({
      form: {
        signEmail: "",
        signPw: "",
        signName: "",
        signPhNum: "",
        confirmPw: "",
      },
    });
    const submit = async () => {
      const signObj = {
        email: state.form.signEmail,
        password: state.form.signPw,
        userName: state.form.signName,
        phoneNumber: state.form.signPhNum,
      };
      if(state.form.signPw === state.form.confirmPw){
        await aTeamApi.post('/api/auth/signup', signObj).then(async () => {
          alert("회원 가입 성공");
          await router.push("/loginpage");
        }).catch((error)=> {
          if (error.response?.status === 500) {
            alert("아이디와 비밀번호가 일치 하지 않습니다. 다시 로그인 해주세요.");
          } else  {
            alert("정보를 가져오는데 실패했습니다.");
          }
        });
      }
      else if(state.form.signEmail == null || state.form.signPw == null || state.form.signName == null || state.form.signPhNum == null){
       alert("입력되지 않은 정보가 있습니다. 모든 정보를 입력해주세요.");
      }
      else{
        alert("입력 하신 비밀번호가 정보가 일치 하지 않습니다. 비밀번호를 다시 입력하세요.");
      }
    };
    return { state, submit };
  },
  async mounted() {
    this.timerId = setInterval(this.TtoCIMG, 10000);
  },
  methods: {
    changeEyeImg(){
      if(this.eyeImg1 === eyeoff){
        this.eyeImg1 = eyeon;
        this.changeInputType1();
      } else {
        this.eyeImg1 = eyeoff;
        this.changeInputType1();
      }
    },

    changeEyeImg2(){
      if(this.eyeImg2 === eyeoff){
        this.eyeImg2 = eyeon;
        this.changeInputType2();
      } else {
        this.eyeImg2 = eyeoff;
        this.changeInputType2();
      }
    },
    changeInputType1() {
      if (this.viewPassword === 'password') {
        this.viewPassword = 'text';
      } else {
        this.viewPassword = 'password';
      }
    },
    changeInputType2() {
      if (this.viewConPassword === 'password') {
        this.viewConPassword = 'text';
      } else {
        this.viewConPassword = 'password';
      }
    },

    changeLoginImg(img){
      if(img === this.loginImgBtn1){
        this.loginImg = LoginImg1;
      }else if (img === this.loginImgBtn2){
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
}
</script>

<template>
  <div id = "SignUpMain">
    <div class="SignUpImages">
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
    <div class="SignUpBox">
      <div class="SignUpText">
        <h1>Sign up</h1>
        <br>
        <a class="PlsL"> 회원가입</a>
      </div>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Name</legend>
        <input type="text" placeholder="이름을 입력하세요." value="" class="LTextBox" id="userName" v-model="state.form.signName">
      </fieldset>
      <div id="half">
        <fieldset class="fieldModalHalf">
          <legend class="LegendLogin">Email</legend>
          <input type="email" placeholder="이메일을 입력하세요." class="LTextBox" id="signEmail" v-model="state.form.signEmail">
        </fieldset>
        <fieldset class="fieldModalHalf">
          <legend class="LegendLogin">Phone Number</legend>
          <input type="text" placeholder="전화번호를 입력하세요." class="LTextBox" id="signPhNum" v-model="state.form.signPhNum">
        </fieldset>
      </div>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Password</legend>
        <input :type="viewPassword" placeholder="비밀번호를 입력하세요." value="" class="LTextBox" id="signPw" v-model="state.form.signPw" autocomplete = "off">
        <div id = "eye-offBox">
          <img :src="eyeImg1" @click = "changeEyeImg" id ="eye-off" alt="눈 감는 사진">
        </div>
      </fieldset>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Confirm Password</legend>
        <input :type="viewConPassword" placeholder="비밀번호를 한번더 입력하세요." value="" class="LTextBox" id="userPw" v-model="state.form.confirmPw" autocomplete = "off">
        <div id = "eye-offBox">
          <img :src="eyeImg2" @click = "changeEyeImg2" id ="eye-off" alt="눈 감는 사진">
        </div>
      </fieldset>
      <div id = "AgreeLine">
        <span id="AgreeCheckboxLine">
        <input type="checkbox" class ="AgreeCheckbox">  동의 하기
        </span>
      </div>
      <button @click="submit" id="LoginBtn">계정 생성</button>
      <div id = "SignUpLink">
        <router-link to="/signup" class="SignUpBtn">회원가입</router-link>
      </div>
      <div class="hr-sect">
        Or link with
      </div>
      <div id ="LoginIconBoxes">
        <button type="button" id ="fBtn" class="LBtnGroup"><img src="../assets/Naver.png"></button>
        <button type="button" id = "GBtn" class="LBtnGroup"><img src="../assets/googleLogin.png"></button>
        <button type="button" id = "ABtn" class="LBtnGroup"><img src="../assets/Kakao.png"></button>
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
#SignUpMain{
  display: flex;
  justify-content: center;
}
.SignUpImages{
  display: flex;
  margin: auto 104px  auto auto;
  width: 616px;
}

.SignUpBox{
  justify-content: space-between;
  margin: auto auto auto 0;

  width: 512px;
}
.SignUpText{
  text-align: left;
  margin-bottom: 48px;
}
.PlsL {
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
#AgreeLine{
  display: flex;
  margin-bottom: 40px;
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
#AgreeCheckboxLine{
  margin-right: 230px;
}
.AgreeCheckbox{
  width: 18px;
  height: 18px;
  border: black solid 2px;
  position: relative;
  top: 3px;
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
  flex-basis: 0%;
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