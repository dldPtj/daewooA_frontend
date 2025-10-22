<script>

import logoutHeaderComponent from "@/common/components/LogoutHeaderComponent.vue";
import LoginHeaderComponent from "@/common/components/LoginHeaderComponent.vue";

export default {
  components: {
    logoutHeaderComponent: logoutHeaderComponent,
    LoginHeaderComponent : LoginHeaderComponent,
  },
  data() {
    return {
      token: localStorage.getItem('token'),

    };
  },
  async mounted() {
    window.addEventListener("token-changed", this.updateToken);
  },
  beforeUnmount() {
    window.removeEventListener("token-changed", this.updateToken);
  },
  methods:{
    updateToken(){
      this.token = localStorage.getItem("token");
    }
  }
};
</script>

<template>
  <LoginHeaderComponent v-if="token"/>
  <logoutHeaderComponent v-else/>
</template>

<style>

</style>