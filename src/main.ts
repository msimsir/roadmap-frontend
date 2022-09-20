import { createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http/HttpLink";
import vClickOutside from "click-outside-vue3";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const httpLink = new HttpLink({ uri: process.env.VUE_APP_APOLLO_CLIENT_URI });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([authMiddleware, httpLink]),
});

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(store)
  .use(router)
  .use(vClickOutside)
  .mount("#app");
