<template>
  <div id="patient-info">
    <div class="patient-name">
      <img src="../assets/heath.jpg" />
      <div class="name can-edit" @click="nextTopic('name')">{{phr.firstName}} {{phr.lastName}}</div>
      <div class="relation">You</div>
    </div>
    <div class="patient-traits">
      <div class="heading">Personal Traits</div>
      <div class="can-edit" @click="nextTopic('gender')"><label>Gender:</label> {{phr.gender}}</div>
      <div class="can-edit" @click="nextTopic('birthYear')"><label>Birth Year:</label> {{phr.birthYear}}</div>
    </div>
    <div class="patient-condition-attributes">
      <div class="heading">Conditions</div>
      <span style="font-style: italic; font-size: 14px">
      You can imagine a list of conditions here. Each condition has its attributes listed, and each is
        clickable to trigger the question from Dokbot.
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'patient-info',
  computed: {
    phr() { return this.$store.state.phr },
  },
  methods: {
    nextTopic(topic) {
      this.$store.dispatch('startTopic', topic)
    },
  },
}
</script>

<style lang="scss" scoped>
#patient-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
}

.patient-name {
  flex: 1;
  height: 100%;
  padding: 5px;
  border-right: 1px solid #eee;
  max-width: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: 10px 0 5px;
  }

  .name {
    font-size: 16px;
    padding: 5px;
    text-align: center;
    font-family: MuseoSansRounded700, sans-serif;
  }

  .relation {
    color: #aaa;
  }
}

.heading {
  background-color: #fdebe7;
  font-family: MuseoSansRounded500, sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  margin: -5px -5px 5px -5px;
}

.patient-traits {
  flex: 2;
  height: 100%;
  padding: 5px;
  border-right: 1px solid #eee;

  .can-edit {
    padding: 5px;
    label {
      cursor: pointer;
      display: inline-block;
      width: 75px;
      font-family: MuseoSansRounded500, sans-serif;
    }
  }
}

.patient-condition-attributes {
  flex: 2;
  height: 100%;
  padding: 5px;
}

.can-edit {
  cursor: pointer;
  padding: 5px;

  &:hover {
    background-color: #eee;
  }
}
</style>
