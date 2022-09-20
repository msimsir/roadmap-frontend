<template>
  <Loading v-show="loading" />
  <Modal v-show="error" :content="error?.message" :header="'Error'" />
  <div class="wrapper">
    <div class="your-roadmap">
      <h3 class="title">Your Roadmaps</h3>
      <div class="cards-container" v-if="roadmaps?.length > 0">
        <RoadMapCard
          :roadmap="roadmap"
          :isMenuShow="true"
          v-for="roadmap in roadmaps"
          :key="roadmap._id"
        />
      </div>
      <p class="info-paragraph" v-else>There is no roadmap you created.</p>
    </div>
    <div class="roadmap-on-working">
      <h3 class="title">Your Roadmaps on Working</h3>
      <div class="cards-container"></div>
    </div>
    <div class="favorite-roadmap">
      <h3 class="title">Your Favorite Roadmaps</h3>
      <div class="cards-container"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { GET_ROADMAPS_OF_USER_QUERY } from "../graphql/documents";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";
import RoadMapCard from "../components/RoadMapCard.vue";

export default defineComponent({
  name: "ProfileRoadmaps",
  setup() {
    const store = useStore();
    const route = useRoute();
    const { result, loading, error } = useQuery(GET_ROADMAPS_OF_USER_QUERY, {
      userId: route.params.id,
    });
    const data = computed(() => result.value?.getRoadmapsOfUser ?? []);
    store.commit("setUserRoadmaps", data);
    return { loading, error };
  },
  components: { Loading, Modal, RoadMapCard },
  computed: {
    roadmaps() {
      return this.$store.state.userRoadmaps;
    },
  },
});
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  margin-bottom: 4px;
}
.cards-container {
  border-radius: 8px;
  padding: 0px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-rows: auto;
  grid-gap: 16px;
  margin-bottom: 16px;
}
.info-paragraph {
  margin-bottom: 16px;
}
.your-roadmap {
  text-align: left;
}
.roadmap-on-working {
}
.favorite-roadmap {
}
</style>
