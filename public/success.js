import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";


const roomId2 = localStorage.getItem("roomId");
const checkInDate = localStorage.getItem("checkin");
const checkOutDate = localStorage.getItem("checkout");
const couponID = localStorage.getItem("couponId")

const formatCheckInDate = dayjs(checkInDate).format("YYYY-MM-DD");
const formatCheckOutDate = dayjs(checkOutDate).format("YYYY-MM-DD");


// success.js
const urlParams = new URLSearchParams(window.location.search);
const paymentKey = urlParams.get("paymentKey");
const orderId = urlParams.get("orderId");
const amount = urlParams.get("amount");

// 화면에 결제 정보 표시
document.getElementById("paymentKey").textContent = paymentKey;
document.getElementById("orderId").textContent = orderId;
document.getElementById("amount").textContent = `${amount}원`;

// 로딩 화면과 성공 화면 DOM 요소
const confirmLoadingSection = document.querySelector('.confirm-loading');
const confirmSuccessSection = document.querySelector('.confirm-success');


// 백엔드에 최종 결제 승인을 요청하는 함수
async function confirmPayment() {
    // 백엔드의 FinalPaymentRequestDto 형식에 맞게 데이터 구성
    const requestData = {
        paymentKey: paymentKey,
        orderId: orderId,
        amount: Number(amount),

        // 이것또한 하드코딩되어있는 3개의 정보입니다 실제 서비스에서는 이 값들을 이전 페이지에서 넘겨받아야 합니다.
        roomId: Number(roomId2),
        checkInDate: formatCheckInDate,
        checkOutDate: formatCheckOutDate,
        couponId: Number(couponID),
    };

    try {
        // ✅ 우리 백엔드 서버의 /api/pay 주소로 요청
        const response = await axios.post(
            "http://localhost:18888/api/pay",
            requestData, // 👈 1. 실제 데이터
            {              // 👈 2. 설정
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        if (response.status >= 200 && response.status < 300) {
            // 성공 시 UI 변경
            confirmLoadingSection.style.display = 'none';
            confirmSuccessSection.style.display = 'flex';
            console.log("✅ 최종 승인 성공!", response.data);
        }
    } catch (error) {
        // Axios는 실패 시 error.response가 존재함
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || "알 수 없는 오류";
            console.error(error.response);
            window.location.href = `/fail.html?message=${message}&code=${status}`;
        }else{
        console.error("결제 승인 요청 중 네트워크 오류 발생:", error);
        if (!roomId2) alert("roomId가 비어 있습니다!");
        window.location.href = `/fail.html?message=서버 연결에 실패했습니다.&code=NETWORK_ERROR`;
        }
    }
}

// ✅ success.html의 '결제 승인하기' 버튼에 클릭 이벤트 연결
const confirmPaymentButton = document.getElementById('confirmPaymentButton');
confirmPaymentButton.addEventListener('click', confirmPayment);