import { Store } from "@/store";
import { IRoadmap, ISignInUser, Nullable } from "./types";
/* eslint-disable */
declare module "@vue/runtime-core" {
  // Declare your own store states.
  export interface State {
    selectedRoadmap: IRoadmap;
    roadmaps: Array<Nullable<IRoadmap>>;
    favoriteRoadmaps: Array<Nullable<IRoadmap>>;
    user: Nullable<ISignInUser>;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
