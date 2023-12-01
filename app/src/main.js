import "./assets/main.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { createApp } from "vue";
import App from "./App.vue";

// Esercizi:
// 1) Configurare app vue:
//  1.1) Aggiungere pinia
//  1.2) Aggiungere router
// 2) Configurare stores:
//  2.1) Sistemare store di autenticazione
//  2.2) Sistemare store di prenotazioni
//  2.3) Sistemare store di stanze
// 3) Configurare composables:
//  3.1) Sistemare axios
// 4) Routing:
//  4.1) Sistemare layouts
//  4.2) Sistemare pagine
//  4.3) Sistemare guards
// 5) Sistemare componenti:
//  5.1) Risolvere imports
//  5.2) Sistemare logica login form
//  5.3) Sistemare TextField
//  5.4) Sistemare PasswordField
//  5.5) Sistemare IconInput
//  5.5) Sistemare Content
// 6) Sistemare pagine:
//  6.1) Sistemare LoginView
//  6.2) Sistemare Home
//  6.3) Sistemare RoomDetail
//  6.4) Sistemare MyBookings
// 7) Colleghiamoci al BE:
//  7.1) Autentichiamoci con il be
//  7.2) Aggiungere token su axios
//  7.3) Sistemare bookings store per usare be
//  7.4) Sistemare rooms store per usare be

const app = createApp(App);
app.mount("#app");
