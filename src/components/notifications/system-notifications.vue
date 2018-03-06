<template>
  <div class="message-out-of-panel">
    <notification-item v-for="item in items"
       :key="item.id"
       :title="item.title"
       :message="item.message"
       :time="item.time"
       :important="item.important">
    </notification-item>
  </div>
</template>

<script>
  import appConfig from '@/main'
  import NotificationItem from './notification-item'

  export default {
    name: 'system-notifications',
    data () {
      return {
        items: [],
      }
    },
    created () {
      window._ntfMgr = this
      this.items = appConfig.notifications.items
    },
    methods: {
      pushNotification (item) {
        this.items.push(item)
      },
      clearNotifications () {
        this.items = []
      }
    },
    components: {
      NotificationItem
    }
  }
</script>
