<script setup lang="ts">
interface Props {
  countryCode: string
}

defineProps<Props>()
</script>

<template>
  <span class="no-tw-container relative inline-block">
    <span class="no-tw-flagpole absolute bottom-0 left-0">
      <svg
        viewBox="0 0 131 139"
        fill="none"
        class="absolute size-full"
      >
        <path
          d="M126 138.5C103 138.5 92 110 63 110C69.5 110 73 138.5 82.5 138.5H126Z"
          class="fill-white/90"
        />
        <path
          d="M126 138.5C103 138.5 92 110 63 110C78 110 79.7 138.734 98.5 138.5H126Z"
          class="fill-gray-300"
        />
        <path
          d="M126 138.5C103 138.5 92 110 63 110C85 110 93 138.5 117.5 138.5H126Z"
          class="fill-gray-400"
        />
        <line
          x1="63"
          y1="110"
          x2="63"
          y2="4.37114e-08"
          class="stroke-gray-400"
          stroke-width="2"
        />
        <path
          d="M0 138C22 138 34 110 63 110C92 110 103 138 126 138"
          class="stroke-gray-400"
          stroke-width="2"
        />
        <line
          x1="1"
          y1="138"
          x2="131"
          y2="138"
          class="stroke-gray-400"
          stroke-width="2"
        />
      </svg>
    </span>

    <span class="no-tw-flag absolute top-0 right-0">
      <img
        :src="`https://flagcdn.com/${countryCode.toLowerCase()}.svg`"
        :alt="`${countryCode} flag`"
        width="120px"
        height="80px"
        class="no-tw-flag-shadow absolute size-full rounded-r object-contain object-left"
      >
    </span>
  </span>
</template>

<style scoped>
.no-tw-container {
  aspect-ratio: 186 / 139;
}

.no-tw-flagpole {
  aspect-ratio: 131 / 139;
  width: calc(100% * 131 / 186);
}

.no-tw-flag {
  width: calc(100% * 120 / 186);
  aspect-ratio: 120 / 80;
}

.no-tw-flag-shadow {
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1));
}
</style>
