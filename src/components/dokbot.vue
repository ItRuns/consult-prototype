<template>
  <div id="dokbot">
    <section class="messages" @click="skipToEnd">
      <transition-group name="messages" class="scroll-box" tag="div">
        <div v-for="m in messages" :key="m.id"
             class="message" :class="{ dokbot: m.dokbot, patient: !m.dokbot }">
          <template v-if="m.dokbot">
            <h4>
              <img src="../assets/dokbot.png">
              Dokbot
            </h4>
            <text-stream ref="streams" @finished="enableFeature('patientInput')" :strings="m.content" :speed="20" :delay="1000" />
          </template>
          <template v-else>
            <h4>
              {{patientName}}
              <img v-if="gender === 'male'" src="../assets/profile-male.png" />
              <img v-if="gender === 'female'" src="../assets/profile-male.png" />
              <img v-if="gender !== 'male' && gender !== 'female'" src="../assets/profile.png" />
            </h4>
            <p>{{m.content}}</p>
          </template>
        </div>
    </transition-group>
    </section>
      <section class="response" :style="{ borderTopWidth: (features.patientInput || messages.length>1)?'1px':'0' }">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <patient-input v-if="features.patientInput" />
        </transition>
      </section>
  </div>
</template>

<script>
/* global Audio, window */
import { mapState } from 'vuex'
import TextStream from './text-stream'
import PatientInput from './patient-input'

const arrival = new Audio('/static/audio/arrival.mp3')

arrival.volume = 0.3

export default {
  name: 'dokbot',
  components: {
    TextStream,
    PatientInput,
  },
  computed: mapState({
    features: state => state.features,
    messages: state => state.messages,
    patientName: state => state.phr.firstName || 'Patient',
    gender: state => state.phr.gender,
  }),
  methods: {
    handleEvent(e) {
      if (this.features.patientInput || e.type !== 'keyup' ||
          (e.code !== 'Space' && e.code !== 'Enter')) {
        return
      }

      this.skipToEnd()

      e.preventDefault()
    },
    enableFeature(feature) {
      this.$store.commit('enableFeature', feature)
    },
    skipToEnd() {
      this.$refs.streams.forEach(s => s.skipToEnd())
    },
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        this.$el.scrollTop = this.$el.scrollHeight
      })
    },
  },
  mounted() {
    arrival.play()
    window.addEventListener('keyup', this)
  },
  destroyed() {
    window.removeEventListener('keyup', this)
  },
  created() {
    this.$store.dispatch('nextTopicState')
  },
}
</script>

<style lang="scss" scoped>
#dokbot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

section.messages {
  width: 100%;
  max-width: 600px;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  flex: auto;
  overflow-y: auto;
  padding: 0 10px;
}

.scroll-box {
  width: 100%;
}

section.response {
  flex: 2;
  height: 150px;
  min-height: 150px;
  width: 100%;
  max-width: 600px;
  position: relative;

  border-top: 1px solid #f5f5f5;

  transition-duration: 1s;
}

.message {
  padding: 10px;
  font-size: 20px;
  line-height: 1.4;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;

  border-radius: 10px;

  transition: all .2s;

  h4 {
    margin: 0;
    font-size: 18px;
    font-family: MuseoSansRounded700;
    text-align: center;
  }

  img {
    vertical-align: middle;
    width: 40px;
  }

  p {
    margin: 10px 0 0 0;
    text-align: justify;
  }

  &.dokbot {
    background-color: #e9f6fb;

    img {
      margin-right: 10px;
    }
  }

  &.patient {
    background-color: #dcf5e4;

    img {
      margin-left: 10px;
    }
  }
}

.messages-enter, .messages-leave-active {
  opacity: 0;
}

.messages-leave-active {
  position: absolute;
}

</style>
