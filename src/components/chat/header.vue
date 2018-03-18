<template>
	<header class="header d-flex justify-content-center align-items-center">
		<form v-show="name" class="search-form" id="search" style="display: block; position: absolute; top: -55px; width: 450px;">
			<input type="text" class="form-control" placeholder="Send message" 
				v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
				
			<div v-on:click="searchName">
				<svg class="search-form-svg">
					<svg class="svg-icon" viewBox="0 0 20 20">
							<path d="M17.211,3.39H2.788c-0.22,0-0.4,0.18-0.4,0.4v9.614c0,0.221,0.181,0.402,0.4,0.402h3.206v2.402c0,0.363,0.429,0.533,0.683,0.285l2.72-2.688h7.814c0.221,0,0.401-0.182,0.401-0.402V3.79C17.612,3.569,17.432,3.39,17.211,3.39M16.811,13.004H9.232c-0.106,0-0.206,0.043-0.282,0.117L6.795,15.25v-1.846c0-0.219-0.18-0.4-0.401-0.4H3.189V4.19h13.622V13.004z"></path>
						</svg>
				</svg>
			</div>
		</form>		
		
		<form v-show="phone" class="search-form" id="search" style="display: block; position: absolute; top: -55px;">
			<input type="text" class="form-control" placeholder="Search by phone" 
				v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
				
			<div v-on:click="searchPhone">
				<svg class="search-form-svg">
					<use xlink:href="#maginifierTool"></use>
				</svg>
			</div>
		</form>

		<div class="search-results-header">
			<div class="search-results-item search-results-choose"></div>
 
			<div class="search-results-item search-results-sender" style="width: 25%; left: 40px">Date</div>
			<div class="search-results-item search-results-sender" style="width: 15%; right: 30px">User</div>
 
			<div class="search-results-item search-results-result" style="width: 10%; right: 5px">Message</div>
 
		</div>
	</header>	
</template>

<script>
import appConfig from '../../main';

export default {
	name: 'chat-header',
	data() {
	  return {
		searchQuery: '',
		searchType: 'name',
		name: true,
		phone: false
	  }
	},
	created() {
		appConfig.$on('clearHeader', () => {
			this.searchClear();
		});
	},
	methods: {		
		changeView(e) {
			if (e.keyCode === 13) {this.searchName()}
		},
		searchClear() {
			this.searchQuery = '';
			appConfig.$emit('searchQueryPhones', this.searchQuery);
		},
		searchName() {
			if (this.searchQuery == '') {
				return;
			}
			appConfig.$emit('searchName', this.searchQuery);
			this.searchQuery = '';
		},
		searchPhone() {
			appConfig.$emit('searchPhone', this.searchQuery);
		}
	}	
}
</script>
