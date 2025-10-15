<script>
import HeaderComponent from '@/common/components/HeaderComponent.vue';
import FooterComponent from '@/common/components/FooterComponent.vue';
import aTeamApi from '@/util/axios';

export default {
  name: 'HotelDetailPage',
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      hotelInfo: {},
    };
  },
  async mounted() {
    // ✅ 쿼리스트링으로 전달된 id 받기
    const hotelId = this.$route.query.id;

    if (!hotelId) {
      console.warn('호텔 ID가 없습니다.');
      this.$router.push('/hotels'); // 예외 처리 (선택)
      return;
    }

    try {
      // ✅ 백엔드에서 해당 호텔 정보 요청
      const result = await aTeamApi.get(`/api/hotels/detail/${hotelId}`);
      this.hotelInfo = result.data;
    } catch (error) {
      console.error('호텔 정보 로드 실패:', error);
    }
  },
};
</script>

<template>
  <div class="hoteldetail-page">
    <div>
      <HeaderComponent />
    </div>

    <!--나라 > 도시 > 호텔 이름-->
    <div class="country-city-hotelname">
      <span class="hd-country">Turkey</span>&nbsp;>&nbsp;<span class="hd-city">Istanbul</span
      >&nbsp;>&nbsp;<span class="hd-hotelname">{{ hotelInfo.name }}</span>
    </div>

    <!--호텔 디테일 정보-->
    <div class="hoteldetail-info">
      <!--호텔 디테일 왼쪽 (호텔 이름, 등급, 위치, 리뷰 평점 및 개수)-->
      <div class="hotel-detail-left">
        <div class="hotel-namegrade">
          <span id="hotel-detail-name">{{ hotelInfo.name }}</span
          >&nbsp;&nbsp;&nbsp;
          <span
            id="grade-stars"
            v-for="value in hotelInfo.grade"
            :key="value"
            style="font-size: 20px"
            >★</span
          >&nbsp; <span id="grade">{{ hotelInfo.grade }}</span
          >&nbsp;Star Hotel
        </div>
        <!--호텔 위치-->
        <div class="hoteldetail-location">
          <i class="bx bx-location"></i>
          <span id="address">
            <small>{{ hotelInfo.address }}</small>
          </span>
        </div>

        <!--호텔 리뷰 평점 및 개수-->
        <div class="hoteldetail-rating-count">
          <!--호텔 리뷰 평점-->
          <div class="hotel-review-avg">
            <span id="review-rating">{{ hotelInfo.rating }}</span>
          </div>
          <!--호텔 만족도-->
          <div class="hoteldetail-satisfaction">
            <b><span id="satisfaction">Very Good</span></b>
          </div>
          <!--호텔 평점 개수-->
          <div class="hoteldetail-review-count">
            <span id="review-count">{{ hotelInfo.reviewCount }}</span
            >&nbsp;reviews
          </div>
        </div>
      </div>

      <!--호텔 디테일 오른쪽 (찜, 공유, 가격, 예약)-->
      <div class="hotel-detail-right">
        <div class="hoteldetail-price">
          ₩<span id="hoteldetail-price">{{ hotelInfo.price }}</span
          >/night
        </div>
        <div class="hoteldetail-btns">
          <div class="hoteldetail-heart">
            <button id="hoteldetail-favorite-btn">
              <img src="../assets/emptyheart.png" />
            </button>
          </div>
          <div class="hoteldetail-share">
            <button id="hoteldetail-share-btn">
              <img src="../assets/share.png" />
            </button>
          </div>
          <div class="hoteldetail-book">
            <button id="hoteldetail-book-btn">Book now</button>
          </div>
        </div>
      </div>
    </div>

    <!--호텔 이미지-->
    <div class="hotel-detail-img">
      <div class="hoteldetail-img-main">
        <img src="../assets/hoteldetail-main-img.png" />
      </div>
      <div class="hoteldetail-imgs">
        <div class="hoteldetail-imgs-up">
          <div class="hoteldetail-img-1">
            <img src="../assets/hoteldetail-img-1.png" />
          </div>
          <div class="hoteldetail-img-2">
            <img src="../assets/hoteldetail-img-2.png" />
          </div>
        </div>
        <div class="hoteldetail-imgs-down">
          <div class="hoteldetail-img-3">
            <img src="../assets/hoteldetail-img-3.png" />
          </div>
          <div class="hoteldetail-img-4">
            <img src="../assets/hoteldetail-img-4.png" />
          </div>
        </div>
      </div>
    </div>

    <!--호텔 개요-->
    <div class="hotel-overview">
      <div class="hotel-overview-title">
        <h3>Overview</h3>
      </div>
      <div class="hotel-overview-text">
        {{ hotelInfo.overview }}
      </div>
      <div class="hotel-overview-boxes">
        <div class="hotelrating-avg-now">
          <div class="rating">
            <h1>{{ hotelInfo.rating }}</h1>
          </div>
          <!--호텔 만족도-->
          <div class="hoteldetail-overview-satisfaction">
            <h2 id="satisfaction">Very Good</h2>
          </div>
          <!--호텔 리뷰 개수-->
          <div class="hoteldetail-review-count">
            <span id="review-count">{{ hotelInfo.reviewCount }}</span
            >reviews
          </div>
        </div>

        <div class="hotelfeatures">
          <div class="stars-img">
            <img src="../assets/stars.png" />
          </div>
          <div class="hotel-feature">
            <span id="feature-1">Near park</span>
          </div>
        </div>
        <div class="hotelfeatures">
          <div class="stars-img">
            <img src="../assets/stars.png" />
          </div>
          <div class="hotel-feature">
            <span id="feature-2">Near nightlife</span>
          </div>
        </div>
        <div class="hotelfeatures">
          <div class="stars-img">
            <img src="../assets/stars.png" />
          </div>
          <div class="hotel-feature">
            <span id="feature-3">Near theater</span>
          </div>
        </div>
        <div class="hotelfeatures">
          <div class="stars-img">
            <img src="../assets/stars.png" />
          </div>
          <div class="hotel-feature">
            <span id="feature-4">Clean Hotel</span>
          </div>
        </div>
      </div>
    </div>
    <!--호텔 잔여 객실-->
    <div class="hotel-leftrooms">
      <div class="hotel-leftrooms-title">
        <h3>잔여 객실</h3>
      </div>
      <!--잔여 객실 리스트-->

      <!--첫번째 객실-->
      <div class="leftroom">
        <!--객실 리스트 왼쪽 편(객실이미지, 객실타입 및 침대개수)-->
        <div class="leftroom-sec">
          <!--객실 이미지-->
          <div class="leftroom-img">
            <img src="../assets/leftroom-1.png" />
          </div>
          <!--객실 타입-->
          <div class="leftroom-type">
            <span id="roomtype">Superior room</span> - <span id="room-view"></span> -
            <span id="bed-counts">1 double bed or 2 twin beds</span>
          </div>
        </div>

        <!--객실 리스트 오른쪽 편(객실가격, 객실예약버튼)-->
        <div class="leftroom-sec">
          <div class="room-price">₩<span id="room-price">240,000</span><small>/night</small></div>
          <div class="room-book">
            <button id="room-book-btn">Book now</button>
          </div>
        </div>
      </div>

      <!--두번째 객실-->
      <div class="leftroom">
        <!--객실 리스트 왼쪽 편(객실이미지, 객실타입 및 침대개수)-->
        <div class="leftroom-sec">
          <!--객실 이미지-->
          <div class="leftroom-img">
            <img src="../assets/leftroom-2.png" />
          </div>
          <!--객실 타입-->
          <div class="leftroom-type">
            <span id="roomtype">Superior room</span> - <span id="room-view">City view</span> -
            <span id="bed-counts">1 double bed or 2 twin beds</span>
          </div>
        </div>

        <!--객실 리스트 오른쪽 편(객실가격, 객실예약버튼)-->
        <div class="leftroom-sec">
          <div class="room-price">₩<span id="room-price">240,000</span><small>/night</small></div>
          <div class="room-book">
            <button id="room-book-btn">Book now</button>
          </div>
        </div>
      </div>

      <!--세번째 객실-->
      <div class="leftroom">
        <!--객실 리스트 왼쪽 편(객실이미지, 객실타입 및 침대개수)-->
        <div class="leftroom-sec">
          <!--객실 이미지-->
          <div class="leftroom-img">
            <img src="../assets/leftroom-3.png" />
          </div>
          <!--객실 타입-->
          <div class="leftroom-type">
            <span id="roomtype">Superior room</span> - <span id="room-view">City view</span> -
            <span id="bed-counts">1 double bed or 2 twin beds</span>
          </div>
        </div>

        <!--객실 리스트 오른쪽 편(객실가격, 객실예약버튼)-->
        <div class="leftroom-sec">
          <div class="room-price">₩<span id="room-price">240,000</span><small>/night</small></div>
          <div class="room-book">
            <button id="room-book-btn">Book now</button>
          </div>
        </div>
      </div>

      <!--네번째 객실-->
      <div class="leftroom">
        <!--객실 리스트 왼쪽 편(객실이미지, 객실타입 및 침대개수)-->
        <div class="leftroom-sec">
          <!--객실 이미지-->
          <div class="leftroom-img">
            <img src="../assets/leftroom-4.png" />
          </div>
          <!--객실 타입-->
          <div class="leftroom-type">
            <span id="roomtype">Superior room</span> - <span id="room-view">City view</span> -
            <span id="bed-counts">1 double bed or 2 twin beds</span>
          </div>
        </div>

        <!--객실 리스트 오른쪽 편(객실가격, 객실예약버튼)-->
        <div class="leftroom-sec">
          <div class="room-price">₩<span id="room-price">240,000</span><small>/night</small></div>
          <div class="room-book">
            <button id="room-book-btn">Book now</button>
          </div>
        </div>
      </div>
    </div>

    <!--호텔 위치 지도-->
    <div class="hotel-map">
      <div class="hotel-map-top">
        <div class="hotel-map-title">
          <h2>지도보기</h2>
        </div>
        <div class="googlemaps-btn">
          <button id="googlemaps-btn">View on google maps</button>
        </div>
      </div>
      <!--지도-->
      <div class="map"></div>
      <!--주소-->
      <div class="hoteldetail-address">
        <img src="../assets/ion-location.png" /><span id="address"
          >Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</span
        >
      </div>
    </div>

    <!--호텔 편의시설-->
    <div class="hotel-detail-amenities">
      <div class="amenities-title">
        <h3>Amenitites</h3>
      </div>
      <div class="amenities-lists">
        <ul class="amenities-lists-column" style="list-style: none">
          <li><img src="../assets/icon_pool.png" />&nbsp;Outdoor pool</li>
          <li><img src="../assets/icon_pool.png" />&nbsp;Indoor pool</li>
          <li><img src="../assets/icon_spa.png" />&nbsp;Spa and wellness center</li>
          <li><img src="../assets/icon_restaurant.png" />&nbsp;Restaurant</li>
          <li><img src="../assets/icon_room-service.png" />&nbsp;Room service</li>
        </ul>
        <ul class="amenities-lists-column" style="list-style: none">
          <li><img src="../assets/icon_fitness.png" />&nbsp;Fitness center</li>
          <li><img src="../assets/icon_wine.png" />&nbsp;Bar/Lounge</li>
          <li><img src="../assets/icon_wifi.png" />&nbsp;Free Wi-Fi</li>
          <li><img src="../assets/icon_breakfast.png" />&nbsp;Tea/coffee machine</li>
          <li class="lastlist">+<span id="left-amenities">24</span>&nbsp;more</li>
        </ul>
      </div>
    </div>
    <!--호텔 리뷰-->
    <div class="hotel-reviews">
      <div class="hotel-reviews-top">
        <div class="hotel-reviews-title">
          <h3>Reviews</h3>
        </div>
        <div class="write-review">
          <button id="write-review-btn">Give your review</button>
        </div>
      </div>

      <div class="reviews-rating-avg">
        <!--리뷰 평점-->
        <div class="reviews-rating">
          <span id="reviews-rating">4.2</span>
        </div>
        <!--리뷰 만족도와 개수-->
        <div class="satis-count">
          <div class="reviews-satisfaction">
            <span id="satisfaction">Very Good</span>
          </div>
          <div class="reviews-count"><span id="review-count">371</span>verified reviews</div>
        </div>
      </div>

      <!--리뷰 리스트-->
      <div class="review-lists">
        <!--리뷰 내용(프로필, 리뷰평점, 이름, 리뷰내용)-->
        <div class="review-info">
          <div class="review-profile"></div>
          <div class="review-info-in">
            <div class="reviewer-rating-name">
              <span id="review-rating">5.0 Amazing</span> | 이예서
            </div>
            <div class="review-content">
              "말라카 구시가지의 한복판에 자리한 고요하고 휴식이 가득한 공간. 강변의 깨끗한 루프탑
              수영장이 특히 인상 깊었고, 객실마다 밤마다 향 오일 램프가 켜져 있어 정말 좋았다"고
              감탄했습니다.
            </div>
          </div>
        </div>
        <!--리뷰 신고버튼-->
        <button class="review-report-btn">
          <i class="bxr bx-flag-alt-2"></i>
        </button>
      </div>
      <!--리뷰 페이지 처리부분-->
      <div class="review-page">
        <button id="review-back-btn">
          <i class="bxr bx-chevron-left"></i>
        </button>
        1 of 40
        <button id="review-next-btn">
          <i class="bxr bx-chevron-right" style="color: #000000"></i>
        </button>
      </div>
    </div>

    <div>
      <FooterComponent />
    </div>
  </div>
  <link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet" />
</template>

<style>
.review-page {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
#review-back-btn {
  font-size: 30px;
  background-color: white;
  border: white;
}
#review-next-btn {
  font-size: 30px;
  background-color: white;
  border: white;
}
.review-lists {
  border-bottom: #d9d9d9 solid 1px;
}
#review-rating {
  font-weight: bold;
}
.review-report-btn {
  font-size: 24px;
  background-color: white;
  border: white;
}
.review-profile {
  background-color: #8ae6b2;
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.review-info-in {
  display: flex;
  flex-direction: column;
  max-width: 1130px;
  text-align: left;
  margin: auto 20px;
}
.review-info {
  display: flex;
  align-items: center;
}
.review-lists {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  padding-bottom: 20px;
}
.satis-count {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto 20px;
  text-align: left;
}
#reviews-rating {
  font-size: 50px;
  font-weight: bold;
}
.reviews-rating-avg {
  display: flex;
  border-bottom: #d9d9d9 solid 1px;
  justify-items: left;
  margin: 20px auto;
  padding-bottom: 20px;
}
#satisfaction {
  font-weight: bold;
}
#write-review-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: #8ae6b2;
  width: 130px;
  height: 50px;
}
.hotel-reviews-top {
  display: flex;
  justify-content: space-between;
  margin: 70px auto 30px;
}
.hotel-reviews {
  margin: 0 auto;
  width: 1250px;
}
.lastlist {
  color: #ff8682;
  font-weight: bold;
}
.amenities-lists-column li {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
.amenities-lists {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 400px;
  text-align: left;
  margin: 0 0 50px 0;
}
.amenities-title {
  margin: 50px 0 30px 0;
  text-align: left;
  width: 1250px;
}
.hotel-detail-amenities {
  border-bottom: #d9d9d9 solid 1px;
  margin: 0 auto;
  width: 1250px;
}
.hoteldetail-location {
  display: flex;
  align-items: center;
}
.hoteldetail-address {
  text-align: left;
  margin: 10px auto;
  width: 1240px;
  padding-bottom: 70px;
  border-bottom: #d9d9d9 solid 1px;
}
.map {
  width: 1232px;
  height: 450px;
  background-color: #e4ce9f;
  margin: 0 auto;
}
#googlemaps-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: #8ae6b2;
  width: 180px;
  height: 40px;
}
.hotel-map-top {
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
  width: 1240px;
}
#room-book-btn {
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  background-color: #8ae6b2;
  width: 120px;
  height: 40px;
}
.room-book {
  margin: 0 0 0 50px;
}
.room-price {
  font-size: 30px;
  margin: auto;
}
.leftroom-type {
  margin: auto 15px;
}
.leftroom {
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  padding: 10px;
  border-bottom: #d9d9d9 solid 1px;
}
.leftroom-sec {
  display: flex;
}
.hotel-leftrooms-title {
  margin: 30px 0 20px 10px;
  text-align: left;
  width: 1250px;
}
.hotel-leftrooms {
  margin: auto;
  max-width: 1250px;
}
.hotelfeatures {
  border: #8ae6b2 solid 1px;
  border-radius: 10px;
  margin: 0 0 0 20px;
  padding: 15px;
  width: 150px;
}
.hotel-feature {
  margin: 55px 0 0 0;
  text-align: left;
}
.hoteldetail-overview-satisfaction {
  margin-top: 30px;
}
.hotel-overview-boxes {
  display: flex;
  text-align: left;
  margin: 20px auto;
  padding-bottom: 50px;
  border-bottom: #d9d9d9 solid 1px;
}
.hotelrating-avg-now {
  border: #8ae6b2 solid 1px;
  border-radius: 10px;
  background-color: #8ae6b2;
  padding: 15px;
}
.hotel-overview-text {
  text-align: left;
  margin: 20px auto;
}
.hotel-overview-title {
  margin: 40px 0 10px 0;
  text-align: left;
}
.hotel-overview {
  margin: auto;
  width: 1240px;
}
.hoteldetail-img-3 {
  border-top-right-radius: 5px;
}
.hoteldetail-img-4 {
  border-bottom-right-radius: 5px;
}
.hoteldetail-img-main {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.hoteldetail-imgs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: auto 10px;
}
.hotel-detail-img {
  display: flex;
  width: 1250px;
  margin: 20px auto;
  padding-bottom: 70px;
  border-bottom: #d9d9d9 solid 1px;
}
.hoteldetail-price {
  font-size: 20px;
  font-weight: bold;
  color: #ff8682;
  text-align: right;
}
#hoteldetail-book-btn {
  background-color: #8ae6b2;
  border-radius: 5px;
  border: #8ae6b2 solid 1px;
  width: 150px;
  height: 45px;
}
#hoteldetail-share-btn {
  background-color: white;
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  width: 45px;
  height: 45px;
}
#hoteldetail-favorite-btn {
  background-color: white;
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  width: 45px;
  height: 45px;
}
.hoteldetail-btns {
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 10px;
  margin: 10px auto;
}
.hoteldetail-satisfaction {
  padding: 5px;
}
.hoteldetail-rating-count {
  display: flex;
  align-items: center;
  margin: 10px auto 10px;
}
.hotel-namegrade {
  display: flex;
  align-items: center;
  margin: 10px auto;
}
.hoteldetail-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1250px;
  margin: 10px auto;
}
.hoteldetail-page {
  display: flex;
  flex-direction: column;
}
.country-city-hotelname {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 1050px 0 0;
}
.hd-country {
  color: #ff8682;
}
.hd-city {
  color: #ff8682;
}
</style>