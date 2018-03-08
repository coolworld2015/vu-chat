<template>
	<div v-if="status === 'loading'">
		<div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
			 <img src="../../assets/img/loading.gif">
		</div>
	</div>

	<div v-else-if="status === 'show'" class="search-results-content">
 
		<div class="payment" v-for="item in items" 
			v-bind:class="{ selected: (item.name !== name)}"
			v-on:click="goSend(item)">			 
			<div class="search-results-item search-results-choose"  style="width: 5%;">
				<span class="circle"></span>
			</div>

			<div class="search-results-item search-results-sender"  style="width: 15%;">{{ item.date }}</div>
			
			<div class="search-results-item search-results-result long-term"  style="width: 20%;">
				<div class="search-results-icon"
					v-bind:class="{ reded: (item.name !== name)}">
				</div>
				{{ item.name }}
			</div>
			
			<div class="search-results-item search-results-sender"  style="width: 45%;">{{ item.message }}</div>
 
		</div> 
	</div>

	<div v-else-if="status === 'error'">
 		<div style="position: relative; top: 200px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; color: red; font-weight: bold; font-size:24px">
             Something went wrong
		</div>
	</div>	
</template>

<script>
import Vue from 'vue';
import appConfig from '../../main';

export default {
	name: 'cars-items',
	data() {
	  return {
		items: [],
		filteredItems: [],
		recordsCount: 20,
		positionY: 0,
		status: 'show',
		clicked: false,
	  }
	},
	created() {
		this.name = appConfig.name;
		
		if (window.ws == undefined) {
			window.ws = new WebSocket('ws://ui-socket.herokuapp.com');
 
		}
		ws.onerror = (e) => {
			appConfig.notifications.items.push(this.notification);
		};
		
		ws.onopen = () => {
			ws.send('Hello '  + appConfig.name +  ' !!!'); 
		};

		ws.onmessage = (e) => {
			let d = new Date; 
			let messageObject = e.data;
			console.log(this.items)
			if (messageObject.split('###')[0] != 'still alive') {
				this.items.unshift({
					id: +new Date(),
					name: messageObject.split('###')[1],
					date: d.toTimeString().split(' ')[0],
					message: messageObject.split('###')[0]
				})
			}
		};

//---------------------------------------------------------------------------------------------------
	/*	
		this.items = appConfig.sockets.items.sort(this.sort).slice(0, 20);
		this.filteredItems = appConfig.sockets.items.sort(this.sort);
		setTimeout(()=> {
			if (document.querySelector('.search-results-content')) {
				document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)
			}
		}, 100);
		
		if (appConfig.sockets.refresh) {
            appConfig.sockets.refresh = false;
			//this.fetchData();
		}
		
		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		}
		appConfig.$on('clearHeader', () => {
			this.status = 'show';
			setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
		})
		appConfig.$on('searchQueryPhones', (searchQuery, searchType) => {
			this.searchQuery = searchQuery;
			let arr = [].concat(appConfig.sockets.items);
			let items = [].concat(appConfig.sockets.items);
			
			if (searchType == 'name') {
				items = arr.filter((el) => el.name.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
			} 
			
			if (searchType == 'phone') {
				items = arr.filter((el) => el.phone.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
			}
			
			this.filteredItems = items;
			this.items = items.slice(0, 20);
			this.positionY = 0;
			this.recordsCount = 20;
			appConfig.$emit('itemsCount', items.length);
			if (searchQuery == '') {
				this.items = appConfig.sockets.items.slice(0, 20);
				this.filteredItems = appConfig.sockets.items;
			}
		})
		appConfig.$on('searchName', searchQuery => {
				this.status = 'loading';
				if (!appConfig.http) {
					return;
				}
				
				if (searchQuery !== '') {
				appConfig.http = false;
				this.$http.get(appConfig.URL + 'items/findByName/' + searchQuery, {headers: {'Authorization': appConfig.access_token}})
					.then(result => {
						let items = result.data.sort(this.sort);
						items.forEach((el)=>{
							if(el.phone == '') {el.phone = 'n/a'}	
							if(el.job == '') {el.job = 'n/a'}	
							if(el.pos == '') {el.pos = 'n/a'}	
						})
						appConfig.sockets.items = items;
						this.items = items.slice(0, 20);
						this.filteredItems = items;
						appConfig.$emit('itemsCount', result.data.length);
						setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
						this.status = 'show';
						appConfig.http = true;
						appConfig.$emit('clearHeader');
					}).catch((error)=> {
						appConfig.notifications.items.push(this.notification);
						this.status = 'show';
						appConfig.http = true;
					})
				}
		}),
		appConfig.$on('searchPhone', searchQuery => {
				this.status = 'loading';
				if (!appConfig.http) {
					return;
				}
				
				if (searchQuery !== '') {
				appConfig.http = false;
				this.$http.get(appConfig.URL + 'items/findByPhone/' + searchQuery, {headers: {'Authorization': appConfig.access_token}})
					.then(result => {
						let items = result.data.sort(this.sort);
						items.forEach((el)=>{
							if(el.phone == '') {el.phone = 'n/a'}	
							if(el.job == '') {el.job = 'n/a'}	
							if(el.pos == '') {el.pos = 'n/a'}	
						})
						appConfig.sockets.items = items;
						this.items = items.slice(0, 20);
						this.filteredItems = items;
						appConfig.$emit('itemsCount', result.data.length);
						setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
						this.status = 'show';
						appConfig.http = true;
						appConfig.$emit('clearHeader');
					}).catch((error)=> {
						appConfig.notifications.items.push(this.notification);
						this.status = 'show';
						appConfig.http = true;
					})
				}
		})
	*/	
	},
	methods: {
	 	goSend() {
		/*
			if (this.state.messageText == '') {
				this.setState({
					invalidValue: true
				});
				return;
			}
		*/	
			let messageObject;
			messageObject = 'this.state.messageText' + '###' + appConfig.name;
			
			ws.send(messageObject);
			
			this.refs.textarea.value = '';
			this.setState({
				messageText: '',
				showProgress: true
			});
		},
		fetchData() {
			this.status = 'loading';
			this.$http.get(appConfig.URL + 'items/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {
					let items = result.data.sort(this.sort);
					items.forEach((el)=>{
						if(el.phone == '') {el.phone = 'n/a'}	
						if(el.job == '') {el.job = 'n/a'}	
						if(el.pos == '') {el.pos = 'n/a'}	
					})
					appConfig.sockets.items = items;
					this.items = items.slice(0, 20);
					this.filteredItems = items;
					this.status = 'show';
					appConfig.$emit('itemsCount', result.data.length);
					setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.status = 'show';
				})
		},
		handleScroll() {
			var position = document.querySelector('.search-results-content').scrollTop;
			var items, positionY, recordsCount;
			recordsCount = this.recordsCount;
			positionY = this.positionY;
			items = this.filteredItems.slice(0, recordsCount);
			
			if (position > positionY) {
				this.items = items;
				this.recordsCount = recordsCount + 10;
				this.positionY = positionY + 400;
			}
		},
		onItem(item) {
			if (this.clicked) {
				this.clicked = false;
			} else {
				this.clicked = true;
			}
		},			
		showDetails(item){
			appConfig.car = item;
			this.$router.push('car-edit');
		},
		sort(a, b) {
			let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}
			return 0;
		}				
	}
}
</script>
