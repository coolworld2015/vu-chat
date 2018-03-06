<template>
  <transition name="fade">
    <div v-if="modal" class="dark-screen" v-on:click="cancelGlobal($event)">
      <fin-mon-notification v-if="modal == 'fin-mon-notification'" v-bind:params="params" v-bind:cancel="cancel"></fin-mon-notification>
      <modal-confirmation v-if="modal == 'modal-confirmation'" v-bind:params="params" v-bind:cancel="cancel"></modal-confirmation>
    </div>
  </transition>
</template>

<script>
  import appConfig from '../../main'
  import FinMonNotification from '@/components/notifications/fin-mon-notification'
  import ModalConfirmation from '@/components/notifications/modal-confirmation'

  export default {
    name: 'system-modal',
    data () {
      return {
        modal: false,
        params: ''
      }
    },
    components: {
      FinMonNotification,
      ModalConfirmation
    },
    created () {
      appConfig.$on('showModal', (params) => {
        this.modal = params.elName
        this.params = params
      })
    },
    methods: {
      cancel () {
        this.modal = false
      },
      cancelGlobal (event) {
        if (event.target === event.currentTarget) this.modal = false
      }
    }
  }

</script>