import { createStore } from "vuex";
import { IRoadmap, IRoadmapResult, ISignInUser } from "@/types";
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
    userRoadmaps: [],
    favoriteRoadmaps: [],
    error: null,
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
    setRoadmaps(state, payload: IRoadmapResult[]) {
      state.roadmaps = payload;
    },
    setUserRoadmaps(state, payload: IRoadmapResult[]) {
      state.userRoadmaps = payload;
    },
    clearUser(state) {
      state.user = null;
      localStorage.clear();
    },
    setError(state, payload: string) {
      state.error = payload;
    },
  },
  actions: {},
  modules: {},
});
