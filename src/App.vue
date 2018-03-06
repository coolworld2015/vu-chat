<template>
  <div class="wrapper">
    <system-modal></system-modal>
    <system-notifications></system-notifications>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SystemNotifications from '@/components/notifications/system-notifications'
  import SystemModal from '@/components/notifications/system-modal'

  export default {
    name: 'app',
    components: {
      SystemNotifications,
      SystemModal
    }
  }
</script>

 
