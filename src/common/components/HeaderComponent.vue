<script >
import aTeamApi from "@/util/axios";

  export default {
    name : 'HeaderComponent',
    data(){
      return{
        profileName: {},
      };
    },
    async mounted() {
      const res = await aTeamApi.get('/api/users/me/profileAll');
      const data = res.data;
      console.log('data >>> ', data);
      this.hotels = data || [];
      this.profileName = data.content.userName;
    }
  }
</script>

<template>
  <div class="container">
    <nav class="nav-container">
      <!-- 왼쪽 -->
      <div class="item" @click="$router.push('/homepage')">
                <span>
                    <img src="../../assets/ion_bed.png" alt="침대 사진">
                    hotels
                </span>
      </div>
      <!-- 오른쪽 -->
      <div class="item">
        <div class="flex vertical-center">
          <!-- 오른쪽 첫번째 -->
          <img src="../../assets/heart.png" alt="하트 사진">
          <span>
                        찜하기
                    </span>
          |
          <!-- 오른쪽 두번째 -->
          <div class="circle " @click="$router.push('/account')">
            <div class="mini-circle">
              <div class="check"></div>
            </div>
          </div>
          <span>
                        {{ profileName }}
                    </span>
        </div>

      </div>
    </nav>

  </div>
</template>

<style >
.container{
  border: #42b983 solid 1px;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin: -61px auto;

  background-color: white;
  padding: 0 216px;
  height: 87px;

  box-shadow: 0px 2px 5px #d3d3d3;
  position: fixed;
  z-index: 5;




}

.item span {
  display: flex;
  gap: 4px;
}

.circle {
  width: 45px;
  height: 45px;
  background-color: #D9D9D9;
  border: 1px solid #000000;
  border-radius: 50%;
  position: relative;
}

.mini-circle {
  position: absolute;
  background-color: #FF8682;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  top: 33px;
  right: 1px;
}

.check {
  width: 6px;
  height: 3px;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
  transform: rotate(-45deg);
  position: absolute;
  top: 2px;
  left: 2px;
}

.flex {
  display: flex;
  gap: 10px;
}

.vertical-center {
  align-items: center;
}

img {
  object-fit: contain;
}
</style>