<template>
  <div class="login-page">
    <Loading v-show="signInLoading || signUpLoading" />
    <Modal
      v-show="error"
      :content="error"
      :onClose="onClose"
      :header="'Error'"
    />
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
          <button @click.prevent="loginHandler" class="normal-button">
            {{ isRegisterForm ? "SIGN UP" : "SIGN IN" }}
          </button>
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
import { defineComponent } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ApolloError } from "@apollo/client/errors";
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from "../graphql/documents";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";
import Logo from "../components/Icons/Logo.vue";
import EnvelopeIcon from "../components/Icons/EnvelopeIcon.vue";
import LockIcon from "../components/Icons/LockIcon.vue";
import UserIcon from "../components/Icons/UserIcon.vue";
import { IUserRegisterForm } from "../types";

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
      } as IUserRegisterForm,
    };
  },
  components: { Logo, EnvelopeIcon, LockIcon, UserIcon, Loading, Modal },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { mutate: signUpMutate, loading: signUpLoading } =
      useMutation(SIGNUP_MUTATION);
    const { mutate: signInMutate, loading: signInLoading } =
      useMutation(SIGNIN_MUTATION);

    async function signUp(userForm: IUserRegisterForm) {
      try {
        let signUpResult = await signUpMutate({
          ...userForm,
        });
        const payload = signUpResult?.data?.signIn;
        const user = {
          _id: payload?.user?._id,
          firstName: payload?.user?.firstName,
          lastName: payload?.user?.lastName,
          username: payload?.user?.username,
          email: payload?.user?.email,
          token: payload?.token,
        };
        store.commit("setUser", user);
        router.push({ name: "Home" });
      } catch (error) {
        store.commit("setError", (error as ApolloError).message);
      }
    }

    async function signIn(email: string, password: string) {
      try {
        let signInResult = await signInMutate({
          email,
          password,
        });
        const payload = signInResult?.data?.signIn;
        const user = {
          _id: payload?.user?._id,
          firstName: payload?.user?.firstName,
          lastName: payload?.user?.lastName,
          username: payload?.user?.username,
          email: payload?.user?.email,
          token: payload?.token,
        };
        store.commit("setUser", user);
        router.push({ name: "Home" });
      } catch (error) {
        store.commit("setError", (error as ApolloError).message);
      }
    }

    return {
      signUp,
      signIn,
      signUpLoading,
      signInLoading,
    };
  },
  methods: {
    switchForm() {
      this.isRegisterForm = !this.isRegisterForm;
    },
    loginHandler() {
      if (this.isRegisterForm) {
        this.signUp(this.userForm);
      } else {
        this.signIn(this.userForm.email, this.userForm.password);
      }
    },
    onClose() {
      this.$store.commit("setError", null);
    },
  },
  computed: {
    error() {
      return this.$store.state.error;
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
