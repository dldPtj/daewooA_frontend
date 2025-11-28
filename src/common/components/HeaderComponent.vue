<script>

import logoutHeaderComponent from "@/common/components/LogoutHeaderComponent.vue";
import LoginHeaderComponent from "@/common/components/LoginHeaderComponent.vue";
import aTeamApi from "@/util/axios";

export default {
  components: {
    logoutHeaderComponent: logoutHeaderComponent,
    LoginHeaderComponent : LoginHeaderComponent,
  },
  data() {
    return {
      token: localStorage.getItem('token'),
      profile: {},
      changeComponent: false,
    };
  },
  async mounted() {
    window.addEventListener("token-changed", this.updateToken);
    if(this.isUserLoggedIn){
      const res = await aTeamApi.get('/api/users/me/profileAll', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).catch((error)=>{
      if(error.response?.status === 302){
        this.changeComponent = true;
        alert("찾지 못함");
      }
      })
      this.profile = res.data.content.userId;
      if(this.profile === null){
        this.changeComponent = true;
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener("token-changed", this.updateToken);
  },
  methods:{
    updateToken(){
      this.token = localStorage.getItem("token");
    },
    async err302(data){
      if(data === true){
        this.changeComponent = true;

      }
    }
  },
  computed: {
    isUserLoggedIn() {
      // 'token'은 사용자가 로그인 시 저장하는 토큰의 키 이름으로 가정합니다.
      return !!localStorage.getItem('token');
    },
  },
  watch:{
    err302(){

    }
  }

};
</script>

<template>
  <LoginHeaderComponent v-if="this.changeComponent === false" @err302="err302"/>
  <logoutHeaderComponent v-else-if="this.changeComponent === true"/>
</template>

<style>

</style>