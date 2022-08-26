<template>
  <nav class="wrapper">
    <div class="logo nav-item">
      <Logo />
      <router-link class="router-link home" to="/">ROADMAP</router-link>
    </div>
    <div class="nav-item login">
      <router-link class="router-link" to="/login">
        LOGIN/REGISTER
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Logo from "./Icons/Logo.vue";

export default defineComponent({
  name: "Navigation",
  components: { Logo },
});
</script>

<style scoped lang="scss">
nav {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .router-link {
    text-decoration: none;
    color: #364376;
  }
  .home {
    margin-left: 16px;
  }
  .login {
    margin-left: auto;
  }
}
</style>
