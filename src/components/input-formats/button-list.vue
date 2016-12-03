<template>
  <div class="button-list" :class="topic.class" :style="topic.style">
    <template v-for="(response, name, i) of topic.responses">
      <el-button v-if="response.type === 'button'"
        class="response" :class="response.class" :style="response.style"
        size="large" @click.native="submit(response)">
        {{i+1}}: {{response.content}}
      </el-button>
      <div v-if="response.type === 'image'"
        class="response image-button" :class="response.class" :style="response.style"
        @click="submit(response)">
        <img :src="response.image" />
        <label>{{i+1}}: {{response.label}}</label>
      </div>
    </template>
  </div>
</template>

<script>
/* global window */

export default {
  name: 'button-list',
  props: ['topic'],
  computed: {
    responses() {
      return Object.keys(this.topic.responses).map(k => this.topic.responses[k])
    },
  },
  methods: {
    submit(response) {
      const message = { topic: this.topic, response }

      this.$emit('submitted', message)
      this.$store.dispatch('handlePatientMessage', message)
    },
    handleEvent(e) {
      const num = parseInt(e.key, 10)

      if (e.type !== 'keyup' || isNaN(num)) {
        return
      }

      const response = this.responses[num - 1]

      if (response) {
        this.submit(response)

        e.stopPropagation()
      }
    },
  },
  mounted() {
    window.addEventListener('keyup', this)
  },
  destroyed() {
    window.removeEventListener('keyup', this)
  },
}
</script>

<style>
#patient-input .el-button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
<style lang="scss" scoped>
.button-list {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.image-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    margin: 0 5px;
  }

  label {
    cursor: pointer;
    font-family: MuseoSansRounded500, sans-serif;
  }
}
</style>
