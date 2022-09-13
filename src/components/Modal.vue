<template>
  <div class="background" v-show="show">
    <div class="modal-container">
      <div class="header">
        <span>{{ header }}</span>
        <CrossIcon class="cross-icon" @click.prevent="handleClose" />
      </div>
      <div class="content">
        {{ content }}
      </div>
      <div class="action-box">
        <button @click.prevent="handleClose" class="normal-button">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CrossIcon from "../components/Icons/CrossIcon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    header: {
      type: String,
    },
    content: {
      type: String,
      default: "",
    },
    onClose: {
      type: Function,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    handleClose() {
      this.show = false;
      if (this.$props.onClose) {
        this.$props.onClose();
      }
    },
  },
  components: {
    CrossIcon,
  },
});
</script>

<style lang="scss" scoped>
.background {
  top: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  width: 400px;
  height: 240px;
  -webkit-box-shadow: 10px 1px 6px -3px rgba(0, 0, 0, 0.55);
  box-shadow: 10px 1px 6px -3px rgba(0, 0, 0, 0.55);
  color: #2c3e50;
  z-index: 400;
  position: relative;
  padding: 16px;
  .header {
    width: 100%;
    height: 60px;

    .cross-icon {
      position: absolute;
      z-index: 300;
      top: 16px;
      right: 16px;
      fill: #2c3e50;
      width: 16px;
      height: 16px;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.6s ease;
      &:hover {
        opacity: 1;
      }
    }
  }
  .content {
    width: 100%;
    height: 120px;
  }
  .action-box {
    width: 100%;
    height: 60px;
  }
}
</style>
