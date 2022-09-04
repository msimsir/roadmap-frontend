import { createStore } from "vuex";
import { IRoadmap, ISignInUser } from "@/types";
import { State } from "vue";

export default createStore<State>({
  state: {
    selectedRoadmap: {
      title: "",
      description: "",
      tags: [],
      elements: [],
    },
    user: null,
    roadmaps: [],
    favoriteRoadmaps: [],
  },
  getters: {
    getFavoriteRoadmaps(state) {
      return state.favoriteRoadmaps;
    },
    selectedRoadmap(state) {
      return state.selectedRoadmap;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    saveRoadmap(state, payload: IRoadmap) {
      state.selectedRoadmap.title = payload.title;
      state.selectedRoadmap.description = payload.description;
      state.selectedRoadmap.tags = payload.tags.slice();
      state.selectedRoadmap.elements = payload.elements;
    },
    setUser(state, payload: ISignInUser) {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify({ ...state.user }));
    },
    clearUser(state) {
      state.user = null;
      localStorage.clear();
    },
  },
  actions: {},
  modules: {},
});
