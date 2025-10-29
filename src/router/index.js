import { createRouter, createWebHistory } from 'vue-router';

// 뷰 컴포넌트 import
import HomePage from "../page/HomePage.vue";
import HotelSearchPage from '../page/HotelSearchPage.vue';
import HeaderComponent from '../common/components/HeaderComponent.vue';
import FooterComponent from "../common/components/FooterComponent.vue";
import HotelDetailPage from '../page/HotelDetailPage.vue';
import ProfileComponent from "@/common/components/ProfileComponent.vue";
import PaymentPage from '../page/PaymentPage.vue';
import FavoritesPage from '../page/FavoritesPage.vue';
import AccountPage from '../page/AccountPage.vue';
import ReservationPage from '../page/ReservationPage.vue';
import PaymentAdd from '../page/PaymentAdd.vue';
import LoginPage from '../page/LoginPage.vue';
import SignUpPage from '../page/SignUpPage.vue';
import FindPw from '../page/FindPw.vue';
import IdentificationPage from '../page/IdentificationPage.vue';
import Resetpw from '../page//ResetPw.vue';
import ReservationComponent from '../common/components/ReservationComponent.vue'
import AddCardComponent from "@/common/components/AddCardComponent.vue";
import logoutHeaderComponent from "@/common/components/LogoutHeaderComponent.vue";
import LoginHeaderComponent from "@/common/components/LoginHeaderComponent.vue";
import LeavePhoneNum from  "@/common/components/LeavePhoneNum.vue";
import TosspageMoveComponent from "@/common/components/TosspageMoveComponent.vue"
import CouponComponent from "@/common/components/CouponComponent.vue"
import TicketPage from  "@/page/TicketPage.vue"

const router = createRouter({
    history: createWebHistory(),

    routes: [
        { path: '/', name: 'homepage', component: HomePage },
        { path: '/hotelsearchpage', name: 'hotelsearchpage', component: HotelSearchPage },
        { path: '/headercomponent', name: 'headercomponent', component: HeaderComponent },
        { path: '/FooterComponent', name: 'FooterComponent', component: FooterComponent },
        { path: '/hoteldetailpage', name: 'hoteldetailpage', component: HotelDetailPage }, //path 수정하지 말아주세요
        { path: '/ProfileComponent', name: 'ProfileComponent', component: ProfileComponent },
        { path: '/paymentpage', name: 'paymentpage', component: PaymentPage },
        { path: '/favoritespage', name: 'favoritespage', component: FavoritesPage },
        { path: '/account', name: 'account', component: AccountPage },
        { path: '/reservation', name: 'reservation', component: ReservationPage},
        { path: '/paymentadd', name: 'paymentadd', component: PaymentAdd },
        { path: '/loginpage', name: 'loginpage', component: LoginPage },
        { path: '/signup', name: 'signup', component: SignUpPage },
        { path: '/findpw', name: 'findpw', component: FindPw },
        { path: '/identification', name: 'identification', component: IdentificationPage },
        { path: '/resetpw', name: 'resetpw', component: Resetpw },
        { path: '/reservationComponent', name: 'reservationComponent', component: ReservationComponent },
        { path: '/addCardComponent', name: 'addCardComponent', component: AddCardComponent },
        { path: '/logoutHeaderComponent', name: 'logoutHeaderComponent', component: logoutHeaderComponent },
        { path: '/loginHeaderComponent', name: 'loginHeaderComponent', component: LoginHeaderComponent },
        { path: '/leavePhoneNum', name: 'leavePhoneNum', component: LeavePhoneNum },
        { path: '/tosspagemoveComponent', name: 'tosspagemoveComponent', component: TosspageMoveComponent },
        { path: '/couponComponent', name: 'couponComponent', component: CouponComponent },
        { path: '/ticketPage', name: 'ticketPage', component: TicketPage },

    ],
});

export default router;
