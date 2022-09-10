import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import CreateRoadMapView from "../views/CreateRoadMapView.vue";
import PreviewRoadMapView from "../views/PreviewRoadMapView.vue";
import ProfileRoadmapsView from "../views/ProfileRoadmapsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/create-roadmap",
    name: "CreateRoadMap",
    component: CreateRoadMapView,
  },
  {
    path: "/preview-roadmap/:roadmap-id",
    name: "PreviewRoadMap",
    component: PreviewRoadMapView,
  },
  {
    path: "/your-roadmaps",
    name: "ProfileRoadmaps",
    component: ProfileRoadmapsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
