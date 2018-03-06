<template>
	<header class="header d-flex justify-content-center align-items-center">
		<form class="search-form" id="search" style="display: block; position: absolute; top: -55px;">
			<input type="text" class="form-control" placeholder="Search by user" 
			v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
			<svg class="search-form-svg"><use xlink:href="#maginifierTool"></use></svg>
			<span class="hot-key-hint hot-key-hint--left">/</span>
		</form>

		<div class="search-results-header">
			<div class="search-results-item search-results-choose"></div>
			<div class="search-results-item search-results-sender" style="width: 20%; padding-left: 20px;">ID</div>
			<div class="search-results-item search-results-product"style="width: 15%; right: 20px;">User</div>
			<div class="search-results-item search-results-transfer" style="width: 20%; padding-left: 40px;">Date</div>
			<div class="search-results-item search-results-sender" style="width: 15%; padding-left: 10px;">IP</div>
			<div class="search-results-item search-results-amount" style="width: 20%; padding-left: 20px;">Description</div>
 
		</div>
	</header>	
</template>

<script>
import appConfig from '../../main';

export default {
	name: 'users-header',
	data() {
	  return {
		searchQuery: ''
	  }
	},
	methods: {
		changeView() {
			appConfig.$emit('searchQueryAudits', this.searchQuery);
		},
		searchClear() {
			this.searchQuery = '';
			appConfig.$emit('searchQueryAudits', this.searchQuery);
		}
	}	
}
</script>

<!--

		<div class="search-results-header">
			<div class="search-results-item search-results-choose"></div>
			<div class="search-results-item search-results-sender" style="left: 25px;">ID</div>
			<div class="search-results-item search-results-product">Пользователь</div>
			<div class="search-results-item search-results-sender" style="left: 25px;">Дата</div>
			<div class="search-results-item search-results-transfer" style="left: -15px;">Описание</div>
			<div class="search-results-item search-results-amount" style="left: -25px;">Адрес</div>
			<div class="search-results-item search-results-result">Индекс</div>
		</div>

-->		