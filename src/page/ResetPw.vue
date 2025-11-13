<script>
import LoginImg1 from '../assets/LoginImg1.jpg'
import LoginImg2 from '../assets/LoginImg2.jpg'
import {reactive} from "vue";
import {aTeamApi} from "@/util/axios";
import router from "@/router";
import eyeoff from "@/assets/Eye off.png";
import eyeon from "@/assets/Eye.png";
import LoginImg3 from "@/assets/LoginImg3.jpg";

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
      timerId: null,
      eyeImg1: eyeoff,
      eyeImg2: eyeoff,
      viewPassword: 'password',
      viewConPassword: 'password',
    };
  },
  async mounted() {
    this.timerId = setInterval(this.TtoCIMG, 10000);
  },
  beforeUnmount() {
    clearInterval(this.timerId);
  },
  setup() {
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
        localStorage.removeItem("FindPwToken");
        await router.push("/loginpage");
      }).catch(() => {
        alert("비밀번호가 일치하지 않습니다.");
      });
    };
    return {state, submit};
  },

  methods: {
    changeEyeImg1() {
      if (this.eyeImg1 === eyeoff) {
        this.eyeImg1 = eyeon;
        this.changeInputType1();
      } else {
        this.eyeImg1 = eyeoff;
        this.changeInputType1();
      }
    },
    changeEyeImg2() {
      if (this.eyeImg2 === eyeoff) {
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
  <div id="LoginMain">
    <div class="LoginBox">
      <div class="LoginText">
        <h1>비밀번호 설정</h1>
        <br>
        <a class="PlsL">비밀번호 다시 설정하기</a>
      </div>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Create Password</legend>
        <input :type="viewPassword" placeholder="새로운 비밀번호를 입력하세요." class="LTextBox" id="userPw"
               v-model="state.form.newPassword" autocomplete = "off">
        <div id="eye-offBox">
          <img :src="eyeImg1" @click="changeEyeImg1" id="eye-off" alt="눈 감는 사진">
        </div>
      </fieldset>
      <fieldset class="fieldLogin">
        <legend class="LegendLogin">Enter Code</legend>
        <input :type="viewConPassword" placeholder="다시 한번 입력하세요." class="LTextBox" id="userPw"
               v-model="state.form.confirmPassword" autocomplete = "off">
        <div id="eye-offBox">
          <img :src="eyeImg2" @click="changeEyeImg2" id="eye-off" alt="눈 감는 사진">
        </div>
      </fieldset>
      <button @click="submit" id="LoginBtn">제출</button>
    </div>
    <div class="LoginImages">
      <transition name="fade">
        <img :src="loginImg" key="loginImg" style="width: 612px; height: 816px" class="LoginIMG" alt="로그인시 나오는 사진">
      </transition>
      <div class="PicBtnBoxes">
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#LoginMain {
  display: flex;
  justify-content: center;
}


.LoginBox {
  margin: auto 104px auto auto;
  width: 512px;
  height: 593px;
}

.LoginText {
  text-align: left;
  margin-bottom: 48px;
}

.PlsL {
  color: #112211;
}



.LegendLogin {
  text-align: left;
}

.fieldLogin {
  display: flex;
  margin-bottom: 24px;
  width: 512px;
  height: 56px;
  border-radius: 4px;
}

#LoginBtn {
  margin-bottom: 16px;
}


.LTextBox {
  display: flex;
  flex: 1;
  height: 30px;
  border: none;
  margin-left: 16px;
  background-color: white;
}

input.LTextBox:focus {
  outline: none;
}

#LoginBtn {
  width: 100%;
  height: 48px;
  background-color: #8DD3BB;
  border-radius: 4px;
  border: none;
  font-weight: bold;
}

#LoginBtn:hover {
  background-color: #93efc6;
  color: gray;
}


.NSelectPicBtn {
  display: flex;
  position: relative;
  border: none;
  width: 10px;
  height: 10px;
  border-radius: 10px;
}

.SelectPicBtn {
  display: flex;
  position: relative;
  width: 32px;
  height: 10px;
  border-radius: 5px;
  background-color: #8DD3BB;
  border: none;
}

#PicBtnBoxes {
  display: flex;
  position: relative;
  width: 616px;
  height: 58px;
  right: 332px;
  margin: 758px 0 0 0;
  justify-content: center;
}

</style>