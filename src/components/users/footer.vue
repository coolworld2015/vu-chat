<template>
	<section class="activated-payments d-flex justify-content-start align-items-center shown" id="activatedPayments">
		<div class="activated-payments-item">
			<span class="selected-payments" id="activatedPaymentsBox" style="width: 44px;">{{ count }}</span>
			Records
		</div>
		<div class="activated-payments-item" v-on:click="addItem">
			<button class="" id="cancelSelection">
				<svg class="activated-payments-svg"><use xlink:href="#plus"></use></svg>
				New item
			</button>
		</div>
<!--
		<div class="activated-payments-item">
			<button id="showTrusted">
			<svg class="activated-payments-svg"><use xlink:href="#flag"></use></svg>
			Відмінити довірені
			<svg class="activated-payments-svg activated-payments-svg--end"><use xlink:href="#triangle"></use></svg>
			</button>
		</div>
		<div class="activated-payments-item">
			<button id="showTrusted">
			<svg class="activated-payments-svg"><use xlink:href="#graph"></use></svg>
			Згенерувати звіт
			<svg class="activated-payments-svg activated-payments-svg--end"><use xlink:href="#triangle"></use></svg>
			</button>
		</div>
		<div class="search-results-item">
			<span class="hint">click</span>
			Виділити
			<span class="hint">esc</span>
			Зняти виділення
		</div> 
-->
	</section>	
</template>

<script>
import appConfig from '../../main';

export default {
	name: 'users-footer',
	data() {
	  return {
		count: 0
	  }
	},
	created() {
		appConfig.$on('itemsCount', itemsCount => {
			this.count = itemsCount;
		})			
	},
	methods: {		
		addItem(){
			this.$router.push('user-add');
		}	
	}
}
</script>
