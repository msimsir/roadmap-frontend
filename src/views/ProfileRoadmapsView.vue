<template>
  <div class="wrapper">
    <div class="your-roadmap">
      <h3 class="title">Your Roadmaps</h3>
      <div class="cards-container">
        <RoadMapCard />
        <RoadMapCard />
      </div>
    </div>

    <div class="roadmap-on-working">
      <h3 class="title">Your Roadmaps on Working</h3>
      <div class="cards-container">
        <RoadMapCard />
        <RoadMapCard />
      </div>
    </div>
    <div class="favorite-roadmap">
      <h3 class="title">Your Favorite Roadmaps</h3>
      <div class="cards-container">
        <RoadMapCard />
        <RoadMapCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoadMapCard from "../components/RoadMapCard.vue";

export default defineComponent({
  name: "ProfileRoadmaps",
  components: { RoadMapCard },
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
.your-roadmap {
  text-align: left;
}
.roadmap-on-working {
}
.favorite-roadmap {
}
</style>
