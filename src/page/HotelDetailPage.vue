<script>
import HeaderComponent from '@/common/components/HeaderComponent.vue';
import FooterComponent from '@/common/components/FooterComponent.vue';
import aTeamApi from '@/util/axios';
import LeftRoomLists from '@/common/components/LeftRoomLists.vue';
import MapComponent from '@/common/components/MapComponent.vue';
import ReviewLists from '@/common/components/ReviewLists.vue';
import { reactive } from 'vue';
import dayjs from "dayjs";

export default {
  name: 'HotelDetailPage',
  components: {
    ReviewLists,
    MapComponent,
    LeftRoomLists,
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      reviews: [],
      hotelInfo: {},
      reviewInfo: [],
      reviewCount: 0,
      favorite: false,
      modalOpen: false,
      writeModalOpen: false,
      sliderValue: 0,
      editingReviewId: null,
      reviewsPerPage: 4,
      currentPage: 1,
      favoritedata: {},

    };
  },
  async mounted() {
    const hotelId = this.$route.query.id;

    const formatCheckInDate = dayjs(localStorage.getItem("checkin")).format("YYYY-MM-DD");
    const formatCheckOutDate = dayjs(localStorage.getItem("checkout")).format("YYYY-MM-DD");

    console.log(formatCheckInDate);

    if (!hotelId) {
      console.warn('호텔 ID가 없습니다.');
      this.$router.push('/hotels');
      return;
    }

    // 호텔 정보 api 로드
    try {
      const result = await aTeamApi.get(`/api/hotels/detail/${hotelId}?checkInDate=${formatCheckInDate}&checkOutDate=${formatCheckOutDate}`);
      this.hotelInfo = result.data;
      this.favoritedata = result.data.favoriteId;
      console.log('hotelInfo', this.hotelInfo);
      console.log("roomsData")
    } catch (error) {
      console.error('호텔 정보 로드 실패:', error);
    }

    // 호텔 리뷰 정보 api 로드
    try {
      const resultReviewInfo = await aTeamApi.get(`/api/hotels/${hotelId}/reviews`);
      this.reviewInfo = resultReviewInfo.data.content.content;
      console.log('reviewInfo >>> ', this.reviewInfo)
    } catch (error) {
      console.error('호텔 리뷰 정보 로드 실패: ', error);
    }

    // 호텔 리뷰 개수 api 로드
    try {
      const resultReviewCount = await aTeamApi.get(`/api/hotels/${hotelId}/reviews/total-info`);
      this.reviewCount = resultReviewCount.data.content;
      console.log('reviewCountData >>> ', this.reviewCount);
    } catch (error) {
      console.error('호텔 리뷰 개수 정보 로드 실패: ', error);
    }
  },
  methods: {
    async togglefavorites() {
      if (this.isUserLoggedIn) {
        // 로그인 상태일 때 (토큰이 있을 때): 기존 찜하기 로직 실행
        await aTeamApi.post(`/api/favorites/${this.hotelInfo.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }).then(() => {
          console.log("정보 수정 완료");
        }).catch(() => {
          alert("등록 실패");
        });
        }

      if(this.favoritedata === true){
        this.favoritedata = false;
        alert("즐겨찾기가 해제되었습니다.");
      }else {
        this.favoritedata = true;
        alert("즐겨찾기가 추가되었습니다.");
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
    scrollToMap() {
      this.$refs.map.scrollIntoView({
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
    reviewAuth() {
      if (this.isUserLoggedIn) {
        // 로그인 상태일 때 (토큰이 있을 때): 리뷰쓰기 모달 오픈
        this.writeModalOpen = !this.writeModalOpen;
      } else {
        // 로그인 상태가 아닐 때 (토큰이 없을 때): 로그인 필요 이벤트 발생
        alert('로그인이 필요한 기능입니다.');
      }
    },
    async submit() {
      const hotelId = this.$route.query.id;
      const reviewPayload = {
        userRatingScore: this.sliderValue,
        content: this.state.form.content,
      };

      // 수정/등록 분기 로직
      const isEditing = !!this.editingReviewId;

      // URL 및 HTTP 메서드 결정
      const url = isEditing
        ? `/api/hotels/${hotelId}/reviews/${this.editingReviewId}` // PUT 엔드포인트 사용
        : `/api/hotels/${hotelId}/reviews`;
      const method = isEditing ? 'put' : 'post'; // 'put' 또는 'post'

      try {
        await aTeamApi[method](url, reviewPayload, { // 동적으로 API 메서드 호출
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        alert(`리뷰가 정상적으로 ${isEditing ? '수정' : '등록'}되었습니다.`);
        this.resetReviewForm(); // 폼 초기화 및 모달 닫기
        window.location.reload(); // API 성공 후 페이지를 새로고침하여 목록 업데이트

      } catch (error) {
        console.error('리뷰 처리 실패:', error);
        alert(`리뷰 ${isEditing ? '수정' : '등록'}을 실패했습니다. 다시 시도해주세요.`);
      }
    },
    openReviewRevisionModal(reviewData) {
      this.editingReviewId = reviewData.reviewId;
      this.sliderValue = reviewData.userRatingScore;
      this.state.form.content = reviewData.content;

      this.writeModalOpen = true;
    },
    // 수정 모달 창을 닫으면 수정했던 내용 날아감
    resetReviewForm() {
      this.editingReviewId = null;
      this.sliderValue = 0;
      this.state.form.content = "";
      this.writeModalOpen = false;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  computed: {
    isUserLoggedIn() {
      // 'token'은 사용자가 로그인 시 저장하는 토큰의 키 이름으로 가정합니다.
      return !!localStorage.getItem('token');
    },
    filterSatisfication() {
      const satisgrade = this.hotelInfo.rating;

      if (satisgrade == 5.0) {
        return 'Amazing';
      } else if (4.0 <= satisgrade && satisgrade < 5.0) {
        return 'Very Good';
      } else if (3.0 <= satisgrade && satisgrade < 4.0) {
        return 'Good';
      } else if (2.0 <= satisgrade && satisgrade < 3.0) {
        return 'Poor';
      } else if (1.0 <= satisgrade && satisgrade < 2.0) {
        return 'Very Poor';
      } else if (0.0 <= satisgrade && satisgrade < 1.0) {
        return 'Terrible';
      } else return '';
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
    roundedRating() {
      // toFixed(1)로 소수 첫째 자리까지 반올림하고 문자열로 반환
      return Number(this.hotelInfo.rating).toFixed(1);
    },
    // 현재 페이지에 표시할 리뷰
    paginatedReviews() {
      if (!this.reviewInfo) return [];
      const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
      const endIndex = startIndex + this.reviewsPerPage;
      return this.reviewInfo.slice(startIndex, endIndex);
    },
    // 전체 페이지 수 계산
    totalPages() {
      if (!this.reviewInfo) return 1;
      return Math.ceil(this.reviewInfo.length / this.reviewsPerPage);
    },
  },
  setup() {
    // 호텔 리뷰 적기 api 로드
    try {
      const state = reactive({
        form: {
          // 1. 사용자 이름은 로그인 된 이름 가져오기
          // 2. 리뷰 평점
          userRatingScore: 0,
          // 3. 리뷰 내용
          content: "",
        },
      });
      return { state };
    } catch (error) {
      console.error('적은 리뷰 정보 로드 실패: ', error);
    }
  },
  watch: {

  }
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
      <span class="hd-city">{{ hotelInfo.city }}</span
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
          <span id="hoteldetail-address" @click="scrollToMap">
            <small>{{ hotelInfo.address }}</small>
          </span>
        </div>

        <!--호텔 리뷰 평점 및 개수-->
        <div class="hoteldetail-rating-count" @click="scrollToReviews">
          <!--호텔 리뷰 평점-->
          <div class="hotel-review-avg">
            <span id="review-rating">{{ roundedRating }}</span>
          </div>
          <!--호텔 만족도-->
          <div class="hoteldetail-satisfaction">
            <b
              ><span id="satisfaction">{{ filterSatisfication }}</span></b
            >
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
<!--              <i-->
<!--                class="bxr"-->
<!--                :class="{-->
<!--                  'bx-heart': !favorite,-->
<!--                  'bx-heart-square': favorite,-->
<!--                }"-->
<!--                :style="{ 'font-size': favorite ? '60px' : '30px', color: '#8ae6b2' }"-->
<!--              ></i>-->

              <i class='bxr' :class="{
              'bx-heart': favoritedata === false,
              'bx-heart-square': favoritedata === true
            }" :style="{ 'font-size': favoritedata ? '60px' : '30px', color: '#8ae6b2' }"></i>
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
        <template v-if="hotelInfo.imageUrls && hotelInfo.imageUrls[1]">
          <img
            :src="getFullImageUrl(hotelInfo.imageUrls[1])"
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
          <template v-if="hotelInfo.roomImageUrls && hotelInfo.roomImageUrls[index - 1]">
            <img
              :src="getFullImageUrl(hotelInfo.roomImageUrls[index - 1])"
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
            <h1>{{ roundedRating }}</h1>
          </div>
          <!--호텔 만족도-->
          <div class="hoteldetail-overview-satisfaction">
            <h2 id="satisfaction">{{ filterSatisfication }}</h2>
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
      <div class="map" ref="map">
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
          <button v-if="remainingCount > 0" class="lastlist" @click="modalOpen = true">
            +{{ remainingCount }} more
          </button>
          <!-- 모달창 열렸을 때 보여주는 amenities -->
          <div v-if="modalOpen" class="modal-background" @click="modalOpen = false">
            <div class="amenities-modal-content" @click.stop>
              <div class="all-amenities-grid">
                <div
                  v-for="(amenity, index) in totalAmenitiesLists"
                  :key="index"
                  class="more-amenities"
                >
                  <img :src="getAmenityIcon(amenity)" alt="amenity icon" class="amenity-icon" />
                  &nbsp;{{ amenity }}
                </div>
              </div>
              <button @click="modalOpen = false" class="amenities-modal-close-btn">
                <i class="bx bx-x"></i>
              </button>
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
          <button id="write-review-btn" @click="reviewAuth" >Give your review</button>
        </div>
        <!-- 모달창이 open 되었을 때 -->
        <div v-if="writeModalOpen" class="modal-background" @click="writeModalOpen = false">
          <div class="review-modal-content" @click.stop>
            <div class="review-title">리뷰 남기기</div>
            <div class="review-rating-title">{{ hotelInfo.name }} 은/는 어떠셨나요?</div>
            <div class="review-rating">
              <span class="review-rating-sliderValue">{{ sliderValue }}점</span>
              <input
                type="range"
                id="priceSlider"
                min="0"
                max="5"
                step="0.5"
                v-model="sliderValue"
              />
              <div class="review-rating-range">
                <span>0점</span>
                <span>5점</span>
              </div>
            </div>
            <div class="writing-review">
              <span class="writing-review-title">다음 여행자를 위해 솔직한 리뷰를 남겨주세요.</span>
              <textarea
                placeholder="리뷰 내용을 입력해주세요."
                class="write-review-textarea"
                v-model="state.form.content"
              ></textarea>
            </div>
            <div class="review-close-register">
              <button @click="writeModalOpen = false" class="review-close-btn">닫기</button>
              <button @click="submit" class="review-register-btn">{{ editingReviewId ? '리뷰 수정' : '리뷰 등록' }}</button>
            </div>
          </div>
        </div>
      </div>

      <div class="reviews-rating-avg">
        <!--리뷰 평점-->
        <div class="reviews-rating">
          <span id="reviews-rating">{{ reviewCount.averageRating }}</span>
        </div>
        <!--리뷰 만족도와 개수-->
        <div class="satis-count">
          <div class="reviews-satisfaction">
            <span id="satisfaction">Very Good</span>
          </div>
          <div class="reviews-count">
            <span id="review-count">{{ reviewCount.totalReviews }}&nbsp;</span>verified reviews
          </div>
        </div>
      </div>

      <!--리뷰 리스트-->
      <ReviewLists v-for="(review, index) in paginatedReviews" :key="index" :reviewInfo="review" @open-revision-modal="openReviewRevisionModal"/>
      <!--리뷰 페이지 처리부분-->
      <div class="review-page">
        <button id="review-back-btn" @click="prevPage" :disabled="currentPage === 1">
          <i class="bxr bx-chevron-left"></i>
        </button>
        {{ currentPage }} of {{ totalPages }}
        <button id="review-next-btn" @click="nextPage" :disabled="currentPage === totalPages">
          <i class="bxr bx-chevron-right"></i>
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
#review-rating {
  font-weight: bold;
}
.review-rating-sliderValue {
  display: flex;
  justify-content: center;
  margin: 10px auto;
  width: 150px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #ff8682;
}
.review-rating-range {
  display: flex;
  justify-content: space-between;
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

.amenities-modal-content {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 1000px;
}
.review-modal-content {
  display: flex;
  text-align: left;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 1000px;
  height: 500px;
}
.review-title {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
}
.review-rating-title {
  font-size: 15px;
  margin-left: 20px;
}
.review-rating {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
}
.writing-review {
  display: flex;
  flex-direction: column;
  margin: 20px;
}
.writing-review-title {
  font-size: 15px;
}
.write-review-textarea {
  text-align: left;
  margin: 10px auto;
  width: 925px;
  height: 120px;
  padding: 10px;
  resize: none;
}
.review-close-register {
  display: flex;
  margin: 0 auto;
  gap: 20px;
}
.review-close-btn {
  background-color: #d3d3d3;
  border: #d3d3d3 solid 1px;
  border-radius: 15px;
  width: 220px;
  height: 50px;
}
.review-close-btn:hover {
  background-color: #9e9a9a;
}
.review-register-btn {
  background-color: #8ae6b2;
  border: #8ae6b2 solid 1px;
  border-radius: 15px;
  width: 220px;
  height: 50px;
}
.review-register-btn:hover {
  background-color: #6acd97;
}
.all-amenities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px 30px;
  width: 100%;
}
.more-amenities {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: auto;
  border-radius: 5px;
  border: #d3d3d3 solid 1px;
}
.amenities-modal-close-btn {
  margin-top: -300px;
  text-align: right;
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
#hoteldetail-address:hover {
  cursor: pointer;
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
  cursor: pointer;
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
  width: 150px;
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
  cursor: pointer;
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
  cursor: pointer;
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
  cursor: pointer;
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
.hoteldetail-rating-count:hover {
  cursor: pointer;
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