<template>
  <div class="presentation fixed inset-0 flex items-center justify-center" :class="value?'overlay':'hidden-overlay'" @click.prevent="callParents" />
</template>

<script>
export default {
  props: { value: { type: Boolean, default: false } },
  methods: {
    callParents () {
      this.$emit('change')
    }
  }
}
</script>>

<style>
.overlay {
    z-index: 29;
    animation-name: keyframes-animation-2f81d449-0-1-4;
    -webkit-box-pack: center;
    pointer-events: auto;
    background-color: rgba(24, 48, 85, 0.3);
    -webkit-box-align: center;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    transition: background-color 250ms ease-out 0s;
}

.hidden-overlay {
    z-index: 29;
    transition: background-color 250ms ease-out;
    -moz-transition: background-color 250ms ease-out;
    -webkit-transition: background-color 250ms ease-out;
    animation-name: none;
    pointer-events: none;
    -webkit-box-pack: center;
    background-color: rgba(24, 48, 85, 0);
    -webkit-box-align: center;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
}

</style>
