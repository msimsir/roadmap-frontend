import { createStore } from "vuex";
import { IRoadmap } from "@/types";
import { State } from "vue";

export default createStore<State>({
  state: {
    selectedRoadmap: {
      name: "",
      description: "",
      tags: [],
    },
    roadmaps: [],
    favoriteRoadmaps: [],
  },
  getters: {
    getFavoriteRoadmaps(state) {
      state.favoriteRoadmaps;
    },
    selectedRoadmap(state) {
      state.selectedRoadmap;
    },
  },
  mutations: {
    saveRoadmap(state, payload: IRoadmap) {
      state.selectedRoadmap.name = payload.name;
      state.selectedRoadmap.description = payload.description;
      state.selectedRoadmap.tags = payload.tags.slice();
    },
  },
  actions: {},
  modules: {},
});
