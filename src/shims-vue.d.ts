import { Store } from "@/store";
import { IRoadmap, IRoadmapResult, ISignInUser, Nullable } from "./types";
/* eslint-disable */
declare module "@vue/runtime-core" {
  // Declare your own store states.
  export interface State {
    selectedRoadmap: IRoadmap;
    roadmaps: Array<Nullable<IRoadmapResult>>;
    favoriteRoadmaps: Array<Nullable<IRoadmap>>;
    user: Nullable<ISignInUser>;
    error: Nullable<string>;
  }

  interface ComponentPublicInstance {
    $data: object;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
