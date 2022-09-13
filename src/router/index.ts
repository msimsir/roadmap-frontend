import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import CreateRoadmapView from "../views/CreateRoadmapView.vue";
import PreviewRoadmapView from "../views/PreviewRoadmapView.vue";
import ProfileRoadmapsView from "../views/ProfileRoadmapsView.vue";
import WorkingRoadmapView from "../views/WorkingRoadmapView.vue";

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
    component: CreateRoadmapView,
  },
  {
    path: "/preview-roadmap/:id",
    name: "PreviewRoadMap",
    component: PreviewRoadmapView,
  },
  {
    path: "/your-roadmaps/:id",
    name: "ProfileRoadmaps",
    component: ProfileRoadmapsView,
  },
  {
    path: "/working-roadmap/:id",
    name: "WorkingRoadmap",
    component: WorkingRoadmapView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
