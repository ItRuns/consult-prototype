<template>
  <div id="app">
    <transition
      name="loader"
      @after-enter="ready"
    >
      <nav v-if="loaded" id="header">
        <progress-indicator id="progress-indicator" v-if="features.progress" />
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-if="notices.progress">
            <notice-arrow :style="{ left: '25px', top: '50px' }" :bounce="true" :size="20" />
            <notice-arrow :style="{ left: '60px', top: '50px' }" :bounce="true" :size="20" />
            <notice-arrow :style="{ left: '95px', top: '50px' }" :bounce="true" :size="20" />
            <notice-arrow :style="{ left: '130px', top: '50px' }" :bounce="true" :size="20" />
            <notice-arrow :style="{ left: '160px', top: '30px' }" :rotate="-45" :bounce="true" :size="20" />
            <notice-arrow :style="{ left: '145px', top: '0px' }" :rotate="-90" :bounce="true" :size="20" />
            <notice-arrow :style="{ left: '145px', top: '-25px' }" :rotate="-90" :bounce="true" :size="20" />
          </div>
        </transition>

        <img src="./assets/logo.png">
        <span class="branding-title">| Consultation</span>

        <span v-if="features.account" class="account">
          <a href @click.prevent="unimplemented">{{fullName}}</a>
          <a href @click.prevent="logout"><i class="material-icons">exit_to_app</i></a>

        </span>
        <transition name="sideboard">
          <div v-if="notices.account">
            <notice-arrow :style="{ right: '75px', top: '40px' }" :bounce="true" :size="35" />
            <notice-arrow :style="{ right: '35px', top: '40px' }" :bounce="true" :size="35" />
            <notice-arrow :style="{ right: '-5px', top: '40px' }" :bounce="true" :size="35" />
          </div>
        </transition>
      </nav>
    </transition>

    <section class="content">
      <transition name="sideboard">
        <aside class="sideboard" v-if="features.sideboard">
          <component v-if="currentSideboard" :is="currentSideboard" />
        </aside>
      </transition>
      <dokbot class="dokbot-section" v-if="features.dokbot" />
    </secton>
  </div>
</template>

<script>
import Dokbot from './components/dokbot'
import Pedigree from './components/pedigree'
import NoticeArrow from './components/notice-arrow'
import ProgressIndicator from './components/progress-indicator'

export default {
  data() {
    return {
      loaded: false,
    }
  },
  components: {
    Dokbot,
    Pedigree,
    NoticeArrow,
    ProgressIndicator,
  },
  computed: {
    features() { return this.$store.state.features },
    notices() { return this.$store.state.notices },
    fullName() { return this.$store.getters.fullName },
    currentSideboard() { return this.$store.state.currentSideboard },
  },
  methods: {
    ready() {
      this.$store.commit('enableFeature', 'dokbot')
    },
    unimplemented() {
      this.$alert('Sorry, not yet implemented!', 'Sorry', { confirmButtonText: 'OK' })
    },
    logout() {
      // eslint-disable-next-line
      window.location.reload()
    },
  },
  mounted() {
    this.loaded = true
  },
}
</script>

<style src="element-ui/lib/theme-default/index.css"></style>
<style src="animate.css"></style>
<style src="material-design-icons/iconfont/material-icons.css"></style>

<style src="./assets/css/theme.scss" lang="scss"></style>
<style src="./assets/css/fonts.css"></style>
<style lang="scss">

@import './assets/css/constants';

#app {
  height: 100%;
  margin: 0;
  background-color: white;
  transition: all 1s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &.highlight {
    background-color: #ccc;

    .content {
        background-color: #ccf;
    }
    .dokbot-section {
      background-color: #fcc;
    }
    .sideboard {
      background-color: #cfc;
    }
  }

}

nav#header {
  width: 100%;
  min-height: 50px;
  opacity: 1;
  padding: 0;
  text-align: center;
  z-index: 999;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: white;
  color: #00384a;

  > * {
    color: #00384a;
    vertical-align: middle;
  }

  .branding-title {
    font-size: 24px;
    margin-left: 5px;
    font-family: MuseoSansRounded500, sans-serif;
  }

  .account {
    font-size: 18px;
    position: absolute;
    right: 10px;

    a {
      color: #00384a;
      margin: 0 10;
    }
  }
}

section.content {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.dokbot-section {
  height: 100%;
  width: 600px;
}

aside.sideboard {
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #F4F5F7;
}

#progress-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}

.name {
  text-align: right;
  font-size: 22px;
  padding: 0 20px;
}

.loader-enter-active {
  animation: loader 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes loader {
  0% {
    min-height: 100%;
    opacity: 0;
  }
  66% {
    min-height: 100%;
    opacity: 1;
  }
  100% {
    min-height: 50px;
    opacity: 1;
  }
}

.sideboard-enter-active {
  animation: growth-fade-in 2s;
}

@keyframes growth-fade-in {
  0% {
    max-width: 0%;
    opacity: 0;
  }
  66% {
    max-width: 100%;
    opacity: 0;
  }
  100% {
    max-width: 100%;
    opacity: 1;
  }
}
</style>
