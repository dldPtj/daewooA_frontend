import { createRouter, createWebHistory } from 'vue-router';

// 뷰 컴포넌트 import
import PageMove from '../page/PageMove.vue';
import HomePage from "../page/HomePage.vue";
import HotelSearchPage from '../page/HotelSearchPage.vue';
import HeaderComponent from '../common/components/HeaderComponent.vue';
import FooterComponent from "../common/components/FooterComponent.vue";
import HotelDetailPage from '../page/HotelDetailPage.vue';
import ProfileComponent from "@/common/components/ProfileComponent.vue";
// import PaymentPage from '../components/PaymentPage.vue';
import FavoritesPage from '../page/FavoritesPage.vue';
import AccountPage from '../page/AccountPage.vue';
import ReservationPage from '../page/ReservationPage.vue';
import PaymentAdd from '../page/PaymentAdd.vue';
import LoginPage from '../page/LoginPage.vue';
// import SignUp from '../components/SignUp.vue';
// import FirstPaymentAdd from '../components/FirstPaymentAdd.vue';
// import Findpw from '../components/Findpw.vue';
// import Identification from '../components/Identification.vue';
// import Resetpw from '../components/Resetpw.vue';
import ReservationComponent from '../common/components/ReservationComponent.vue'
import AddCardComponent from "@/common/components/AddCardComponent.vue";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        { path: '/', name: 'pagemove', component: PageMove },
        { path: '/homepage', name: 'homepage', component: HomePage },
        { path: '/hotelsearchpage', name: 'hotelsearchpage', component: HotelSearchPage },
        { path: '/headercomponent', name: 'headercomponent', component: HeaderComponent },
        { path: '/FooterComponent', name: 'FooterComponent', component: FooterComponent },
        { path: '/hoteldetailpage', name: 'hoteldetailpage', component: HotelDetailPage },
        { path: '/ProfileComponent', name: 'ProfileComponent', component: ProfileComponent },
        // { path: '/paymentpage', name: 'paymentpage', component: PaymentPage },
        { path: '/favoritespage', name: 'favoritespage', component: FavoritesPage },
        { path: '/account', name: 'account', component: AccountPage },
        { path: '/reservation', name: 'reservation', component: ReservationPage },
        { path: '/paymentadd', name: 'paymentadd', component: PaymentAdd },
        { path: '/loginpage', name: 'loginpage', component: LoginPage },
        // { path: '/signup', name: 'signup', component: SignUp },
        // { path: '/firstpaymentadd', name: 'firstpaymentadd', component: FirstPaymentAdd },
        // { path: '/findpw', name: 'findpw', component: Findpw },
        // { path: '/identification', name: 'identification', component: Identification },
        // { path: '/resetpw', name: 'resetpw', component: Resetpw },
        { path: '/reservationComponent', name: 'reservationComponent', component: ReservationComponent },
        { path: '/addCardComponent', name: 'addCardComponent', component: AddCardComponent },

    ],
});

export default router;
