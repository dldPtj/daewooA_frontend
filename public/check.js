// check.js
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"; // 토스 테스트 키
const tossPayments = TossPayments(clientKey); // ✅ v2에서는 TossPayments 바로 사용 가능

// ✅ localStorage에서 예약 정보 읽기
const roomId = localStorage.getItem("roomId");
const checkInDate = localStorage.getItem("checkin");
const checkOutDate = localStorage.getItem("checkout");

// ✅ 날짜 포맷 변환
const formatCheckInDate = dayjs(checkInDate).format("YYYY-MM-DD");
const formatCheckOutDate = dayjs(checkOutDate).format("YYYY-MM-DD");

// ✅ 결제 금액 조회
let paymentData = {totalPrice: 0, hotelName: "호텔 예약 테스트"};

try {
    const result = await axios.get(
        `http://localhost:18888/api/reservations/preview?roomId=${roomId}&checkInDate=${formatCheckInDate}&checkOutDate=${formatCheckOutDate}`
        , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });

    // Spring Boot 응답 형식에 맞춰 처리
    paymentData = result.data.content || result.data;
    console.log("💰 결제 정보:", paymentData);
} catch (error) {
    console.error("❌ 결제 정보 불러오기 실패:", error);
    alert("결제 금액 정보를 불러올 수 없습니다.");
}

// ✅ 결제 금액 객체
const amount = {
    currency: "KRW",
    value: 100 ?? 100,
};

// ✅ 결제 위젯 생성
const widgets = tossPayments.widgets({
    customerKey: "customer_" + Date.now(),
});

// ✅ 금액 및 결제수단 렌더링
await widgets.setAmount(amount);

await widgets.renderPaymentMethods({
    selector: "#payment-method",
    variantKey: "DEFAULT",
});

await widgets.renderAgreement({
    selector: "#agreement",
    variantKey: "AGREEMENT",
});

// ✅ 결제 버튼 클릭 시 결제 요청
document
    .getElementById("payment-request-button")
    .addEventListener("click", async () => {
        try {
            await widgets.requestPayment({
                orderId: "order_" + new Date().getTime(),
                orderName: paymentData.hotelName || "호텔 예약 테스트",
                successUrl: window.location.origin + "/success.html",
                failUrl: window.location.origin + "/fail.html",
            });
        } catch (err) {
            console.error("❌ 결제 요청 실패:", err);
            alert("결제 요청 중 오류가 발생했습니다.");
        }
    });
