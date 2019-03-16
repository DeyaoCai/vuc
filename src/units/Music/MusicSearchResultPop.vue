<template>
  <PopUp v-if="config" :config="config">
    <MusicSearchResult :config="config"/>
  </PopUp>
</template>
<script>
import {Wrap} from "vuc-ui";
import comps from "@vuc/comps.js";
const {MusicSearchResult} = comps;

export default {
  components: {Wrap, ...Wrap.relativeComp, MusicSearchResult},
  name: 'vuc-confirm',
  props:["config"],
}
</script>
