<template>
  <div class="home">
    <div class="cards-container">
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
      <RoadMapCard />
    </div>
    <p>This is home view</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoadMapCard from "../components/RoadMapCard.vue";

export default defineComponent({
  name: "HomeView",
  components: { RoadMapCard },
});
</script>

<style scoped lang="scss">
.cards-container {
  border-radius: 8px;
  padding: 0px;
  margin: 0px 64px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 15rem);

  div {
    margin-right: 30px;
    margin-top: 30px;
    &:last-child {
      margin-right: 0px;
    }
  }
}
</style>
