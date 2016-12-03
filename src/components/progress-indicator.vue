<template>
  <div class="progress">
    <div>
      <div><label>COMPLETION</label></div>
      <div class="data">{{progress.completed}}/{{progress.total}}</div>
    </div>
    <div>
      <div><label>ESTIMATE</label></div>
      <div class="data">{{ 1 + Math.floor(0.25 * (progress.total - progress.completed)) }} min</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-indicator',
  computed: {
    progress() {
      return this.$store.state.progress
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>

.progress {
  background-color: #eee;
  padding: 5px 10px;

  > div {
    display: inline-block;
  }
  > div:last-child {
    border-left: 1px solid rgba(56, 64, 71, 0.2);
    padding-left: 4px;
  }
}

label, div {
  text-align: center;
}

label {
  font-size: 10px;
}

.data {
  font-family: MuseoSansRounded500, sans-serif;
  font-size: 16px;
}
</style>
