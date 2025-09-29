<script >
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import {aTeamApi} from "@/util/axios";
export default{
  components: {HeaderComponent},
  data(){
    return{
      ProfileName: {},
      ProfileEmail: {},
    };
  },
  async mounted() {
    const res = await aTeamApi.get('/api/users/me/profileAll');
    const data = res.data;
    console.log('data >>> ', data);
    this.hotels = data || [];
    this.ProfileName = data.content.userName;
    this.ProfileEmail = data.content.email;
  }
}

</script>

<template>
  <HeaderComponent/>
  <div id ="accountImgMain">
    <img src="../../assets/AcoountCoverDefault.jpg" id="CoverImg">
    <button type="button" id = "accountImgUpload"><img src="../../assets/AcoountUploadImgIcon.png"><a>upload new cover</a></button>
  </div>
  <div id = "accountProfile">
    <div id = "accountProfileMain">
      <div id="AccountProfileImg">
        <div id="ProfileImgModify"><img src="../../assets/Pencil.png"></div>
      </div>
      <div id ="AccountProfileMainT">
        <h3>{{ ProfileName }}</h3>
        <a>{{ ProfileEmail }}</a>
      </div>
    </div>
  </div>

</template>

<style >
#accountImgMain{
  display: flex;
  position: relative;
  justify-content: space-between;
  margin: 105px auto 0px;
  width: 1232px;
  overflow: hidden;
}

#CoverImg{
  display: flex;
  object-fit: cover;
  width: 1232px;
  height: 350px;
}
#accountImgUpload{
  display: flex;
  position: absolute;
  width: 180px;
  height: 48px;
  margin: 276px 26px 26px 1026px;
  background-color: #8DD3BB;
  border: none;
}
#accountImgUpload a{
  display: flex;
  position: relative;
  align-items: center;
  margin: 0 auto 0 2px;
}

#accountImgUpload img {
  display: flex;
  position: relative;
  align-items: center;
  margin: auto 0 auto auto;
  width: 16px;
  height: 13px;
}
#ProfileImgModify{
  display: flex;
  width: 44px;
  height: 44px;
  border-radius: 44px;
  background-color: #FF8682;
  margin: 111px 0 0 111px;
}
#ProfileImgModify img {
  margin: auto;
  width: 18px;
  height: 18px;

}
#AccountProfileMainT h3 {
  display: flex;
  position: relative;
  justify-content: center;
  margin-bottom: 8px;
}
#AccountProfileImg{
  width: 160px;
  height: 160px;
  background-color: gray;
  border: #FF8682 solid 4px;
  border-radius: 160px;
  margin: 0 auto 24px;
}
#accountProfile{
  display: flex;
  position: relative;
  margin: -75px auto 0 ;
  width: 1232px;
  height: 241px;

}
#accountProfileMain{
  margin: 0 auto;
  width: 204px;
  height: 241px;
}
</style>