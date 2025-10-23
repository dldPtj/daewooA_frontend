<script >
export default {
  methods:{
    goToToss(){
      window.location.href = '/check.html';
    }
  }
}
</script>

<template>
 <button type="button" id="MoveTossPage" @click="goToToss"><img src="../../assets/tossImg.png"> </button>
</template>

<style >
#MoveTossPage{
  display: flex;
  background: white;
  border: #8DD3BB solid 1px;
  justify-content: center;
  text-align: left;
  padding: 16px;
  border-radius: 12px;
  margin: 0 auto;
  width: 758px;
  height: 80px;
}
#MoveTossPage:hover{
  background: #b6b2b2;
  border: black solid 1px;
  box-shadow: 0px 0px 8px #000000;
}
#MoveTossPage:active{
  background: #9e9a9a;
}
#MoveTossPage img {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>