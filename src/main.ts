import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./index.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faAppleWhole,
  faDollar,
  faDollarSign,
  faSadCry,
  faShip,
  faSmile,
  faArrowRotateForward,
  faEnvelope,
  faUser,
  faBriefcaseClock,
  faBars,
  faWindowClose,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
  faGoogle,
  faAppleWhole,
  faSmile,
  faSadCry,
  faShip,
  faDollar,
  faDollarSign,
  faArrowRotateForward,
  faTwitter,
  faEnvelope,
  faUser,
  faBriefcaseClock,
  faBars,
  faCaretDown,
  faCaretUp,
  faWindowClose
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => app.mount("#app"));
