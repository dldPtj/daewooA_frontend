<script>
export default {
  methods:{
    clicked(path){
      this.$router.push(path);
    }
  }
}
</script>

<template>
  <div class="ChangeAccountMenu">
    <button type="button" class="NOselectAcPage" @click="clicked('/account')" :class="{active: $route.path === '/account'}">계정</button>
    <a class="OtherLine"></a>
    <button type="button" class="NOselectAcPage" @click="clicked('/reservation')" :class="{active: $route.path === '/reservation'}">내역</button>
    <a class="OtherLine"></a>
    <button type="button" class="NOselectAcPage" @click="clicked('/paymentadd')" :class="{active: $route.path === '/paymentadd'}">결제수단</button>
  </div>
</template>

<style>
.ChangeAccountMenu {
  box-shadow: 0px 2px 5px #d3d3d3;
  display: flex;
  position: relative;
  margin: 32px auto 0;
  width: 1232px;
  height: 80px;
  justify-content: center;
}

.NOselectAcPage {
  text-align: left;
  font-weight: bold;
  margin: 0 180px 0 18px;
  width: 215px;
  height: 100%;
  border: none;
  background-color: white;
}
.NOselectAcPage.active{
  border-bottom: #8DD3BB solid 4px;
}

.NOselectAcPage:hover {
  border-bottom: #8DD3BB solid 4px;
}

</style>