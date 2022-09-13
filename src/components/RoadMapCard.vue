<template>
  <div class="card-container">
    <div class="menu-icon" v-show="isMenuShow" @click="handleMenuOptions">
      <EllipsisIcon class="icon menu" />
    </div>
    <div>
      <h2>{{ roadmap.title }}</h2>
      <p>{{ roadmap.description }}</p>
    </div>
    <div class="bottom-part">
      <div class="tags">
        <span>#guitar</span> <span>#music</span><span>#theory</span>
      </div>
      <div class="icons" v-show="!isMenuShow">
        <div><ImportIcon class="icon" /></div>
        <div><EmptyHeartIcon class="icon like" /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmptyHeartIcon from "./Icons/EmptyHeartIcon.vue";
import ImportIcon from "./Icons/ImportIcon.vue";
import EllipsisIcon from "./Icons/EllipsisIcon.vue";

export default defineComponent({
  name: "RoadmapCard",
  props: ["roadmap", "isMenuShow"],
  components: { EmptyHeartIcon, ImportIcon, EllipsisIcon },
  methods: {
    handleMenuOptions() {
      console.log("menuOptions");
    },
  },
});
</script>

<style scoped lang="scss">
.card-container {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  padding: 16px;
  background-color: #d9d9d9;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.5s;

  .icon {
    width: 16px;
    height: 16px;
    fill: #2c3e50;
  }
  .menu-icon {
    position: absolute;
    right: 16px;
    top: 16px;
    opacity: 0.8;
    transition: opacity 0.6s ease;
    &:hover {
      opacity: 1;
    }
  }
  .bottom-part {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .tags {
      span {
        margin: 0px 4px;
      }
    }

    .icons {
      display: flex;
      align-items: center;
      justify-content: center;
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .like {
      margin-left: 8px;
    }
  }
}
</style>
