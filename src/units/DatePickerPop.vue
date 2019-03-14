<template>
  <PopUp v-if="config" :config="config">
    <DatePicker :config="config"/>
  </PopUp>
</template>
<script>
import comps from "@vuc/comps.js";
export default {
  components: comps,
  name: 'vuc-confirm',
  props:["config"],
}
</script>
