<script>
import aTeamApi from '@/util/axios';

export default {
  name: 'ReviewLists',
  data() {
    return {
      identity: false,
      writeModalOpen: false,
    }
  },
  props: {
    reviewInfo: {
      type: Array,
      default: () => []
    },
  },
  async mounted() {
    // 로그인 상태 확인
    if (this.isUserLoggedIn) {
      try {
        const res = await aTeamApi.get('/api/users/me/profileAll', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = res.data;
        this.userId = data.content.userId;

        // 리뷰 작성자와 현재 로그인 유저가 일치하는지 확인
        // reviewInfo에 리뷰 작성자의 userId가 포함되어 있어야 합니다.
        if (this.reviewInfo.userId === this.userId) {
          this.identity = true;
        } else {
          this.identity = false;
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
        this.identity = false;
      }
    } else {
      this.identity = false; // 로그인이 안 되어 있으면 identity는 false (신고 버튼만 보임)
    }
  },
  methods: {
    async reportYN() {
      const hotelId = this.$route.query.id;
      if(this.isUserLoggedIn) {
        if(window.confirm('해당 리뷰 글을 신고하시겠습니까?')) {
          try {
            await aTeamApi.post(`/api/hotels/${hotelId}/reviews/${this.reviewInfo.reviewId}/report`, null, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            alert('신고가 완료되었습니다.');
          } catch (error) {
            console.error('신고 실패:', error);
            alert('이미 신고가 완료된 리뷰입니다.');
          }
        } else {
          alert('신고가 취소되었습니다.')
        }
      } else {
        alert('로그인이 필요한 기능입니다.');
      }
    },
    async deleteMyReview(){
      const hotelId = this.$route.query.id;
      await aTeamApi.delete(`/api/hotels/${hotelId}/reviews/${this.reviewInfo.reviewId}?userId=${this.reviewInfo.userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(async () => {
        if(window.confirm('리뷰를 정말 삭제하시겠습니까?')) {
          alert('리뷰가 삭제되었습니다.');
          window.location.reload();
        } else {
          alert('리뷰 삭제를 취소하였습니다.')
        }
      }).catch((err)=> {
        console.error(err);
        console.log("리뷰 삭제 에러 :", `/api/hotels/${hotelId}/reviews/${this.reviewInfo.reviewId}`);
      })
    },
    reviewRevise() {
      this.$emit('open-revision-modal', {
        reviewId: this.reviewInfo.reviewId, // 수정할 리뷰 ID
        userRatingScore: this.reviewInfo.userRatingScore, // 기존 평점
        content: this.reviewInfo.content, // 기존 내용
      });
    }
  },
  computed: {
    filterSatisfication() {
      const satisgrade = this.reviewInfo.userRatingScore;

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
    ImageUrl() {
      const baseUrl = process.env.VUE_APP_API_URL; // 환경변수 사용
      return this.reviewInfo.imageUrl
        ? `${baseUrl}${this.reviewInfo.imageUrl}`
        : "";
    },
    isUserLoggedIn() {
      // 'token'은 로그인 시 저장되는 토큰의 키 이름으로 가정
      return !!localStorage.getItem('token');
    },
  }
}
</script>

<template>
  <div class="review-lists">
    <!--리뷰 내용(프로필, 리뷰평점, 이름, 리뷰내용)-->
    <div class="review-info">
      <img :src="ImageUrl" class="review-profile">
      <div class="review-info-in">
        <div class="reviewer-rating-name">
          <span id="review-rating">{{ reviewInfo.userRatingScore }} {{ filterSatisfication }}</span> | {{ reviewInfo.userName }}
        </div>
        <div class="review-content">
          {{ reviewInfo.content }}
        </div>
      </div>
  </div>
    <!--리뷰 신고버튼-->
    <div class="review-report" v-if="identity === false" >
      <button class="review-report-btn" @click="reportYN()">
        <i class='bxr bx-flag-alt-2'></i>
      </button>
    </div>
    <div class="review-revise-delete" v-if="identity === true" style="display: flex; gap: 10px;">
      <button class="review-report-btn" @click="reviewRevise()">
        <i class='bxr  bx-edit'></i>
      </button>
      <button class="review-report-btn" @click="deleteMyReview()">
        <i class='bxr  bx-trash'></i>
      </button>
    </div>
  </div>
</template>

<style>
.review-report-btn {
  font-size: 24px;
  background-color: white;
  border: white;
}
.review-report-btn:hover {
  cursor: pointer;
}
.review-profile {
  background-color: #8ae6b2;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
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
  border-bottom: #d9d9d9 solid 1px;
}
</style>