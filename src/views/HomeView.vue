<template>
  <div class="home">
    <div class="cards-container">
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoadMapCard from "../components/RoadMapCard.vue";

export default defineComponent({
  name: "Home",
  components: { RoadMapCard },
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
