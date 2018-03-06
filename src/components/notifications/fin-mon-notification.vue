<template>
  <div class="modal-dialog fin-mon-notification" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title w-100">УВАГА! Операція ≥ 15000,00грн.</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" v-on:click="cancelModal">×</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Для подальшої роботи необхідно виконати наступні дії:</p>
        <ol>
          <li>Перевірте строк дії документа, що підтверджує особу, наявність відповідної фотокартки при досягненні 25-и, 45-и річного віку</li>
          <li>Зробіть копію паспорту громадянина України (1, 2, 3-6 стр. та сторінку з останньою реєстрацією), або іншого документа, що підтверджує особу</li>
          <li>Завірте згідно з затвердженими в компанії вимогами усі копії документів</li>
        </ol> 
      </div>
      <div class="modal-footer fp-space-between">
        <span>
          <input id="modal_confirm" type="checkbox" v-on:change="confirmActions">
          <label for="modal_confirm">Я виконав(-ла) всі зазначені дії</label>
        </span>
        <span>
          <button class="btn fp-btn-primary" ref="next_btn" type="button" v-bind:disabled="disable" v-on:click="confirmModal">
            <span>Далі</span>
          </button>
          <button class="btn fp-btn-secondary" type="button" v-on:click="cancelModal">
            <span>Відміна</span>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'fin-mon-notification',
    data () {
      return {
        disable: true
      }
    },
    props: ['params', 'cancel'],
    methods: {
      confirmActions: function (event) {
        if (event.currentTarget.checked) {
          this.disable = false
        } else {
          this.disable = true
        }
      },
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