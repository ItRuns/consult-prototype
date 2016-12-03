<template>
  <div id="patient-input">
    <component class="responses" :is="topic.type" :topic="topic" />

    <div id="alt-input" v-if="features.patientAltInput">
      <label>Alternative<br/>Responses</label>

      <el-button
        class="response"
        size="small"
        @click.native="submit('relative')">
        Ask My Family
      </el-button>

      <el-button
        class="response"
        :class="{ obscured: !showUnknown }"
        size="small"
        @click.native="submit('unknown')">
        Unknown
      </el-button>

      <el-button
        class="response"
        :class="{ obscured: !showSkip }"
        size="small"
        @click.native="submit('skip')">
        Ask Me Later
      </el-button>

      <el-button
        class="response"
        :class="{ obscured: !showRefuse }"
        size="small"
        @click.native="submit('refuse')">
        Refuse to Answer
      </el-button>

      <el-button
        class="response"
        size="small"
        @click.native="submit('chat')">
        Talk to Dokbot
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InputFormats from './input-formats'

export default {
  name: 'patient-input',
  components: InputFormats,
  computed: mapState({
    topic: state => state.currentTopic,
    features: state => state.features,
    showUnknown: state => state.currentTopic.responseTypes.includes('unknown'),
    showRefuse: state => state.currentTopic.responseTypes.includes('refused'),
    showSkip: state => state.currentTopic.responseTypes.includes('skip'),
  }),
  methods: {
    submit(type) {
      if (type === 'relative') {
        this.$alert('This is not implemented, but Dokbot would then ask for relative contact ' +
          'info and send off an invitation. It ensures that the invitation is tied to a very specific ' +
          'inquiry, from which we would then branch into a series of other FHx questions, verifying data ' +
          'already entered by other relatives, etc.',
          'Unimplemented', { confirmButtonText: 'OK' })
      }
      if (type === 'skip') {
        this.$alert('This will postpone the question. The question will still be in the queue and dokbot ' +
                    'will ensure it gets asked again in a reasonable amount of time. ' +
                    '\nBTW, all of these alternative response types can be enabled/disabled per question.',
                    'Unimplemented', { confirmButtonText: 'OK' })
      }
      if (type === 'chat') {
        this.$alert('This should direct the user to a free inquiry field where they can ask Dokbot about ' +
                    'anything he might know.',
                    'Unimplemented', { confirmButtonText: 'OK' })
      }
      if (type === 'unknown') {
        this.$alert('This will mark their response as UNKNOWN (one of our response types)' +
                    '\nBTW, all of these alternative response types can be enabled/disabled per question.',
                    'Unimplemented', { confirmButtonText: 'OK' })
      }
      if (type === 'refuse') {
        this.$alert('This will mark their response as REFUSED (one of our response types)' +
                    '\nBTW, all of these alternative response types can be enabled/disabled per question.',
                    'Unimplemented', { confirmButtonText: 'OK' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#patient-input {
  height: 100%;
  display: flex;
  flex-direction: column;
  animation-duration: .4s;
}

.obscured {
  opacity: 0;
  pointer-events: none;
  cursor: default;
}

.responses {
  flex: 2;
  padding: 10px 10px 5px;
}

#alt-input {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  flex: 1;

  label {
    text-transform: uppercase;
    font-size: 12px;
    text-align:center;
  }
}
</style>
