<template>
   <aside class="navigation-sidebar" v-bind:class="{ shown: isActive }">
		<nav class="h-100 fp-navbar" onclick="event.preventDefault();return false">
			<ul class="h-100 fp-nav-right">
				<li v-on:click="changeView()">  
					<img src="../../assets/img/logo.jpg" style="width1: 250px; height: 50px; margin-right: 10px; margin-top: -5px; margin-left: 8px;" 
						v-on:click="changeView()" 
					/>  
					<span style="font-weight: bold; color: white; font-size: 20px; text-shadow: #000 0.15em 0.15em 0.15em;">
						GAI 
					</span>
				</li>  								 
				<li class="fp-nav-item fp-nav-item-right">
				  <span class="fp-nav-link menu-block-header">GAI</span>
				</li>				
				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('cars')" 
					v-bind:class="{ active: cars }">
					<span class="fp-nav-link">Cars</span>
				</li>				
<!--				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('phones')" 
					v-bind:class="{ active: find }">
					<span class="fp-nav-link">Search</span>
				</li>
-->
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('audits')" 
					v-bind:class="{ active: audits }">
					<span class="fp-nav-link">Audits</span>
				</li>
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('users')" 
					v-bind:class="{ active: users }">
					<span class="fp-nav-link">Users</span>
				</li>				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('')" 
					v-bind:class="{ active: logout }">
					<span class="fp-nav-link">Logout</span>
				</li>
			</ul>
			
			<ul class="h-100 fp-nav-left">
				<li class="fp-nav-item fp-nav-item-left li-border-bottom" v-on:click="changeView()">
					<span class="fp-nav-link" id="showNav" title="GAI">GA</span>
					<span class="hot-key-hint">~</span>
				</li>
				<li class="fp-nav-item fp-nav-item-left">
				  <span class="fp-nav-link"></span>
				  <span class="hot-key-hint">1</span>
				</li>
				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('cars')" 
					v-bind:class="{ active: cars }">
					<span class="fp-nav-link" title="Items">CA</span>
					<span class="hot-key-hint">2</span>
				</li>				
<!--				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('phones')" 
					v-bind:class="{ active: find }">
					<span class="fp-nav-link" title="Find">SR</span>
					<span class="hot-key-hint">2</span>
				</li>
-->
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('audits')" 
					v-bind:class="{ active: audits }">
					<span class="fp-nav-link" title="Audits">AU</span>
					<span class="hot-key-hint">4</span>
				</li>
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('users')" 
					v-bind:class="{ active: users }">
					<span class="fp-nav-link" title="Users">US</span>
					<span class="hot-key-hint">5</span>
				</li>				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('')" 
					v-bind:class="{ active: logout }">
					<span class="fp-nav-link" title="Logout">LO</span>
					<span class="hot-key-hint">5</span>
				</li>
			</ul>
		</nav>
	</aside> 
</template>

<script>
import appConfig from '../../main'

export default {
  name: 'navbar',
			data: function () {
			  return {
				searchQuery: '',
				route: appConfig.route,
				isActive: false,
				cars: null,
				find: null,
				audits: null,
				users: null,
				login: null,
				logout: null,
				test: null,
				test1: null,
				test2: null,
				test3: null,
				test4: null,
				test5: null,
			  }
			},
			created() {
				//console.log('appConfig ' + appConfig.route);
				this.init();
			},	
			methods: {
				init() {			
					if (this.route == 'Payments') {
						this.find = true;
					} else {
						this.find = false;
					}					
					
					if (this.route == 'Cars') {
						this.cars = true;
					} else {
						this.cars = false;
					}
					
					if (this.route == 'Audits') {
						this.audits = true;
					} else {
						this.audits = false;
					}		
					
					if (this.route == 'Users') {
						this.users = true;
					} else {
						this.users = false;
					}				
					
					if (this.route == 'Test') {
						this.test = true;
					} else {
						this.test = false;
					}					
					
					if (this.route == 'Test1') {
						this.test1 = true;
					} else {
						this.test1 = false;
					}				
					
					if (this.route == 'Test2') {
						this.test2 = true;
					} else {
						this.test2 = false;
					}					
					
					if (this.route == 'Test3') {
						this.test3 = true;
					} else {
						this.test3 = false;
					}			
					
					if (this.route == 'Test4') {
						this.test4 = true;
					} else {
						this.test4 = false;
					}					
					
					if (this.route == 'Test5') {
						this.test5 = true;
					} else {
						this.test5 = false;
					}					


				},				
				changeView() {
					console.log(this.route)
					
					if (this.isActive !== false) {
						this.isActive = false;
					}
					else {
						this.isActive = true;
					}

				},
				searchClear() {
					this.searchQuery = '';
					bus.$emit('searchQuery', this.searchQuery);
				},
				changeRoute(route) {
					event.preventDefault();
					//this.$router.push({ path: route});
					this.$router.push('/' + route);
					return false;
				}
			}
		}
 
</script>
 
