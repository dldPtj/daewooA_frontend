import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";


const roomId = localStorage.getItem("roomId");
const checkInDate = localStorage.getItem("checkin");
const checkOutDate = localStorage.getItem("checkout");

// ✅ 날짜 포맷 변환
const formatCheckInDate = dayjs(checkInDate).format("YYYY-MM-DD");
const formatCheckOutDate = dayjs(checkOutDate).format("YYYY-MM-DD");

let totalPrice;

try {
    const result = await axios.get(
        `http://localhost:18888/api/reservations/preview?roomId=${roomId}&checkInDate=${formatCheckInDate}&checkOutDate=${formatCheckOutDate}`
        , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });

    // Spring Boot 응답 형식에 맞춰 처리
    let data = result.data.content || result.data;
    totalPrice = data.totalPrice;
    console.log("💰 결제 정보:", data);
} catch (error) {
    console.error("❌ 결제 정보 불러오기 실패:", error);
    alert("결제 금액 정보를 불러올 수 없습니다.");
}

// ✅ 1. 본인 계정의 '결제위젯'용 클라이언트 키로 교체하세요.
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
//이부분은 하드코딩되어있는 총 가격입니다 http://localhost:8888/api/reservations/preview 에 있는 총 가격이 들어와야합니다.
let amount = { currency: "KRW", value: totalPrice };



// ✅ 2. import 대신 TossPayments를 직접 사용합니다.
const tossPayments = TossPayments(clientKey);
const widgets = tossPayments.widgets({
    customerKey: "some_random_customer_key" // ANONYMOUS 대신 임의의 키 사용
});

// ✅ 3. async/await를 사용하지 않아도 되므로 main 함수를 제거하고 바로 실행합니다.
widgets.setAmount(amount);

widgets.renderPaymentMethods({
    selector: "#payment-method",
    variantKey: "DEFAULT",
});

widgets.renderAgreement({
    selector: "#agreement",
    variantKey: "AGREEMENT"
});

const paymentRequestButton = document.getElementById('payment-request-button');

paymentRequestButton.addEventListener('click', () => {
    widgets.requestPayment({
        orderId: "order_" + new Date().getTime(),
        orderName: "호텔 예약 테스트",
        successUrl: window.location.origin + "/success.html",
        failUrl: window.location.origin + "/fail.html",
    });
});