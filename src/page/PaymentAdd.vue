<script>
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import FooterComponent from "@/common/components/FooterComponent.vue";
import ProfileComponent from "@/common/components/ProfileComponent.vue";
export default {
  components: {
    HeaderComponent: HeaderComponent,
    FooterComponent: FooterComponent,
    ProfileComponent: ProfileComponent,
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
        <button type="button" class = "AddNewCard">
          <div class="AddNewCardMain">
           <div class="PlusBtn">
              <a>+</a>
           </div>
           <span>Add a new card</span>
          </div>
        </button>
      <button type="button" class = "CardsList">
        <div class="AddNewCardMain">
          <div class="PlusBtn">
            <a>+</a>
          </div>
          <span>Add a new card</span>
        </div>
      </button>
    </div>
  </div>
  <FooterComponent/>
</template>

<style >
.AddNewCardMain{
  font-weight: bold;
}
.PlusBtn span{
  display: flex;
  width: 96px;
  height: 15px;
  margin: 0 auto;
}
.PlusBtn a{
  font-size: 39px;
  color: #8DD3BB;
  margin-bottom: 18px;
}
.PlusBtn{
  width: 48px;
  height: 48px;
  border: #8DD3BB solid 2px;
  border-radius: 48px;
  margin: 0 auto 10px;
}
.AddNewCard{
  display: flex;
  width: 378px;
  height: 212px;
  border: #8DD3BB dashed 2px;
  background-color: white;
  justify-content: center;
  align-items: center;
}

.CardsList{
  display: flex;
  width: 378px;
  height: 212px;
  background-color: #8DD3BB;
  justify-content: center;
  border: none;
  align-items: center;
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