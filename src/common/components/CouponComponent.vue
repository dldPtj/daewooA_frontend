<script>

export default {
  props: {
    item: Object,
    selectedItemId: Number,
  },

  mounted() {

  },
  methods:{
    selectItem(){
      this.$emit("select-item",this.item);
    },
  },
};
</script>

<template>
  <div class="couponList">
    <input type="radio" name="coupon" style="width: 20px; height: 20px; margin: auto 0"
          :value="item.name"
          :checked="item.id === selectedItemId"
          @change="selectItem">
    <div class="couponMain">
      <div>{{ item.name }}</div>
      <div>만료일: {{ item.expiryDate }}</div>
    </div>
  </div>

</template>

<style>
.couponMain{
  display: flex;
  flex-direction: column;
  gap: 6px
}
#couponTitle {
  display: flex;
}
#couponTitle a{
  font-family: Noto Sans;
  font-weight: 700;
  font-size: 21px;
  line-height: 100%;
}
.couponList{
  display: flex;
  background: #8DD3BB;
  min-height: 50px;
  border-radius: 8px;
  padding: 13px;
  text-align: left;
  gap: 12px;
  margin: 20px 0 0 ;
}


</style>