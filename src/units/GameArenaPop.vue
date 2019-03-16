<template>
  <PopUp v-if="config" :config="config">
    <GameArena :config="config"/>
  </PopUp>
</template>
<script>
import {Wrap} from "vuc-ui";
import GameArena from "./game/GameArena.vue"
export default {
  components: {Wrap, ...Wrap.relativeComp, GameArena},
  name: 'vuc-confirm',
  props:["config"],
}
</script>
