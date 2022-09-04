<template>
  <div class="app">
    <Navigation v-if="!navigation" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "./components/Navigation.vue";

export default defineComponent({
  name: "app",
  data() {
    return {
      navigation: null as null | boolean,
    };
  },
  components: { Navigation },
  methods: {
    checkRoute() {
      if (this.$route.name === "Login") {
        this.navigation = true;
      } else {
        this.navigation = false;
      }
    },
  },
  created() {
    const user = this.localUser ? JSON.parse(this.localUser) : null;
    if (user) {
      this.$store.commit("setUser", user);
    } else {
      this.$store.commit("clearUser");
    }
    this.checkRoute();
  },
  computed: {
    localUser() {
      return localStorage.getItem("user");
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap");
@import "@braks/vue-flow/dist/style.css";
@import "@braks/vue-flow/dist/theme-default.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Sora", sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.wrapper {
  padding: 0px;
  margin: 16px 64px;
  @media screen and (max-width: 720px) {
    margin: 16px 32px;
  }

  @media screen and (max-width: 600px) {
    margin: 16px 16px;
  }
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
