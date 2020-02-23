<template>
  <svg
    preserveAspectRatio="xMidYMid meet"
    height="1em"
    width="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke="currentColor"
    class="icon-7f6730be--text-3f89f380"
  >
    <g v-if="!right">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </g>
    <g v-else>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    right: { type: Boolean, default: false }
  }
}
</script>
