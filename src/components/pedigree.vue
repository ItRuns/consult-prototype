<template>
  <div id="pedigree">
    <div class="graph" @click="togglePatientInfo">
      <img src="../assets/pedigree-sample.png" />
      <div v-if="showInfoPanel" class="devinfo-overlay">
        <div style="font-style: normal;">DEV INFO</div>
        <div v-if="pedigree.brothers !== null">Brothers: {{ pedigree.brothers }}</div>
        <div v-if="pedigree.sisters !== null">Sisters: {{ pedigree.sisters }}</div>
        <div v-if="pedigree.paternalUncles !== null">Paternal Uncles: {{ pedigree.paternalUncles }}</div>
        <div v-if="pedigree.paternalAunts !== null">Paternal Aunts: {{ pedigree.paternalAunts }}</div>
        <div v-if="pedigree.maternalUncles !== null">Maternal Uncles: {{ pedigree.maternalUncles }}</div>
        <div v-if="pedigree.maternalAunts !== null">Maternal Aunts: {{ pedigree.maternalAunts }}</div>
        <div>Note: Clicking sample pedigree<br/>will trigger a proband click.<br/></div>
      </div>
    </div>
    <transition name="patient-info">
      <patient-info class="patient-info" v-if="selectedPatient" />
    </transition>
  </div>
</template>

<script>
import PatientInfo from './patient-info'

export default {
  name: 'pedigree',
  components: {
    PatientInfo,
  },
  computed: {
    pedigree() { return this.$store.state.pedigree },
    selectedPatient() { return this.$store.state.selectedPatient },
  },
  data() {
    return {
      showInfoPanel: false,
    }
  },
  methods: {
    togglePatientInfo() {
      if (this.$store.state.features.pedigreeClicking) {
        this.$store.commit('selectPatient', !this.selectedPatient)
      }
    },
  },
  mounted() {
    setTimeout(() => (this.showInfoPanel = true), 2000)
  },
}
</script>

<style lang="scss" scoped>
#pedigree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.graph {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  flex: 2;
}

.devinfo-overlay {
  position: absolute;
  left: 10px;
  bottom: 20px;
  font-size: 12px;
  border: 1px solid #999;
  color: #999;
  font-style: italic;
  padding: 10px;
}

.patient-info {
  flex: 1;
  width: 100%;
  min-height: 150px;
  max-height: 300px;
  background-color: #fff;
}

/*
.patient-info-enter-active {
  animation: grow-height 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes grow-height {
  0% { max-height: 0; background-color: #fff; }
  100% { min-height: 100%; background-color: #fdd; }
}
*/
</style>
