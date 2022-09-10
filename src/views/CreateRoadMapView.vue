<template>
  <div class="wrapper create-roadmap-container">
    <div class="roadmap-option-container border">
      <div class="form-element">
        <h3>Create Roadmap</h3>
      </div>
      <div class="form-element">
        <label>Title</label>
        <input type="text" v-model="roadmap.title" />
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
        <button @click="onSave">Save</button>
        <button @click="clearAllFields">Clear All Fields</button>
      </div>
    </div>
    <div class="flow-chart-container border">
      <Flow :flowData="roadmap.elements" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { VueTagsInput } from "@sipec/vue3-tags-input";
import { Elements } from "@braks/vue-flow";
import Flow from "../components/Flow/Flow.vue";
import { IRoadmap, IRoadmapWithUser, ITag } from "../types";
import { initialElements } from "../contants/initialElements";
import { CREATE_ROADMAP_MUTATION } from "../graphql/documents";

export default defineComponent({
  name: "CreateRoadMap",
  data() {
    return {
      roadmap: {
        title: "",
        description: "",
        tags: [],
        elements: [] as Elements,
      } as IRoadmap,
      tag: "",
      formTags: [] as ITag[],
      preview: true,
    };
  },
  components: { Flow, VueTagsInput },
  setup() {
    const router = useRouter();
    const {
      mutate: createRoadmapMutate,
      onError: onCreateRoadmapError,
      loading: onCreateRoadmapLoading,
    } = useMutation(CREATE_ROADMAP_MUTATION);

    async function createRoadmap(roadmap: IRoadmapWithUser) {
      let createRoadmapResult = await createRoadmapMutate({
        ...roadmap,
      });
      console.log("createRoadmapResult", createRoadmapResult);
      console.log(onCreateRoadmapLoading);
      router.push({ name: "Home" });
      onCreateRoadmapError((err) => {
        return err;
      });
    }
    return { createRoadmap };
  },
  methods: {
    clearAllFields() {
      this.roadmap.title = "";
      this.roadmap.description = "";
      this.roadmap.tags = [];
      this.roadmap.elements = [];
      this.formTags = [];
      this.tag = "";
    },
    onSave() {
      this.$store.commit("saveRoadmap", {
        ...this.roadmap,
        tags: this.formTags.map((e: ITag) => e.text).slice(),
      });
      this.createRoadmap({
        ...this.roadmap,
        elements: JSON.stringify(this.roadmap.elements),
        tags: this.formTags.map((e: ITag) => e.text).slice(),
        userId: this.$store.state.user._id,
      });
    },
    addTags(newTags: ITag[]) {
      this.formTags = newTags.slice();
    },
  },
  created() {
    this.roadmap.elements = initialElements;
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
  padding: 16px;
  font-size: 12px;
  background: #fcfcfc;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
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

.dndflow aside .vue-flow__node-input,
.vue-flow__node-default,
.vue-flow__node-output {
  width: 167px;
}

.dndflow .item-options {
  margin-top: 32px;
  text-align: left;
  & > p {
    text-align: center;
    margin-bottom: 8px;
  }
  & > div {
    width: 100%;
    & > .item-value {
      width: 100%;
      margin-top: 2px;
      border-radius: 4px;
      padding: 4px;
      outline: none;
    }
  }
}

@media screen and (min-width: 768px) {
  .dndflow {
    flex-direction: row;
  }

  .dndflow aside {
    max-width: 200px;
    border-top: 1px solid #eee;
  }
}
.vue-tags-input.vue-tags-input {
  width: 100%;
  max-width: 100%;
}

.vue-tags-input .ti-input {
  border-radius: 4px;
  padding: 8px;
}

.vue-tags-input .ti-tag {
  border-radius: 4px;
  padding: 8px;
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
      padding: 8px;
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
