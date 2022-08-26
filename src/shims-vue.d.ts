import { Store } from "@/store";
import { IRoadmap, Nullable } from "./types";
/* eslint-disable */
declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    selectedRoadmap: IRoadmap;
    roadmaps: Array<Nullable<IRoadmap>>;
    favoriteRoadmaps: Array<Nullable<IRoadmap>>;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
