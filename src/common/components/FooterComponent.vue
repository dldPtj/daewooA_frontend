<script>
import aTeamApi from "@/util/axios";

export default {
  data() {
    return {
    }
  },
  setup(){
    const submit = async () => {

      await aTeamApi.post('/api/my/coupons/welcome',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(async () => {
        alert("쿠폰 추가 성공");
      }).catch(()=> {
        alert("정보를 가져오는데 실패했습니다.");
      });
    };
    return { submit };
  },
}
</script>

<template>
  <div>

  </div>
    <footer class="footerContainer">
  <!--  가운데 위 컨테이너-->
      <div class="guDocContainer">
<!--        구독 컨테이너 왼쪽 위-->
        <div class="guDocText">
          <h1 class="guDocGOT">구독 서비스 <br>신청해보세요</h1>
        </div>
        <!-- 구독 컨테이너 왼쪽 아래  -->
        <div class="TheTravel">
          <div class="TopTheTravel">
            <h2>The Travel</h2>
            <h3>구독하고 쿠폰, 최신 이벤트를 받아보세요.</h3>
          </div>
          <div>
            <input type="text" class="textBox" placeholder="Your email address" style="border: none">
            <button type="button" id = "GsubBtn" style="border: none" @click="submit">Subscribe</button>
          </div>
        </div>
<!--        오른쪽 위 메일박스 사진-->
        <img src="../../assets/mailBox.png" id="mailBox">
      </div>
<!--      전체 컨테이너 아래-->
      <div class="footerMain">
        <div class="MainText">
<!--          왼쪽 위 아이콘 박스 -->
            <div id = "iconBox">
              <img src="../../assets/faceBook.png" class="icons">
              <img src="../../assets/akar-icons_twitter-fill.png" class="icons">
              <img src="../../assets/akar-icons_youtube-fill.png" class="icons">
              <img src="../../assets/ant-design_instagram-filled.png" class = "icons">
            </div>
          <div class="MainTextBox">
            <div class= "boxStyle">
              <h3>Our Destinations</h3><br>
              Canada<br><br>
              Alaksa<br><br>
              France<br><br>
              Iceland
            </div>
            <div class= "boxStyle">
              <h3>Our Activities</h3><br>
              Northern Lights<br><br>
              Cruising & sailing<br><br>
              Multi-activities<br><br>
              Kayaing
            </div>
            <div class= "boxStyle">
              <h3>Travel Blogs</h3><br>
              Bali Travel Guide<br><br>
              Sri Lanks Travel Guide<br><br>
              Peru Travel Guide<br><br>
              Bali Travel Guide
            </div>
            <div class= "boxStyle">
              <h3>Our About Us</h3><br>
              Our Story<br><br>
              Work with us<br><br>
            </div>
            <div class= "boxStyle">
              <h3>Our Contact Us</h3><br>
              Our Story<br><br>
              Work Work with us<br><br>
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>

<style>
* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
.footerContainer{
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 573px;
  border-radius: 30px;
  margin: 200px auto;

}
.footerMain {
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  height: 422px;
  padding: 32px 0 64px 0;
  gap: 64px;
  background: #8DD3BB;
  bottom: 0;
}
.guDocContainer{
  display: flex;
  position: relative;
  background: #CDEAE1;
  max-width: 1232px;
  border-radius: 20px;
  justify-content: space-between;
  padding: 0 24px;
  margin: 0 auto;
  z-index: 1;
}
.guDocText{
  display: flex;
  flex: 1;
  align-self: flex-start;
  flex-direction: column;
  width: fit-content;
  justify-content: space-between;
  padding: 24px 0;
}

#mailBox{
  position: relative;
  right: 47px;
  width: 400px;
  height: 305px;
  margin-left: -16px;
}
.MainText {
  display: flex;
  position: relative;
  width: 1232px;
  height: fit-content;
  justify-content: space-between;
  margin: auto auto -32px;

}
.guDocGOT {
  text-align: left;
  width: 364px;
  height: 108px;
}
.TheTravel{
  position: relative;
  flex-direction: column;
  text-align: left;
  display: flex;
  width: 593px;
  height: 125px;
  left: -366px;
  top: 158px;
}
.TopTheTravel {
  margin-bottom: 16px;
}
.textBox{
  width: 473px;
  height: 56px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-right: 16px;
  padding-left: 16px;
}
#GsubBtn{
  position: absolute;
  width: 104px;
  height: 56px;
  gap: 10px;
  background: black;
  color: white;
  border-radius: 4px;
}
#GsubBtn:hover{
  background: gray;
  color: white;
}

.icons{
  width: 20px;
  height: 20px;
  margin-right: 12px;
}
.boxStyle{
  text-align: left;
  margin-right: 24px;
  width: 176px;
  font-size: 16px;
}
.MainTextBox{
  display: flex;

}



</style>