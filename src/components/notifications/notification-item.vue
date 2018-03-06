<template>
  <div v-if="exists" class="message" :class="{ 'message-important': important, 'notification-fade': fadeout }"
       v-on:click="click" style="top: -80px;">
    <header class="message-header">
      <svg class="message-svg" :class="{ 'message-svg--creditCard': !important }">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="icon"></use>
      </svg>
      <span class="message-header-text">{{ title }}</span>
      <time>{{ time }}</time>
    </header>
    <span class="message-content">{{ message }}</span>
    <span class="hot-key-hint">\</span>
  </div>
</template>

<style scoped>
  .message {
    cursor: pointer
  }
</style>

<script>
  export default {
    name: 'notification-item',
    data () {
      return {
        time: this.currentTime(),
        fadeout: false,
        exists: true,
        icon: this.important ? '#message' : '#message'
      }
    },
    props: {
      title: String,
      message: String,
      important: Boolean
    },
    created () {
      if (!this.important) {
        setTimeout(() => {
          this.fadeout = true
          setTimeout(() => {
            this.exists = false
          }, 3000)
        }, 5000)
      }
    },
    methods: {
      currentTime: function () {
        const now = new Date()
        let hours = now.getHours()
        if (hours < 10) {
          hours = '0' + hours
        }
        let minutes = now.getMinutes()
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        return hours + ':' + minutes
      },
      click: function () {
        this.exists = false
      }
    }
  }
</script>
