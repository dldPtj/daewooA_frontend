<script>
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import ProfileComponent from "@/common/components/ProfileComponent.vue";
import AddCardComponent from "@/common/components/AddCardComponent.vue";
export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    ProfileComponent: ProfileComponent,
    AddCardComponent: AddCardComponent,
  },

}
</script>

<template>
  <header-component/>
  <ProfileComponent/>
  <div class="ChangeAccountMenu">
    <button type="button" class="NOselectAcPage"  @click="$router.push('/account')">계정</button>
    <a class="OtherLine"></a>
    <button type="button" class="NOselectAcPage" @click="$router.push('/reservation')">내역</button>
    <a class="OtherLine"></a>
    <button type="button" class="selectAcPage" @click="$router.push('/paymentadd')">결제수단</button>
  </div>
  <div id = "PaymentPageMain">
    <h1>결제 수단</h1>
    <div id = "PaymentPageList">
      <AddCardComponent/>
      <button type="button" class = "CardsList">
        <div id="cardListTop">
          <div id="cardPw">**** **** ****
            <div>
              1234
            </div>
          </div>
          <img src="../assets/Bin.png">
        </div>

        <div class="vailThru">
          <span>
            Valid Thru
            <div>02/27</div>
          </span>
          <img src="../assets/visaImg.png">
        </div>
      </button>
    </div>
  </div>


  <FooterComponent/>
</template>

<style >
#cardListTop{
  display: flex;
  justify-content: space-between;
  height: 61px;
  margin-bottom: 60px;
}
#cardListTop img {
  display: flex;
  width: 24px;
  height: 24px;
}
#cardPw{
  display: flex;
  flex-direction: column;
}
#cardPw div{
  text-align: left;
}
.vailThru{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 61px;
}
.vailThru span{
  height: 39px;
  display: flex;
  flex-direction: column;
  margin: auto 0;
}
.vailThru img{
  display: flex;
  margin: auto 0;
  width: 52px;
  height: 32px;
}


.CardsList{
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 378px;
  height: 212px;
  background-color: #8DD3BB;
  border: none;
}
#PaymentPageList{
  display: flex;
  box-shadow: 0px 4px 16px 0px #1122110D;
  width: 1232px;
  height: fit-content;
  border: #FF8682 solid 1px;
  margin-top: 16px;
  padding: 24px 24px 24px 24px;
  gap: 22px;
  flex-wrap: wrap;
}
#PaymentPageMain{
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  width: 1232px;
  height: fit-content;
  border: #FF8682 solid 1px;
  margin: 40px auto 119px;
}
</style>