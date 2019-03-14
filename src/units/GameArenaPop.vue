<template>
  <PopUp v-if="config" :config="config">
    <GameArena :config="config"/>
  </PopUp>
</template>
<script>
import comps from "@vuc/comps.js";
import GameArena from "./game/GameArena.vue"
export default {
  components: comps.useComp({GameArena}),
  name: 'vuc-confirm',
  props:["config"],
}
</script>
