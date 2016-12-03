<template>
  <div class="simple-input" :class="topic.class" :style="topic.style">
    <el-input
      class="response"
      :class="response.class"
      :style="response.style"
      :placeholder="response.placeholder"
      v-model="content"
      @keyup.native.enter.prevent="submit(response)">
      <template slot="prepend">{{response.label}}</template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'simple-input',
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      content: '',
    }
  },
  watch: {
    content(newVal, oldVal) {
      if (this.response.type === 'number' && isNaN(newVal)) {
        this.$nextTick(() => {
          this.content = oldVal
        })
      }
    },
  },
  computed: {
    response() {
      const names = Object.keys(this.topic.responses)

      if (names.length > 0) {
        return this.topic.responses[names[0]]
      }

      return null
    },
  },
  methods: {
    submit(response) {
      const message = { topic: this.topic, response, content: this.content }

      this.$emit('submitted', message)
      this.$store.dispatch('handlePatientMessage', message)
    },
  },
  mounted() {
    this.$el.querySelector('input').focus()
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
  align-items: center;
  justify-content: center;
}
</style>
