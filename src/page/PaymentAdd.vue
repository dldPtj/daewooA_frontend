<script>
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import ProfileComponent from "@/common/components/ProfileComponent.vue";
import AddCardComponent from "@/common/components/AddCardComponent.vue";
import CardComponent from "@/common/components/CardComponent.vue";
import aTeamApi from "@/util/axios";
export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    ProfileComponent: ProfileComponent,
    AddCardComponent: AddCardComponent,
    CardComponent: CardComponent,
  },
  data(){
    return{
      cardData: {},
    }
  },
  async mounted() {
    const res = await aTeamApi.get('/api/users/me/payments');
    const data = res.data.content;
    console.log('data >>> ', data);
    this.cardData = data;
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
      <CardComponent v-for="(item, index) in cardData"
                     :key = "index"
                     :card-num-last="item.last4Digits"
                     :thru="item.expirationDate"/>
      <AddCardComponent/>
    </div>
  </div>


  <FooterComponent/>
</template>

<style >

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