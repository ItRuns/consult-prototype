<template>
  <div class="text-stream">
    <span v-html="text" v-poke></span>
    <span class="cursor" v-if="!finished">|</span>
  </div>
</template>

<script>
export default {
  name: 'text-stream',
  props: {
    strings: {
      type: [String, Array],
      required: true,
    },
    autoSplit: {
      type: Boolean,
      default: true,
    },
    speed: {
      type: Number,
      default: 20,
      validator: val => val > 0,
    },
    delay: {
      type: Number,
      default: 500,
      validator: val => val >= 0,
    },
  },
  data() {
    return {
      content: [],
      contentIndex: 0,
      text: '',
      textPos: 0,
      streamingIntervalId: null,
      delayTimeoutId: null,
      streaming: false,
      finished: true,
      streamSpeed: 0,
      streamDelay: 0,
    }
  },
  directives: {
    poke: {
      // This is necessary to force reflow on Webkit. Otherwise wrapped text doesn't always
      // get rendered.
      componentUpdated: el => {
        el.style.display = 'none'
        el.offsetHeight;
        el.style.display = ''
      },
    },
  },
  methods: {
    next() {
      if (this.delayTimeoutId) {
        clearTimeout(this.delayTimeoutId)
        this.delayTimeoutId = null
      }

      this.contentIndex++
      this.streaming = true
      this.textPos = 0
    },
    reset() {
      this.streaming = false

      if (this.streamingIntervalId !== null) {
        clearInterval(this.streamingIntervalId)
        this.streamingIntervalId = null
      }

      if (this.delayTimeoutId !== null) {
        clearInterval(this.delayTimeoutId)
        this.delayTimeoutId = null
      }
    },
    stop() {
      this.reset()
      this.finished = true
      this.$emit('finished')
    },
    stream() {
      this.reset()

      this.finished = false
      this.streaming = true

      this.streamingIntervalId = setInterval(() => {
        if (!this.streaming) {
          return
        }

        const current = this.content[this.contentIndex]
        const char = current.substr(this.textPos++, 1)

        this.text += char

        if (char === '<') {
          // Handle HTML by slurping and appending the rest of the tag
          const tagEnd = current.indexOf('>', this.textPos)

          if (tagEnd !== -1) {
            this.text += current.substring(this.textPos, tagEnd + 1)
            this.textPos = tagEnd + 1
          } else {
            this.text += current.substring(this.textPos)
          }
        }

        if (this.textPos >= current.length) {
          this.streaming = false
          if (this.contentIndex >= this.content.length - 1) {
            this.stop()
          }

          if (this.delayTimeoutId) {
            clearInterval(this.delayTimeoutId)
          }
          this.delayTimeoutId = setTimeout(() => this.next(), this.streamDelay)
        }
      }, this.streamSpeed)
    },
    skipToEnd() {
      if (this.finished) {
        return
      }

      this.reset()
      this.streamDelay = 10
      this.streamSpeed = 5
      this.stream()
    },
  },
  mounted() {
    this.stream()
  },
  created() {
    this.$on('skip-to-end', () => this.skipToEnd())

    const strings = Array.isArray(this.strings) ? this.strings : [this.strings]

    if (!this.autoSplit) {
      this.content = strings
      return
    }

    this.streamDelay = this.delay
    this.streamSpeed = this.speed
    this.content = []

    strings.forEach(s => {
      let matches = s.match(/([?.!]\s)+/)

      while (matches) {
        const segmentLength = matches[0].length + matches.index

        this.content.push(s.substring(0, segmentLength))
        s = s.substring(segmentLength)

        matches = s.match(/([?.!]\s)+/)
      }

      if (s) {
        this.content.push(s)
      }
    })
  },
}
</script>

<style scoped>
.text-stream {
  margin: 10px 5px 0;
  text-align: justify;
}

.cursor {
    opacity: 1;
    animation: blink 0.7s infinite;
    position: relative;
}

@keyframes blink{
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
}
</style>
