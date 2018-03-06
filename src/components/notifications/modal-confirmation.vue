<template>
  <div class="confirm">
    <p class="confirm-message" v-html="html"></p>
    <div class="d-flex justify-content-center">
      <button class="btn btn-danger" v-on:click="confirmModal">Delete</button>
      <button class="btn btn-secondary" v-on:click="cancelModal">Cancel</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal-confirmation',
    data () {
      return {
        html: this.params.html
      }
    },
    props: ['params', 'cancel'],
    methods: {
      cancelModal: function () {
        this.cancel()
      },
      confirmModal: function () {
        this.params.confirm()
        this.cancel()
      }
    }
  }
</script>