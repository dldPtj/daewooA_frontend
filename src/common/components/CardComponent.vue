<script >
import aTeamApi from "@/util/axios";

export default {
  props: {
    cardNumLast: String,
    thru: String,
    cardId: {
      type: [Number, BigInt, String],
      required: true
    }
  },
  methods: {
    async removeCard(){
      await aTeamApi.delete(`/api/payments/me/${Number(this.cardId)}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(async () => {
        alert("삭제 성공");
        window.location.reload();
      }).catch((err)=> {
        console.error(err);
        console.log("삭제 호출 URL:", `/api/payments/me/${this.cardId}`);
      })
    }
  },
};
</script>

<template>
  <button type="button" class = "CardsList">
    <div class="cardListTop">
      <div class="cardPw">**** **** ****
        <div>
          {{ cardNumLast }}
        </div>
      </div>
      <img src="../../assets/Bin.png" alt="" @click="removeCard">
    </div>

    <div class="vailThru">
          <span>
            <a class="thruText">Valid Thru</a>
            <div class="thruInsert">{{ thru }}</div>
          </span>
      <img src="../../assets/visaImg.png" alt="">
    </div>
  </button>
</template>

<style >
.cardListTop{
  display: flex;
  justify-content: space-between;
  height: 61px;
  margin-bottom: 60px;
}
.cardListTop img {
  display: flex;
  width: 24px;
  height: 24px;
}
.cardPw{
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  vertical-align: middle;

}
.cardPw div{
  text-align: left;
}
.vailThru{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 61px;
}
.vailThru span{
  height: 39px;
  display: flex;
  flex-direction: column;
  margin: auto 0;
}
.thruText{
  font-family: Montserrat;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  vertical-align: middle;
}
.thruInsert{
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  vertical-align: middle;

}
.vailThru img{
  display: flex;
  margin: auto 0;
  width: 52px;
  height: 32px;
}


.CardsList{
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 378px;
  height: 212px;
  background-color: #8DD3BB;
  border: none;
}
</style>