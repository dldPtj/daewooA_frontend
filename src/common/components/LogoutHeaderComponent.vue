<script>

export default {
  name: 'HeaderComponent',
  data() {
    return {
      menuModal: false,
    };
  },
  computed: {
    isUserLoggedIn() {
      // 'token'은 사용자가 로그인 시 저장하는 토큰의 키 이름으로 가정합니다.
      return !!localStorage.getItem('token');
    },
  },
  methods: {
    menuModalOpen() {
      this.menuModal = !this.menuModal
    },
    clicked(path) {
      this.$router.push(path);
    },
    favoritePage() {
      if (this.isUserLoggedIn) {
        // 로그인 상태일 때 favoritespage로 이동
        this.$router.push('/favoritespage');
      } else {
        // 로그인 상태가 아닐 때 (토큰이 없을 때): 로그인 필요 이벤트 발생
        alert('로그인이 필요한 기능입니다.');
      }
    },
  }
}
</script>

<template>
  <div class="container">
<!--    nav-container가 원래 216px인데 테스트 계정 보여주기 위해 임의로 줄였습니다.-->
    <nav class="nav-container">
      <!-- 왼쪽 -->
      <div class="headerHover" @click="clicked('/')" :class="{active : $route.path === '/' }">
        <div class="go-to-home" id="item">
            <span style="display: flex; align-items: center; gap: 5px;">
                <img src="../../assets/ion_bed.png" alt="침대 사진">
                hotels
            </span>
        </div>
      </div>

      <div id="test-id">
        <p>테스트 서버에 등록된 아이디 입니다~</p>
        <p>id: test@example.com</p>
        <p>pw: 1234</p>
      </div>
      <!-- 오른쪽 -->
      <div class="item2">
        <div class="flex vertical-center">
          <!-- 오른쪽 첫번째 -->
          <div @click="favoritePage" class="headerHover" style="display: flex; align-items: center; gap: 5px;" >
            <img src="../../assets/heart.png" alt="하트 사진">
            <span>찜하기</span>
          </div>
            |
          <!-- 오른쪽 두번째 -->
          <div class="dropdownMenu" @click="menuModalOpen">
            <div class="circle ">
            </div>
            <span>
              로그인이 필요한 서비스 입니다.
            </span>
          </div>
        </div>

      </div>
    </nav>

  </div>
  <div class="menuModal" v-show="menuModal">
    <div class="menuTop">
      <div class="menuProfileImg">
      </div>
      <div class="menuProfileName">
        <a>로그인을 하세요.</a>
        <p>Offline</p>
      </div>
    </div>
<!--    <hr>-->
<!--    <div class="menuMiddle">-->
<!--      <div class="goToBtn">-->
<!--        <div class="gotoMain"><img src="../../assets/settings.png" alt="설정이미지"> <a>설정</a></div>-->
<!--        <div>&gt;</div>-->
<!--      </div>-->
<!--    </div>-->
    <hr>
    <div class="menuUnder">
      <div class="goToBtn" @click="$router.push('/loginpage')">
        <div class="gotoMain"><img src="../../assets/Logout.png" alt="로그인 이미지"> <a>로그인</a></div>
        <div>&gt;</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#test-id{
  border: solid #8DD3BB 3px;
  border-radius: 8px;
  padding: 3px;
  display: flex;
  flex-direction: column;
  text-align: left;

}
.headerImgSize {
  display: flex;
  flex-direction: column;
  text-align: left;

}
.headerHover {
  align-items: center;
  display: flex;
  height: 87px;
  border: none;
  justify-content: center;
  cursor: pointer;
}
.headerHover.clicked{
  border-bottom: #8DD3BB solid 5px;
}

.headerHover:hover {
  border-bottom: #8DD3BB solid 5px;
}
.go-to-home:hover {
  cursor: pointer;
}
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

.goToBtn:hover {
  cursor: pointer;
}

.menuProfileName {
  display: flex;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
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
  align-items: center;
  margin: 0 auto;
  width: 265px;
  height: 64px;
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
  align-items: center;
  gap: 5px;
}

.dropdownMenu:hover {
  cursor: pointer;
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
  padding: 0 180px;
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