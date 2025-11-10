<template>
  <div class="Img_right">
    <img src="../assets/homepage-mainhotel-1.png" alt="hotel image" class="slide" :class="{ active: currentSlide === 0 }" />
    <img src="../assets/homepage-mainhotel-2.jpg" alt="hotel image" class="slide" :class="{ active: currentSlide === 1 }" />
    <img src="../assets/homepage-mainhotel-3.jpg" alt="hotel image" class="slide" :class="{ active: currentSlide === 2 }" />

    <div class="dots">
      <span
        v-for="(dot, i) in 3"
        :key="i"
        class="dot"
        :class="{ active: currentSlide === i }"
        @click="setSlide(i)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageSliderComponent', // 컴포넌트 이름을 지정합니다.
  data() {
    return {
      currentSlide: 0, // 현재 활성화된 슬라이드 인덱스 (0, 1, 2)
      slideInterval: null, // setInterval의 ID를 저장할 변수
      totalSlides: 3, // 전체 슬라이드 개수
    };
  },
  mounted() {
    // 컴포넌트가 마운트된 후 슬라이드쇼를 시작합니다.
    this.startSlideShow();
  },
  beforeUnmount() {
    // 컴포넌트가 파괴되기 전에 반드시 Interval을 해제하여 메모리 누수를 방지합니다.
    clearInterval(this.slideInterval);
  },
  methods: {
    startSlideShow() {
      // 3초마다 슬라이드를 전환합니다.
      this.slideInterval = setInterval(() => {
        // 현재 슬라이드 인덱스를 증가시키고, 전체 개수로 나눈 나머지를 사용해 순환시킵니다.
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      }, 3000);
    },
    setSlide(index) {
      // 점을 클릭했을 때 해당 인덱스로 슬라이드를 직접 설정합니다.
      this.currentSlide = index;
    },
  },
};
</script>

<style scoped>
/* ======================== 래퍼 (.Img_right) 스타일 ======================== */
.Img_right {
  /* width: 400px; // 부모 레이아웃에 맞게 조절 */
  /* height: 350px; // 부모 레이아웃에 맞게 조절 */
  width: 1240px;
  height: 540px;
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: transparent;
  margin-right: 25px;
  margin-top: 125px;
}

/* ======================== 이미지 (.Img_right img) 스타일 ======================== */
.Img_right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  position: absolute;
  /* 기본적으로 투명하게 설정 */
  opacity: 0;
  transition: opacity 1s ease-in-out;
  border-radius: 30px;
}

/* 현재 활성화된 이미지에만 적용되어 보이도록 함 */
.Img_right img.active {
  opacity: 1;
}

/* ======================== 점 (dots) 스타일 (추가 필요) ======================== */
.dots {
  position: absolute;
  bottom: 20px; /* 아래에서 띄우기 */
  display: flex;
  gap: 10px;
  z-index: 10; /* 이미지 위에 표시되도록 z-index 설정 */
}

.dot {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.5); /* 비활성화된 점 색상 */
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: white; /* 활성화된 점 색상 */
}
</style>