<script>
import aTeamApi from "@/util/axios";


export default {
  name: 'HeaderComponent',
  data() {
    return {
      profileName: {},
      profileImg: {},
      menuModal: false,
    };
  },
  async mounted() {
    const res = await aTeamApi.get('/api/users/me/profileAll',{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = res.data;
    console.log('data >>> ', data);
    this.hotels = data || [];
    this.profileName = data.content.userName;
    this.profileImg = data.content.imageUrl;
  },
  computed: {
    headerImageUrl() {
      const baseUrl = process.env.VUE_APP_API_URL; // 환경변수 사용
      return this.profileImg
          ? `${baseUrl}${this.profileImg}`
          : "";
    },
  },
  methods: {
    menuModalOpen() {
      this.menuModal = !this.menuModal
    },
    logout() {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
}
</script>

<template>
  <div class="container">
    <nav class="nav-container">
      <!-- 왼쪽 -->
      <div class="item" @click="$router.push('/')">
                <span>
                    <img src="../../assets/ion_bed.png" alt="침대 사진">
                    hotels
                </span>
      </div>
      <!-- 오른쪽 -->
      <div class="item">
        <div class="flex vertical-center">
          <!-- 오른쪽 첫번째 -->
          <div  @click="$router.push('/favoritespage')" style="display: flex; margin-right: 16px" >
            <img src="../../assets/heart.png" alt="하트 사진">
            <span style="display: flex; margin: 0 16px 0 4px">
                        찜하기
                    </span>
            |
          </div>
          <!-- 오른쪽 두번째 -->
          <div class="dropdownMenu" @click="menuModalOpen">
            <div class="circle ">
              <img :src="headerImageUrl" alt="프로필사진" id="headerImgSize">
              <div class="mini-circle">
                <div class="check"></div>
              </div>
            </div>
            <span>
                        {{ profileName }}
            </span>
          </div>
        </div>

      </div>
    </nav>

  </div>
  <div class="menuModal" v-show="menuModal">
    <div class="menuTop">
      <div class="menuProfileImg">
        <img :src="headerImageUrl" alt="프로필 이미지">
      </div>
      <div class="menuProfileName">
        <a>{{ profileName }}</a>
        <p>Online</p>
      </div>
    </div>
    <hr>
    <div class="menuMiddle">
      <div class="goToBtn" @click="$router.push('/account')">
        <div class="gotoMain"><img src="../../assets/userImg.png" alt="사람이미지"> <a>계정</a></div>
        <div>&gt;</div>
      </div>
      <div class="goToBtn">
        <div class="gotoMain"><img src="../../assets/card.png" alt="카드이미지"> <a>결제 내역</a></div>
        <div>&gt;</div>
      </div>
      <div class="goToBtn">
        <div class="gotoMain"><img src="../../assets/settings.png" alt="설정이미지"> <a>설정</a></div>
        <div>&gt;</div>
      </div>
    </div>
    <hr>
    <div class="menuUnder">
      <div class="goToBtn" @click="logout">
        <div class="gotoMain"><img src="../../assets/Logout.png" alt="로그아웃 이미지"> <a>로그아웃</a></div>
        <div>&gt;</div>
      </div>
    </div>
  </div>
</template>

<style>
.gotoMain {
  display: flex;
  gap: 8px;
}

.menuMiddle {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.goToBtn {
  display: flex;
  justify-content: space-between;
  width: 265px;
}

.menuProfileName {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 4px;
}

.menuProfileName a {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
}

.menuProfileName p {
  font-family: Montserrat;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
}

.menuProfileImg {
  display: flex;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  border: none;
  background: #9e9a9a;
}

.menuProfileImg img {
  display: flex;
  object-fit: cover;
  border-radius: 100%;
  width: 100%;
  height: 100%;
}

.menuTop {
  display: flex;
  margin: 0 auto;
  width: 265px;
  height: 64px;
  gap: 16px;
}

.menuModal {
  margin-left: 69%;
  top: 80px;
  background: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 329px;
  border-radius: 12px;
  z-index: 6;
  padding: 32px;
  gap: 24px;
  box-shadow: 0px 2px 5px #d3d3d3;
}

.dropdownMenu {
  display: flex;
}

#headerImgSize {
  display: flex;
  object-fit: cover;
  border-radius: 100%;
  width: 100%;
  height: 100%;
}

.container {
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
  margin: auto 0;
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