<template>
  <Loading v-show="loading" />
  <Modal v-show="error" :content="error?.message" :header="'Error'" />
  <div class="home">
    <div class="cards-container">
      <RoadMapCard
        :roadmap="roadmap"
        :isMenuShow="false"
        v-for="roadmap in roadmaps"
        :key="roadmap._id"
        v-show="roadmaps"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import RoadMapCard from "../components/RoadMapCard.vue";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";
import { GET_ROADMAPS_QUERY } from "../graphql/documents";

export default defineComponent({
  name: "Home",
  components: { Loading, RoadMapCard, Modal },
  setup() {
    const store = useStore();
    const { result, loading, error } = useQuery(GET_ROADMAPS_QUERY, {
      search: "",
      page: 1,
      limit: 20,
    });
    const data = computed(() => result.value?.getRoadmaps.roadmaps ?? []);
    store.commit("setRoadmaps", data);
    return { loading, error };
  },
  computed: {
    roadmaps() {
      return this.$store.state.roadmaps;
    },
  },
});
</script>

<style scoped lang="scss">
.home {
  margin: 0px 64px;
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
