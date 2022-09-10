import { createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import vClickOutside from "click-outside-vue3";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  uri: process.env.VUE_APP_APOLLO_CLIENT_URI,
});

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(store)
  .use(router)
  .use(vClickOutside)
  .mount("#app");
