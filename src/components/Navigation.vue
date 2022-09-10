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
        <div
          class="profile-list"
          v-if="profileVisible"
          v-click-outside="handleClickOutside"
        >
          <div class="profile-item" @click="handleRoute('/')">
            <UserIcon class="profile-icon" /> <span>Profile Details</span>
          </div>
          <div class="profile-item" @click="handleRoute('/your-roadmaps')">
            <RoadIcon class="profile-icon" /><span>Your Roadmaps</span>
          </div>
          <div class="profile-item" @click="logout">
            <LogoutIcon class="profile-icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Logo from "./Icons/Logo.vue";
import SearchIcon from "./Icons/SearchIcon.vue";
import UserIcon from "./Icons/UserIcon.vue";
import RoadIcon from "./Icons/RoadIcon.vue";
import LogoutIcon from "./Icons/LogoutIcon.vue";

export default defineComponent({
  name: "Navigation",
  data() {
    return {
      profileVisible: false,
    };
  },
  components: { Logo, SearchIcon, UserIcon, RoadIcon, LogoutIcon },
  methods: {
    logout() {
      this.$store.commit("clearUser");
      this.$router.push({ name: "Login" });
    },
    handleProfileVisible() {
      this.profileVisible = !this.profileVisible;
    },
    handleClickOutside() {
      this.profileVisible = !this.profileVisible;
    },
    handleRoute(route: string) {
      this.profileVisible = false;
      this.$router.push(route);
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
    color: #2c3e50;
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
    fill: #2c3e50;
  }
  .search-bar {
    border: 1px solid #2c3e50;
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
      transition: border-radius 0.1s ease-in;
      &:hover {
        border-radius: 8px;
      }
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

      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-weight: 300;
      .profile-item {
        padding: 4px 0px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        text-decoration: none;
        font-weight: 400;
        &:hover {
          color: #f5dd90;
          & > .profile-icon {
            fill: #f5dd90;
          }
        }
        .profile-icon {
          fill: #fff;
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }
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
