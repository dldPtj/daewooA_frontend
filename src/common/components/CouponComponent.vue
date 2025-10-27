<script>

export default {
  props: {
    id: Number,
    name: String,
    expiryDate: String,
    discountAmount: Number,
    item: Object,
  },
  data(){
    return{
      couponeSelected: this.item.selected,
    };
  },
  mounted() {
    localStorage.setItem("couponId",this.id);
  },
  methods:{
    toggleSelected(){
      this.$emit("discount-amount",{
        ...this.item, selected: this.couponeSelected,
      });
    }
  }
}
</script>

<template>
  <div class="couponList">
    <input type="radio" name="coupon" style="width: 20px; height: 20px; margin: auto 0"
          :value="item.name"
          :checked="item.name === selectedItemName"
          @change="selectItem">
    <div class="couponMain">
      <div>{{ name }}</div>
      <div>만료일: {{ expiryDate }}</div>
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