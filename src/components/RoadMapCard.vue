<template>
  <div
    class="card-container"
    @click="handleRoute('/preview-roadmap', roadmap?._id)"
  >
    <div class="menu-icon" v-show="isMenuShow" @click="handleMenuOptions">
      <EllipsisIcon class="icon menu" />
    </div>
    <div class="menu-options" v-show="isMenu">
      <ul>
        <li>On Work</li>
        <li>Delete</li>
      </ul>
    </div>
    <div class="card-content">
      <h2>{{ roadmap?.title }}</h2>
      <p class="roadmap-desc">{{ roadmap?.description }}</p>
    </div>
    <div class="bottom-part">
      <div class="tags">
        <span v-for="tag in roadmap?.tags" :key="tag">#{{ tag }}</span>
      </div>
      <div class="icons" v-show="!isMenuShow">
        <div class="import-icon-container">
          <EmptyImportIcon class="icon non-import" />
          <FilledImportIcon class="icon imported" />
        </div>
        <div
          class="like-icon-container"
          v-show="!isYourOwn"
          @click="handleLikeRoadmap(roadmap?._id)"
        >
          <EmptyHeartIcon
            class="icon dislike"
            v-if="!handleLikeIcon(roadmap?.likes)"
          />
          <FilledHeartIcon class="icon like" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmptyHeartIcon from "./Icons/EmptyHeartIcon.vue";
import EmptyImportIcon from "./Icons/EmptyImportIcon.vue";
import EllipsisIcon from "./Icons/EllipsisIcon.vue";
import FilledHeartIcon from "./Icons/FilledHeartIcon.vue";
import FilledImportIcon from "./Icons/FilledImportIcon.vue";
import { IRoadmapResult } from "../types";

export default defineComponent({
  name: "RoadmapCard",
  props: {
    roadmap: {
      type: Object as () => IRoadmapResult,
    },
    isMenuShow: {
      type: Boolean,
    },
    isYourOwn: {
      type: Boolean,
    },
    likeRoadmap: {
      type: Function,
    },
  },
  data() {
    return {
      isMenu: false,
    };
  },
  components: {
    EmptyHeartIcon,
    EmptyImportIcon,
    EllipsisIcon,
    FilledHeartIcon,
    FilledImportIcon,
  },
  methods: {
    handleMenuOptions() {
      this.isMenu = !this.isMenu;
    },
    handleLikeIcon(array?: string[]) {
      if (this.$store.state.user !== null) {
        if (array && array.includes(this.$store.state.user._id)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    handleLikeRoadmap(id?: string) {
      this.$props.likeRoadmap && this.$props.likeRoadmap(id);
    },
    handleRoute(route: string, params?: string) {
      this.$store.commit("setSelectedRoadmap", this.roadmap);
      this.$router.push(`${route}/${params}`);
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
.card-container {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  padding: 16px;
  background-color: #d9d9d9;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.1s ease-in;

  &:hover {
    outline: 1px solid #2c3e50;
  }

  .menu-options {
    position: absolute;
    background: #fff;
    top: 32px;
    right: 8px;
    height: 100px;
    width: 100px;
    border-radius: 8px;
    z-index: 400;
    -webkit-box-shadow: 10px 1px 8px -2px rgba(0, 0, 0, 0.25);
    box-shadow: 10px 1px 8px -2px rgba(0, 0, 0, 0.25);
    padding: 8px;
    ul {
      li {
        display: block;
        margin-bottom: 4px;
        transition: color ease 0.8s;
        &:hover {
          color: #f5dd90;
        }
      }
    }
  }
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
  .card-content {
    width: 100%;
    .roadmap-desc {
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .bottom-part {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    .tags {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      span {
        background-color: #f5dd90;
        padding: 4px 8px;
        border-radius: 8px;
        margin: 4px 4px 4px 0px;
        height: 24px;
        font-size: 12px;
        color: #2c3e50;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden !important;
        &:first-of-type {
          margin-left: 0px;
        }
      }
    }

    .icons {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .like-icon-container {
      .dislike,
      .like {
        margin-left: 8px;
      }
    }
    .import-icon-container {
      .imported {
        display: none;
      }
      &:hover {
        .non-import {
          display: none;
        }
        .imported {
          display: block;
        }
      }
    }
  }
}
</style>
