<template>
  <button class="button" :style="{color: color, borderColor: color}" @click="handleClick" :class="{rounded: rounded}"><slot></slot>!!!</button>
</template>

<script>
  export default {
    props: {
      rounded: Boolean,
      handleClick: {
        default: () => () => null
      },
      color: {
        default: '#42b983'
      }
    }
  }
</script>
