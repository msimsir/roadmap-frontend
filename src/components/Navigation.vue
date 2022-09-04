<template>
  <nav class="wrapper">
    <div class="logo nav-item">
      <Logo />
      <router-link class="router-link home" to="/">ROADMAP</router-link>
    </div>
    <div class="nav-item search-item">
      <input class="search-bar" placeholder="Search Roadmap" />
      <SearchIcon class="icon" />
    </div>
    <div class="nav-item login" v-if="!user">
      <router-link class="router-link" to="/login">SIGN IN</router-link>
    </div>
    <div class="nav-item" v-if="user">
      <div class="profile-container">
        <span class="box" @click="handleProfileVisible">{{ profile }}</span>
        <div class="profile-list" v-if="profileVisible">
          <p>Profile Details</p>
          <p>Your Roadmaps</p>
          <p @click="logout">Logout</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Logo from "./Icons/Logo.vue";
import SearchIcon from "./Icons/SearchIcon.vue";

export default defineComponent({
  name: "Navigation",
  data() {
    return {
      profileVisible: false,
    };
  },
  components: { Logo, SearchIcon },
  methods: {
    logout() {
      this.$store.commit("clearUser");
      this.$router.push({ name: "Login" });
    },
    handleProfileVisible() {
      this.profileVisible = !this.profileVisible;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    profile() {
      if (this.$store.state.user) {
        return (
          this.$store.state.user.firstName?.slice(0, 1) +
          this.$store.state.user.lastName?.slice(0, 1)
        );
      } else {
        return null;
      }
    },
  },
});
</script>

<style scoped lang="scss">
nav {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .router-link {
    text-decoration: none;
    color: #364376;
    cursor: pointer;
  }
  .search-item {
    position: relative;
  }
  .icon {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 16px;
    height: 16px;
    fill: #364376;
  }
  .search-bar {
    border: 1px solid #364376;
    border-radius: 8px;
    outline: none;
    height: 32px;
    padding: 8px 12px;
    width: 500px;
    max-width: 100%;

    @media screen and (max-width: 900px) {
      width: 300px;
    }
  }

  .profile-container {
    position: relative;
    .box {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      background-color: #f5dd90;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .profile-list {
      border-radius: 8px;
      width: 200px;
      min-height: 80px;
      position: absolute;
      background: #2c3e50;
      top: 40px;
      right: 0px;
      z-index: 400;
      color: #fff;
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-weight: 300;
      p {
        padding: 4px 0px;
        cursor: pointer;
      }
    }
  }
  .home {
    margin-left: 16px;
  }
  .login {
    background-color: #f5dd90;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
  }
}
</style>
