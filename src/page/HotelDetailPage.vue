<script>
import HeaderComponent from '@/common/components/HeaderComponent.vue';
import FooterComponent from '@/common/components/FooterComponent.vue';
import aTeamApi from '@/util/axios';
import LeftRoomLists from '@/common/components/LeftRoomLists.vue';
import MapComponent from '@/common/components/MapComponent.vue';

export default {
  name: 'HotelDetailPage',
  components: { MapComponent, LeftRoomLists, HeaderComponent, FooterComponent },
  data() {
    return {
      hotelInfo: {},
      favorite: false,
      roomData: {},
      modalOpen: false,
    };
  },
  async mounted() {
    const hotelId = this.$route.query.id;

    if (!hotelId) {
      console.warn('호텔 ID가 없습니다.');
      this.$router.push('/hotels');
      return;
    }

    try {
      const result = await aTeamApi.get(`/api/hotels/detail/${hotelId}`);
      this.hotelInfo = result.data;
      console.log('hotelInfo', this.hotelInfo);
    } catch (error) {
      console.error('호텔 정보 로드 실패:', error);
    }
  },
  methods: {
    togglefavorites() {
      if (this.isUserLoggedIn) {
        // 로그인 상태일 때 (토큰이 있을 때): 기존 찜하기 로직 실행
        this.favorite = !this.favorite;
      } else {
        // 로그인 상태가 아닐 때 (토큰이 없을 때): 로그인 필요 이벤트 발생
        alert('로그인이 필요한 기능입니다.');
      }
    },
    // 각 이미지 URL에 base URL을 안전하게 붙여서 반환
    getFullImageUrl(url) {
      if (!url) return '';
      // 이미 절대 URL이면 그대로 반환
      if (url.startsWith('http://') || url.startsWith('https://')) return url;
      // Vue CLI 환경에서 process.env.VUE_APP_API_URL 사용
      const base = process.env.VUE_APP_API_URL || '';
      return `${base}${url}`;
    },
    scrollToRooms() {
      // ref로 연결된 요소를 찾아서 scrollIntoView 메소드 호출
      this.$refs.hotelrooms.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    },
    scrollToReviews() {
      this.$refs.reviews.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    },
    getAmenityIcon(amenity) {
      // amenities 이름 일부로 매칭 (포함 여부 기준)
      const iconMap = [
        { keyword: '수영장', icon: require('../assets/icon_pool.png') },
        { keyword: '스파', icon: require('../assets/icon_spa.png') },
        { keyword: '레스토랑', icon: require('../assets/icon_restaurant.png') },
        { keyword: '룸서비스', icon: require('../assets/icon_room-service.png') },
        { keyword: '헬스', icon: require('../assets/icon_fitness.png') },
        { keyword: '바', icon: require('../assets/icon_wine.png') },
        { keyword: '커피', icon: require('../assets/icon_breakfast.png') },
        { keyword: '조식', icon: require('../assets/icon_breakfast.png') },
        { keyword: '와이파이', icon: require('../assets/icon_wifi.png') },
        { keyword: '주차', icon: require('../assets/icon_car.png') },
        { keyword: '공항', icon: require('../assets/icon_airport.png') },
        { keyword: '프론트', icon: require('../assets/icon_front.png') },
        { keyword: '에어컨', icon: require('../assets/icon_aircon.png') },
      ];

      const match = iconMap.find((item) => amenity.includes(item.keyword));
      // 매칭된 게 없으면 기본 아이콘 반환
      return match ? match.icon : require('../assets/icon_default.png');
    },
    openGoogleMaps() {
      if (this.hotelInfo.address) {
        // 주소를 URL 인코딩하여 Google Maps 검색 쿼리 URL을 생성합니다.
        const encodedAddress = encodeURIComponent(this.hotelInfo.address);
        const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

        // 새 탭에서 Google Maps를 엽니다.
        window.open(url, '_blank');
      } else {
        alert('호텔 주소 정보가 없습니다.');
      }
    },
  },
  computed: {
    isUserLoggedIn() {
      // 'token'은 사용자가 로그인 시 저장하는 토큰의 키 이름으로 가정합니다.
      return !!localStorage.getItem('token');
    },
    // 전체 amenities
    totalAmenitiesLists() {
      return this.hotelInfo.amenities || [];
    },
    // 첫 번째 열에 4개
    firstColumnAmenities() {
      return this.hotelInfo.amenities?.slice(0, 4) || [];
    },
    // 두 번째 열에 3개
    secondColumnAmenities() {
      return this.hotelInfo.amenities?.slice(4, 7) || [];
    },
    // 남은 amenities 개수
    remainingCount() {
      const total = this.hotelInfo.amenities?.length || 0;
      return total > 7 ? total - 7 : 0;
    },
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
      <span class="hd-country">{{ hotelInfo.country }}</span
      >&nbsp;<i class="bx bx-chevron-right"></i> &nbsp;
      <span class="hd-city">{{ hotelInfo.cityName }}</span
      >&nbsp;<i class="bx bx-chevron-right"></i>&nbsp;
      <span class="hd-hotelname">{{ hotelInfo.name }}</span>
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
        <div class="hoteldetail-rating-count" @click="scrollToReviews">
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
          ₩<span id="hoteldetail-price">{{ hotelInfo?.price?.toLocaleString() }}</span
          >/night
        </div>
        <div class="hoteldetail-btns">
          <div class="hoteldetail-heart">
            <button id="hoteldetail-favorite-btn" @click="togglefavorites()">
              <i
                class="bxr"
                :class="{
                  'bx-heart': !favorite,
                  'bx-heart-square': favorite,
                }"
                :style="{ 'font-size': favorite ? '60px' : '30px', color: '#8ae6b2' }"
              ></i>
            </button>
          </div>
          <div class="hoteldetail-share">
            <button id="hoteldetail-share-btn">
              <i class="bx bx-share" style="font-size: 25px"></i>
            </button>
          </div>
          <div class="hoteldetail-book">
            <button id="hoteldetail-book-btn" @click="scrollToRooms">Book now</button>
          </div>
        </div>
      </div>
    </div>

    <!--호텔 이미지-->
    <div class="hotel-detail-img">
      <!-- 메인(첫 번째) 이미지 -->
      <div class="hoteldetail-img-main">
        <template v-if="hotelInfo.imageUrls && hotelInfo.imageUrls[0]">
          <img
            :src="getFullImageUrl(hotelInfo.imageUrls[0])"
            :alt="hotelInfo.name + ' main image'"
          />
        </template>
        <template v-else>
          <div class="no-image-slot main">
            <span>이미지가 없습니다</span>
          </div>
        </template>
      </div>

      <!-- 나머지 4개 썸네일 -->
      <div class="hoteldetail-imgs">
        <div v-for="index in 4" :key="index" class="hoteldetail-img-thumb">
          <template v-if="hotelInfo.imageUrls && hotelInfo.imageUrls[index]">
            <img
              :src="getFullImageUrl(hotelInfo.imageUrls[index])"
              :alt="hotelInfo.name + ' image ' + (index + 1)"
            />
          </template>
          <template v-else>
            <div class="no-image-slot">
              <span>이미지가 없습니다</span>
            </div>
          </template>
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
    <div class="hotel-leftrooms" ref="hotelrooms">
      <div class="hotel-leftrooms-title">
        <h3>잔여 객실</h3>
      </div>
      <!--잔여 객실 리스트-->
      <LeftRoomLists v-for="room in hotelInfo.rooms" :key="room.id" :roomInfo="room" />
    </div>

    <!--호텔 위치 지도-->
    <div class="hotel-map">
      <div class="hotel-map-top">
        <div class="hotel-map-title">
          <h2>지도보기</h2>
        </div>
        <div class="googlemaps-btn">
          <button id="googlemaps-btn" @click="openGoogleMaps">View on google maps</button>
        </div>
      </div>
      <!--지도-->
      <div class="map">
        <MapComponent
          :address="hotelInfo.address"
          :hotelName="hotelInfo.name"
          v-if="hotelInfo.address"
        />
      </div>
      <!--주소-->
      <div class="hoteldetail-address">
        <img src="../assets/ion-location.png" />
        <span id="address">{{ hotelInfo.address }}</span>
      </div>
    </div>

    <!--호텔 편의시설-->
    <div class="hotel-detail-amenities">
      <div class="amenities-title">
        <h3>Amenities</h3>
      </div>

      <div class="amenities-lists">
        <!-- 첫 번째 열 -->
        <ul class="amenities-lists-column" style="list-style: none">
          <li v-for="(amenity, index) in firstColumnAmenities" :key="'col1-' + index">
            <img :src="getAmenityIcon(amenity)" alt="amenity icon" class="amenity-icon" />
            &nbsp;{{ amenity }}
          </li>
        </ul>

        <!-- 두 번째 열 -->
        <ul class="amenities-lists-column" style="list-style: none">
          <li v-for="(amenity, index) in secondColumnAmenities" :key="'col2-' + index">
            <img :src="getAmenityIcon(amenity)" alt="amenity icon" class="amenity-icon" />
            &nbsp;{{ amenity }}
          </li>

          <!-- 남은 개수가 있을 때 +N more 표시 -->
          <button v-if="remainingCount > 0" class="lastlist" @click="modalOpen = true">+{{ remainingCount }} more</button>
          <!-- 모달창 열렸을 때 보여주는 amenities -->
          <div v-if="modalOpen" class="modal-background" @click="modalOpen = false">
            <div class="modal-content" @click.stop>
              <button @click="modalOpen = false" class="close-btn"><i class="bx bx-x"></i></button>
              <li v-for="(amenity, index) in totalAmenitiesLists" :key="index" class="more-amenities">
                <img :src="getAmenityIcon(amenity)" alt="amenity icon" class="amenity-icon" />
                &nbsp;{{ amenity }}
              </li>
            </div>
          </div>
        </ul>
      </div>
    </div>

    <!--호텔 리뷰-->
    <div class="hotel-reviews" ref="reviews">
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
          <span id="reviews-rating">{{ hotelInfo.rating }}</span>
        </div>
        <!--리뷰 만족도와 개수-->
        <div class="satis-count">
          <div class="reviews-satisfaction">
            <span id="satisfaction">Very Good</span>
          </div>
          <div class="reviews-count">
            <span id="review-count">{{ hotelInfo.reviewCount }}&nbsp;</span>verified reviews
          </div>
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
#write-review-btn:hover {
  background-color: #6acd97;
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
  background-color: transparent;
  border: none;
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
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 1000px;
}
.more-amenities {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 150px;
  border-radius: 5px;
  border: #d3d3d3 solid 1px;
}
.close-btn {
  font-size: 30px;
  font-weight: bold;
  background-color: transparent;
  border: none;
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
#googlemaps-btn:hover {
  background-color: #6acd97;
}
.hotel-map-top {
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
  width: 1240px;
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
.hotel-detail-img {
  display: flex;
  gap: 10px;
  width: 1250px;
  margin: 20px auto;
  padding-bottom: 70px;
  border-bottom: #d9d9d9 solid 1px;
}

/* 메인 이미지 */
.hoteldetail-img-main img {
  width: 630px;
  height: 550px;
  object-fit: cover;
  border-radius: 10px;
}

/* 썸네일 그룹 */
.hoteldetail-imgs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}

/* 썸네일 이미지 */
.hoteldetail-img-thumb img {
  width: 300px;
  height: 270px;
  object-fit: cover;
  border-radius: 10px;
}

/* “이미지가 없습니다” 회색 박스 */
.no-image-slot {
  background-color: #d9d9d9;
  color: #555;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 270px;
}

/* 메인 이미지가 비었을 때 회색 박스 */
.no-image-slot.main {
  width: 610px;
  height: 550px;
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
#hoteldetail-book-btn:hover {
  background-color: #6acd97;
}
#hoteldetail-share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  width: 45px;
  height: 45px;
}
#hoteldetail-share-btn:hover {
  background-color: #d3d3d3;
}
#hoteldetail-favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: #8ae6b2 solid 1px;
  border-radius: 5px;
  width: 45px;
  height: 45px;
}
#hoteldetail-favorite-btn:hover {
  background-color: #d3d3d3;
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
  width: 1250px;
  margin: 40px auto 0px;
  text-align: left;
}
.hd-country {
  color: #ff8682;
}
.hd-city {
  color: #ff8682;
}
</style>