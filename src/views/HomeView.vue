<template>
  <Loading v-show="loading" />
  <Modal v-show="error" :content="error?.message" :header="'Error'" />
  <div class="home">
    <div class="cards-container">
      <RoadMapCard
        :roadmap="roadmap"
        :isMenuShow="false"
        :isYourOwn="
          roadmap && user ? handleOwnRoadmapLikes(roadmap, user) : false
        "
        :likeRoadmap="handleLikeRoadmap"
        v-for="roadmap in roadmaps"
        :key="roadmap._id"
        v-show="roadmaps"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { ApolloError } from "@apollo/client/errors";
import RoadMapCard from "../components/RoadMapCard.vue";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";
import {
  GET_ROADMAPS_QUERY,
  LIKE_ROADMAP_MUTATION,
} from "../graphql/documents";
import { IRoadmapResult } from "../types";

export default defineComponent({
  name: "Home",
  components: { Loading, RoadMapCard, Modal },
  setup() {
    const store = useStore();
    const { result, loading, error, refetch } = useQuery(GET_ROADMAPS_QUERY, {
      search: "",
      page: 1,
      limit: 20,
    });
    const data = computed(() => result.value?.getRoadmaps.roadmaps ?? []);
    store.commit("setRoadmaps", data);
    const { mutate: likeRoadmapMutate, loading: likeRoadmapLoading } =
      useMutation(LIKE_ROADMAP_MUTATION);

    async function likeRoadmap(id: string) {
      try {
        let likeRoadmapResult = await likeRoadmapMutate({
          id,
        });
        const payload = likeRoadmapResult?.data?.likeRoadmap;
        if (payload) {
          refetch({
            search: "",
            page: 1,
            limit: 20,
          });
        }
      } catch (error) {
        store.commit("setError", (error as ApolloError).message);
      }
    }
    return { loading, error, likeRoadmapLoading, likeRoadmap };
  },
  methods: {
    handleLikeRoadmap(id: string) {
      this.likeRoadmap(id);
    },
    // eslint-disable-next-line
    handleOwnRoadmapLikes(roadmap: IRoadmapResult, user: any) {
      if (user._id) {
        if (roadmap.userId === user._id) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  computed: {
    roadmaps() {
      return this.$store.state.roadmaps;
    },
    user() {
      return this.$store.state.user;
    },
  },
});
</script>

<style scoped lang="scss">
.home {
  margin: 0px 64px;
  padding-bottom: 32px;
}
.cards-container {
  border-radius: 8px;
  padding: 0px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-rows: auto;
  grid-gap: 16px;
}
</style>
