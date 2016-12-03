<template>
  <span class="notice-arrow" :style="{ transform: `rotate(${this.rotate}deg)`}">
    <i :style="combinedStyle" class="material-icons" :class="{ bounce }">forward</i>
  </span>
</template>

<script>
const BASE_ROTATION = -90

export default {
  name: 'notice-arrow',
  props: {
    style: Object,
    bounce: Boolean,
    size: {
      type: Number,
      default: 35,
    },
    rotate: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    combinedStyle() {
      return {
        fontSize: this.size + 'px',
        transform: `translate(-50%, -50%) scale(1.5, 1.5) rotate(${BASE_ROTATION}deg)`,
        ...this.style,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.notice-arrow {
  z-index: 9999;
  position: fixed;
  color: #e84e25;
}

.bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    margin-top: 0;
  }
  40% {
    margin-top: 30px;
  }
  60% {
    margin-top: 15px;
  }
}
</style>
