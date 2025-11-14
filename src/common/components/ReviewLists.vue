<script>
export default {
  name: 'ReviewLists',
  props: {
    reviewInfo: {
      type: Array,
      default: () => []
    },
  },
}
</script>

<template>
  <div class="review-lists">
    <!--리뷰 내용(프로필, 리뷰평점, 이름, 리뷰내용)-->
    <div class="review-info">
      <div class="review-profile"></div>
      <div class="review-info-in">
        <div class="reviewer-rating-name">
          <span id="review-rating">{{ reviewInfo.userRatingScore }} Amazing</span> | {{ reviewInfo.userName }}
        </div>
        <div class="review-content">
          {{ reviewInfo.content }}
        </div>
      </div>
    </div>
    <!--리뷰 신고버튼-->
    <button class="review-report-btn">
      <i class="bxr bx-flag-alt-2"></i>
    </button>
  </div>
</template>

<style>
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
  border-bottom: #d9d9d9 solid 1px;
}
</style>