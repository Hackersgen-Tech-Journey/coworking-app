import "./assets/main.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";
import router from "./router";
// Esercizi:
// 1) Configurare app vue:
//  1.1) Aggiungere pinia X
//  1.2) Aggiungere router X
// 2) Configurare stores:
//  2.1) Sistemare store di autenticazione X
//  2.2) Sistemare store di prenotazioni X
//  2.3) Sistemare store di stanze X
// 3) Configurare composables:
//  3.1) Sistemare axios X
// 4) Routing:
//  4.1) Sistemare layouts X
//  4.2) Sistemare pagine X
//  4.3) Sistemare guards X
// 5) Sistemare componenti:
//  5.1) Risolvere imports X
//  5.2) Sistemare logica login form X
//  5.3) Sistemare TextField X
//  5.4) Sistemare PasswordField X
//  5.5) Sistemare IconInput X
//  5.5) Sistemare Content X
// 6) Sistemare pagine:
//  6.1) Sistemare LoginView X
//  6.2) Sistemare Home X
//  6.3) Sistemare RoomDetail X
//  6.4) Sistemare MyBookings X
// 7) Colleghiamoci al BE:
//  7.1) Autentichiamoci con il be X
//  7.2) Aggiungere token su axios X
//  7.3) Sistemare bookings store per usare be X
//  7.4) Sistemare rooms store per usare be X
// BONUS
// 8) Rifiniture:
//  8.1) Gestire meglio il composable di axios
//  8.2) Gestire gli errori del backend
//  8.3) Caricare i dati ogni n secondi
//  8.4) Gestire logout
//  8.5) Preparare l'applicativo al deploy

const app = createApp(App);
app.use(createPinia());
app.use(router);
const authStore = useAuthStore();
authStore.init();
app.mount("#app");
