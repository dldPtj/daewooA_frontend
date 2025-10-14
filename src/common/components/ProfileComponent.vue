<script >
import HeaderComponent from "@/common/components/HeaderComponent.vue";
import {aTeamApi} from "@/util/axios";

export default{
  components: {HeaderComponent},
  data(){
    return{
      profileModal : false,
      profileName: {},
      profileEmail: {},
      profileImg: {},
      backgroundImg: {},
      uploadFileImg: null,
    };
  },
  methods: {
    setFile(e){
        this.uploadFileImg = e.target.files[0];
    },
    async uploadFile(){
      const formData = new FormData();
      formData.append("image", this.uploadFileImg);
      try{
        const res = await aTeamApi.put('/api/users/me/background-image',formData,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }).then(()=>{
          alert("이미지 업로드 성공");
          window.location.reload();
        });
        console.log(res.data);

      }catch (e){
        console.error(e);
      }

    },
    profileModalOpen() {
      this.profileModal = !this.profileModal
    },
    profileModalClose() {
      if (this.profileModal === true) {
        this.profileModal = false;
      }
    },
  },
  watch: {
    profileModal: function (val) {
      if (val) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  async mounted() {
    const res = await aTeamApi.get('/api/users/me/profileAll');
    const data = res.data;
    console.log('data >>> ', data);
    this.hotels = data || [];
    this.profileName = data.content.userName;
    this.profileEmail = data.content.email;
    this.profileImg = data.content.imageUrl;
    this.backgroundImg = data.content.backGroundImageUrl;

  },
  computed: {
    accountImageUrl() {
      const baseUrl = process.env.VUE_APP_API_URL; // 환경변수 사용
      return this.profileImg
          ? `${baseUrl}${this.profileImg}`
          : "";
    },
    accountBackImgUrl(){
      const baseUrl = process.env.VUE_APP_API_URL; // 환경변수 사용
      return this.backgroundImg
          ? `${baseUrl}${this.backgroundImg}`
          : "../../assets/AcoountCoverDefault.jpg";
    }
  },

}

</script>

<template>
  <HeaderComponent/>
  <div id ="accountImgMain">
    <img :src="accountBackImgUrl" id="CoverImg">
    <button type="button" id = "accountImgUpload" @click="profileModalOpen"><img src="../../assets/AcoountUploadImgIcon.png"><a>upload new cover</a></button>

  </div>
  <div id = "accountProfile">
    <div id = "accountProfileMain">
      <div id="AccountProfileImg">
        <img :src="accountImageUrl" class="accountImgSize">
        <div id="ProfileImgModify"><img src="../../assets/Pencil.png"></div>
      </div>
      <div id ="AccountProfileMainT">
        <h3>{{ profileName }}</h3>
        <a>{{ profileEmail }}</a>
      </div>
    </div>
  </div>
  <div class="AccountModalWrap" v-show="profileModal">
    <div class="ACModalContainer">
      <!--      취소 버튼-->
      <img src="../../assets/ModalClose.png" alt="취소 사진" @click="profileModalClose" class="ModalCloseBtn">
      <h1>파일 업로드</h1>
      <form @submit.prevent="uploadFile">
        <div>
          <fieldset class="fieldModal">
           <legend class="LegendLogin">파 일</legend>
            <!--          파일 넣는 곳-->
            <input type="file"  class="LTextBox" @change="setFile">
          </fieldset>
        </div>
        <!--      클릭시 수정 완료-->
        <button type="submit" class="ModalBtnStyle" >업로드</button>
      </form>
    </div>
  </div>

</template>

<style >
.accountImgSize{
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}
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
  width: 100%;
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
  z-index: 2;
}
#accountImgUpload:hover{
  background-color: #9e9a9a;
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
  margin: -39px 0 0 111px;
  z-index: 3;
  position: absolute;
}
#ProfileImgModify:hover{
  background-color: #9e9a9a;
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