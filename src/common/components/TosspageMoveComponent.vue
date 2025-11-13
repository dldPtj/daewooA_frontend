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
 <button type="button" id="MoveTossPage" @click="goToToss"><div><img src="../../assets/tossImg.png"> <a>결제페이지로 이동하기</a></div></button>
</template>

<style >
#MoveTossPage{
  display: flex;
  background: white;
  border: #8DD3BB solid 3px;
  justify-content: center;
  text-align: left;
  padding: 16px;
  border-radius: 12px;
  margin: 0 auto;
  width: 758px;
  height: 80px;
}
#MoveTossPage div {
  display: flex;
  justify-content: center;
}

#MoveTossPage div a{
  margin: auto 0;
  font-family: Montserrat;
  font-weight: bold;
  font-size: 12px;
  line-height: 100%;
}
#MoveTossPage:hover{
  background-color: #8DD3BB;
}
#MoveTossPage:active{
  background-color: #6acd97;
}
#MoveTossPage img {
  display: flex;
}
</style>