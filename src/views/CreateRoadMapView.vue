<template>
  <div class="wrapper create-roadmap-container">
    <div class="roadmap-option-container border">
      <div class="form-element">
        <h3>Create Roadmap</h3>
      </div>
      <div class="form-element">
        <label>Name</label>
        <input
          type="text"
          v-model="roadmap.name"
        />
      </div>
      <div class="form-element">
        <label>Description</label>
        <textarea v-model="roadmap.description" />
      </div>
      <div class="form-element">
        <label>Tags</label>
        <vue-tags-input
          v-model="tag"
          :tags="formTags"
          @tags-changed="addTags"
        />
      </div>
      <div class="form-element button-container">
        <button @click="saveRoadmap">Save</button>
        <button @click="clearAllFields">Clear All Fields</button>
      </div>
    </div>
    <div class="flow-chart-container border">
      <Flow />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VueTagsInput } from "@sipec/vue3-tags-input";
import Flow from "../components/flow/Flow.vue";
import { IRoadmap, ITag } from "../types";

export default defineComponent({
  name: "CreateRoadMapView",
  data() {
    return {
      roadmap: {
        name: "",
        description: "",
        tags: [],
      } as IRoadmap,
      tag: "",
      formTags: [] as ITag[],
    };
  },
  components: { Flow, VueTagsInput },
  methods: {
    clearAllFields() {
      this.roadmap.name = "";
      this.roadmap.description = "";
      this.roadmap.tags = [];
      this.formTags = [];
      this.tag = "";
    },
    saveRoadmap() {
      this.$store.commit("saveRoadmap", {
        ...this.roadmap,
        tags: this.formTags.map((e: ITag) => e.text).slice(),
      });
    },
    addTags(newTags: ITag[]) {
      this.formTags = newTags.slice();
    },
  },
});
</script>

<style lang="scss">
.dndflow {
  flex-direction: column;
  display: flex;
  height: 100%;
}

.dndflow aside {
  border-left: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
}

.dndflow aside > * {
  margin-bottom: 10px;
  cursor: grab;
}

.dndflow aside .description {
  margin-bottom: 10px;
}

.dndflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}

@media screen and (min-width: 768px) {
  .dndflow {
    flex-direction: row;
  }

  .dndflow aside {
    max-width: 180px;
    border-top: 1px solid #eee;
  }
}
.vue-tags-input.vue-tags-input {
  width: 100%;
  max-width: 100%;
}

.vue-tags-input .ti-input {
  border-radius: 4px;
  padding: 8px 16px;
}

.vue-tags-input .ti-tag {
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #324376;
}

.create-roadmap-container {
  height: 80vh;
  display: grid;
  max-width: 100%;
  grid-template-columns: 1fr 3fr;
  grid-gap: 16px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr;
  }
}
.border {
  border-radius: 8px;
  border: 1px solid #d9d9d9;
}
.roadmap-option-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 32px;
  @media screen and (max-width: 720px) {
    padding: 16px;
    & > h3 {
      font-size: 24px;
    }
  }
  .form-element {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &:first-child {
      border-bottom: 1px solid #d9d9d9;
      padding-bottom: 4px;
    }
    & > label {
      margin-bottom: 2px;
    }
    & > input,
    textarea {
      width: 100%;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      padding: 8px 16px;
    }
  }
  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 1380px) {
      flex-direction: column;
      & > button {
        width: 100%;
        margin-top: 8px;
      }
    }
    & > button {
      padding: 8px 16px;
      border-radius: 8px;
      outline: none;
      border: none;
      border: 2px solid #f5dd90;
      font-weight: 500;
      background: none;
      cursor: pointer;
      &:hover {
        background-color: #f5dd90;
        color: #324376;
      }
    }
  }
}
</style>