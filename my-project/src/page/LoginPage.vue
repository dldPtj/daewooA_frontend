<script>
import eyeoff from '../assets/Eye off.png'
import eyeon from '../assets/Eye.png'
import LoginImg1 from '../assets/LoginImg1.jpg'
import LoginImg2 from '../assets/LoginImg2.jpg'
  export default {
    data() {
      return {
        eyeImg : eyeoff,
        LoginImg: LoginImg1,
        LoginImgBtn1: LoginImg1,
        LoginImgBtn2: LoginImg2,
        ChangeLBtn1: true,
        ChangeLBtn2: false,
        TimerId : null
      };
    },
    mounted() {
      this.TimerId = setInterval(this.TtoCIMG, 10000);
    },
    methods: {
      changeEyeImg(){
        if(this.eyeImg === eyeoff){
          this.eyeImg = eyeon;
        } else {
          this.eyeImg = eyeoff;
        }
      },
      changeLoginImg(img){
        if(img === this.LoginImgBtn1){
          this.LoginImg = LoginImg1;
        }else {
          this.LoginImg = LoginImg2;
        }
      },
      changLBtn(btn){
        if(btn === this.ChangeLBtn2){
            this.ChangeLBtn2 = true;
            this.ChangeLBtn1 = false;
        }else if(btn === this.ChangeLBtn1){
          this.ChangeLBtn1 = true;
          this.ChangeLBtn2 = false;
        }
      },
      TtoCIMG(){
        if(this.LoginImg === LoginImg1){
          this.LoginImg = LoginImg2;
          this.ChangeLBtn2 = true;
          this.ChangeLBtn1 = false;
        }else if(this.LoginImg === LoginImg2){
          this.LoginImg = LoginImg1;
          this.ChangeLBtn1 = true;
          this.ChangeLBtn2 = false;
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
          <input type="email" placeholder="이메일을 입력하세요." class="LTextBox">
        </fieldset>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Password</legend>
        <input type="password" placeholder="비밀번호를 입력하세요." class="LTextBox">
        <div id = "eye-offBox">
          <img :src="eyeImg" @click = "changeEyeImg" id ="eye-off" alt="눈 감는 사진">
        </div>
      </fieldset>
      <div id = "PwdLine">
        <span id="LoginCheckboxLine">
        <input type="checkbox" class ="LoginCheckbox">  비밀번호 기억하기
        </span>
        <router-link to="/" class = "FPwd">Forgot Password</router-link>
      </div>
        <button type="button" id="LoginBtn">Login</button>
      <div id = "SignUpLink">
        <router-link to="/" class="SignUpBtn">회원가입</router-link>
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
         <img :src="LoginImg" style="width: 612px; height: 816px" class="LoginIMG" alt="로그인시 나오는 사진">
        </transition>
        <div id = "PicBtnBoxes">
         <span style="margin-right: 8px">
          <button type="button" @click ="changeLoginImg(LoginImgBtn1), changLBtn(ChangeLBtn1)" class="NSelectPicBtn" :class="{'SelectPicBtn': ChangeLBtn1}"  ></button>
         </span>
         <span style="margin-right: 8px">
          <button type="button" @click="changeLoginImg(LoginImgBtn2), changLBtn(ChangeLBtn2)" class="NSelectPicBtn" :class="{'SelectPicBtn': ChangeLBtn2}" ></button>
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

 .fade-in-enter-active,
 .fade-in-leave-active{
    transition: opacity 0.5s ease;
  }
 .fade-in-enter-from,
 .fade-in-leave-to{
   opacity: 0;
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
  margin-right: 230px;
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