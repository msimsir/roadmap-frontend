<template>
  <div class="login-page">
    <div class="form-container" :class="{ 'register-form': isRegisterForm }">
      <img
        src="../assets/roadmap-login.jpg"
        alt="login-img"
        class="login-img"
      />
      <router-link class="logo-container" to="/">
        <Logo />
      </router-link>
      <h3 class="login-header">
        {{
          isRegisterForm ? "Create Your Roadmap Account" : "Login to Roadmap"
        }}
      </h3>
      <form class="form">
        <div class="form-element" v-show="isRegisterForm">
          <UserIcon class="icon" />
          <input placeholder="First name" v-model="userForm.firstName" />
        </div>
        <div class="form-element" v-show="isRegisterForm">
          <UserIcon class="icon" />
          <input placeholder="Last name" v-model="userForm.lastName" />
        </div>
        <div class="form-element" v-show="isRegisterForm">
          <UserIcon class="icon" />
          <input placeholder="Username" v-model="userForm.username" />
        </div>
        <div class="form-element">
          <EnvelopeIcon class="icon" />
          <input placeholder="Email" type="email" v-model="userForm.email" />
        </div>
        <div class="form-element">
          <LockIcon class="icon" />
          <input
            placeholder="Password"
            type="password"
            v-model="userForm.password"
          />
        </div>
        <div class="form-element">
          <button @click.prevent="signUp" class="login-button">SIGN UP</button>
        </div>
      </form>
      <p></p>
      <p>
        {{
          isRegisterForm ? "Already have an account?" : "Don't have an account?"
        }}
        <span class="register-link" @click.prevent="switchForm">
          {{ isRegisterForm ? "Login" : "Register" }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_ROADMAP_QUERY } from "../graphql/documents";
import Logo from "../components/Icons/Logo.vue";
import EnvelopeIcon from "../components/Icons/EnvelopeIcon.vue";
import LockIcon from "../components/Icons/LockIcon.vue";
import UserIcon from "../components/Icons/UserIcon.vue";
import { IUser } from "../types";

export default defineComponent({
  name: "Login",
  data() {
    return {
      isRegisterForm: false,
      userForm: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      } as IUser,
    };
  },
  components: { Logo, EnvelopeIcon, LockIcon, UserIcon },
  setup() {
    const variables = ref({
      id: "62febf73e2e217070cb78a80",
    });
    const { result } = useQuery(GET_ROADMAP_QUERY, variables);
    console.log("result", result);
  },
  methods: {
    switchForm() {
      this.isRegisterForm = !this.isRegisterForm;
    },
    signIn() {
      console.log("signin");
    },
    signUp() {
      console.log("signup");
    },
  },
});
</script>

<style lang="scss" scoped>
.login-page {
  margin: 0px;
  height: 100vh;
  width: 100%;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  width: 500px;
  height: 540px;
  -webkit-box-shadow: 10px 1px 6px -3px rgba(0, 0, 0, 0.55);
  box-shadow: 10px 1px 6px -3px rgba(0, 0, 0, 0.55);

  @media screen and (max-width: 600px) {
    height: 100vh;
    border-radius: 0px;
  }
  .register-link {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      font-weight: 500;
    }
  }
  & > p {
    font-size: 12px;
  }
}

.register-form {
  height: 680px;
  @media screen and (max-width: 600px) {
    height: 100vh;
    border-radius: 0px;
  }
}

.logo-container {
  margin-top: 16px;
  cursor: pointer;
}

.login-header {
  margin-top: 16px;
}
.form {
  padding: 16px;
  .form-element {
    width: 100%;
    margin-bottom: 16px;
    position: relative;
    &:focus-within {
      .icon {
        opacity: 1;
      }
    }
    & > input {
      width: 100%;
      color: #2c3e50;
      border: none;
      outline: none;
      background: #eaecf1;

      border-radius: 4px;
      padding: 8px 12px 8px 32px;
      &::placeholder {
        color: #2c3e50;
        opacity: 1;
      }
    }
    .icon {
      width: 16px;
      height: 16px;
      position: absolute;
      left: 6px;
      top: 8px;
      fill: #2c3e50;
      opacity: 0.6;
      transition: opacity 0.6s ease;
    }

    &:last-child {
      align-items: center;
    }
  }
  .login-button {
    background: #f5dd90;
    border-radius: 8px;
    padding: 8px 12px;
    opacity: 0.8;
    border: none;
    outline: none;
    margin-top: 16px;
    cursor: pointer;
    font-weight: 500;
    font-size: 16x;
    &:hover {
      opacity: 1;
      color: #2c3e50;
      transition: opacity 0.6s ease;
    }
  }
}

.login-img {
  width: 100%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  height: 200px;
  object-fit: cover;
  opacity: 0.6;

  @media screen and (max-width: 600px) {
    border-radius: 0px;
  }
}
</style>
