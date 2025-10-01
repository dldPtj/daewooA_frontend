<script >
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import ProfileComponent from "@/common/components/ProfileComponent.vue";
import {aTeamApi} from "@/util/axios";
export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    ProfileComponent: ProfileComponent,
  },
  data(){
    return{
      aCModal : false,
      readOnlyName : true,
      readOnlyEmail: true,
      readOnlyPhonNum: true,
      readOnlyAddress: true,
      readOnlyBirth: true,
      accountData: {},
      name: {},
      email: {},
      phoneNumber: {},
      address: {},
      birth: {},
      styleName: {
        border: 'none',
      },
      styleEmail: {
        border: 'none',
      },
      stylePhone: {
        border: 'none',
      },
      styleAddr: {
        border: 'none',
      },
      styleBirth: {
        border: 'none',
      },
    };
  },
  methods:{
    aCModalOpen(){
      this.aCModal = !this.aCModal
    },
    aCModalClose(){
      if(this.aCModal === true){
        this.aCModal = false;
      }
    },
    async ReadOnlyOnOff(field, updateKey, updateValue, borderChage) {
      try {
        this[field] = !this[field];
        this[borderChage].border = 'black solid 1px';
        if (this[field] === true) {
          await aTeamApi.put("/api/users/me/profile-info", {
            [updateKey]: this[updateValue]
          })
              .then(() => alert(`${updateKey} 수정 완료!`))
          this[borderChage].border = 'none';
        }
      }catch (err){
        console.error(err);
      }
    }
  },
  watch: {
    aCModal: function(val) {
      if(val){
        document.body.style.overflow = 'hidden';
      }else{
        document.body.style.overflow = '';
      }
    }
  },
  async mounted() {
    try {
      const res =  await aTeamApi.get('/api/users/me/profile');
      const data = res.data.content;
      console.log('data >>> ', data);
      this.accountData = data || '';
      this.name = data.userName;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.address = data.address;
      this.birth = data.birthDate;
    }catch (err){
      console.error(err);
    }
  }
}
</script>

<template>
  <HeaderComponent/>
  <ProfileComponent/>
  <!--  프로필 아래 메뉴 선택 버튼 -->
  <div class="ChangeAccountMenu">
    <button type="button" class="selectAcPage"  @click="$router.push('/account')">계정</button>
    <a class="OtherLine"></a>
    <button type="button" class="NOselectAcPage" @click="$router.push('/reservation')">내역</button>
    <a class="OtherLine"></a>
    <button type="button" class="NOselectAcPage" @click="$router.push('/paymentadd')">결제수단</button>
  </div>
  <!--메뉴 선택시 나오는 화면 -->
  <div id = "AccountPageMain">
    <h1>Account</h1>
    <div id = "ACListStyle">
      <!--     이름 리스트 박스-->
      <div class = "AccountList">
        <div class="AccountListBox">
          <div class="ACDataBox">
            <a>Name</a>
            <!--          이름 정보가 저장되는 곳-->
            <div class="ACInsertData">
              <input type="text" v-model="name" :readonly="readOnlyName" :style="styleName">
            </div>
          </div>
          <!--클릭시 readonly해제-->
          <button type="button" @click="ReadOnlyOnOff('readOnlyName','userName','Name', 'styleName')" ><img src="../assets/AccountBtnImg.png">change</button>
        </div>
      </div>
      <!--     이메일 리스트 박스-->
      <div class = "AccountList">
        <div class="AccountListBox">
          <div class="ACDataBox">
            <a>Email</a>
            <div class="ACInsertData">
              <input type="email" v-model="email" :readonly="readOnlyEmail" :style="styleEmail">
            </div>
          </div>
          <button type="button" @click="ReadOnlyOnOff('readOnlyEmail','email','email', 'styleEmail')"><img src="../assets/AccountBtnImg.png">change</button>
        </div>
      </div>
      <!--     비밀번호 리스트 박스-->
      <div class = "AccountList">
        <div class="AccountListBox">
          <div class="ACDataBox">
            <a>Password</a>
            <div class="ACInsertData" id="ACPWData">
              <input type="password" value="sdsd2323232" readonly >
            </div>
          </div>
          <!--        버튼 클릭시 모달창 이동-->
          <button type="button" @click="aCModalOpen"><img src="../assets/AccountBtnImg.png">change</button>
        </div>
      </div>
      <!--    전화번호 리스트 박스-->
      <div class = "AccountList">
        <div class="AccountListBox">
          <div class="ACDataBox">
            <a>Phone number</a>
            <div class="ACInsertData">
              <input type=text v-model="phoneNumber" :readonly="readOnlyPhonNum" :style="stylePhone">
            </div>
          </div>
          <button type="button" @click="ReadOnlyOnOff('readOnlyPhonNum','phoneNumber','phoneNumber', 'stylePhone')"><img src="../assets/AccountBtnImg.png">change</button>
        </div>
      </div>
      <!--     주소 리스트 박스-->
      <div class = "AccountList">
        <div class="AccountListBox">
          <div class="ACDataBox">
            <a>Address</a>
            <div class="ACInsertData">
              <input type="text" v-model="address" :readonly="readOnlyAddress" :style="styleAddr">
            </div>
          </div>
          <button type="button" @click="ReadOnlyOnOff('readOnlyAddress','address','address', 'styleAddr')"><img src="../assets/AccountBtnImg.png">change</button>
        </div>
      </div>
      <!--     생일 리스트 박스-->
      <div class = "AccountList">
        <div class="AccountListBox">
          <div class="ACDataBox">
            <a>Date of birth</a>
            <div class="ACInsertData">
              <input type="text" v-model="birth" :readonly="readOnlyBirth" :style="styleBirth">
            </div>
          </div>
          <button type="button" @click="ReadOnlyOnOff('readOnlyBirth','birthDate','birth','styleBirth')"><img src="../assets/AccountBtnImg.png">change</button>
        </div>
      </div>
    </div>
  </div>
  <!--비밀번호 모달-->
  <div class="AccountModalWrap" v-show="aCModal">
    <div class="ACModalContainer">
      <!--      취소 버튼-->
      <img src="../assets/ModalClose.png" alt="취소 사진" @click="aCModalClose" class="ModalCloseBtn">
      <h1>비밀번호 수정</h1>
      <div>
        <fieldset class="fieldModal">
          <legend class="LegendLogin">비밀 번호</legend>
          <!--          수정할 이름 입력 하는곳-->
          <input type="text" placeholder="비밀번호를 입력하세요." class="LTextBox">
        </fieldset>
        <fieldset class="fieldModal">
          <legend class="LegendLogin">Password</legend>
          <!--          비밀번호 입력하는 곳-->
          <input type="password" placeholder="현재 비밀번호를 입력하세요." class="LTextBox">
        </fieldset>
      </div>
      <!--      클릭시 수정 완료-->
      <button type="button" class="ModalBtnStyle">수정</button>
    </div>
  </div>

  <FooterComponent/>
</template>

<style >

* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
.fieldModal{
  display: flex;
  margin-bottom: 24px;
  width: 460px;
  height: 56px;
  border-radius: 4px;
}
.ModalBtnStyle{
  width: 100%;
  height: 48px;
  background-color: #8DD3BB;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}
.AccountModalWrap{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 8;
}
.ACModalContainer{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 45px;
  box-sizing: border-box;
  z-index: 9;
}
.ACModalContainer h1{
  margin-bottom: 20px;
}
.ACModalContainer img {
  display: flex;
  position: relative;
  margin-left: 440px;
}
#ACListStyle{
  box-shadow: 0px 2px 5px #d3d3d3;
  padding-bottom: 1px;
}
.ACDataBox{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.ACInsertData{
  font-weight: bold;
  font-size: 20px;
}
.ACInsertData input {
  border: none;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;

}
.ACInsertData input:focus{
  outline: none;
}
.ACDataBox a{
  font-size: 16px;
  color: gray;
}
.AccountListBox{
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 1184px;
  height: 52px;
}
.AccountListBox button{
  width: 140px;
  height: 48px;
  background-color: white;
  border: #8DD3BB solid 1px;
  text-align: center;
}

.AccountListBox button:hover{
  background-color: #9e9a9a;
  border: #8DD3BB solid 1px;
}
.AccountListBox button img{
  margin-bottom: -2px;
  margin-right: 4px;
}
.AccountList{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 32px;
}
#AccountPageMain{
  text-align: left;
  width: 1232px;
  height: 593px;
  margin: 40px auto 119px;
}
#AccountPage h1{
  margin-bottom: 48px;
}
.selectAcPage{
  text-align: left;
  font-weight: bold;
  margin: 0 180px 0 18px;
  width: 215px;
  height: 100%;
  border: none;
  background-color: white;
  border-bottom: #8DD3BB solid 4px;
}
.NOselectAcPage{
  text-align: left;
  font-weight: bold;
  margin: 0 180px 0 18px;
  width: 215px;
  height: 100%;
  border: none;
  background-color: white;
}
.ChangeAccountMenu {
  box-shadow: 0px 2px 5px #d3d3d3;
  display: flex;
  position: relative;
  margin: 32px auto 0;
  width: 1232px;
  height: 80px;
  justify-content: center;
}
.OtherLine{
  width: 48px;
  height: 0;
  transform: rotate(-90deg);
  border: #D7E2EE solid 1px;
  margin: 35px -15px;
}
</style>