<template>
	<div v-if="status === 'loading'">
		<div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
			 <img src="../../assets/img/loading.gif">
		</div>
	</div>

	<div v-else-if="status === 'show'" class="search-results-content">
 
		<div class="payment" v-for="item in items" 
			v-bind:class="{ selected: (item.id == selectedItem && clicked)}"
			v-on:click="selectItem(item.id)">		 
			<div class="search-results-item search-results-choose"  style="width: 5%;">
				<span class="circle"></span>
			</div>

			<div class="search-results-item search-results-sender"  style="width: 20%;">{{ item.date }}</div>
			
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
	name: 'chat-items',
	data() {
	  return {
		items: [],
		filteredItems: [],
		recordsCount: 20,
		positionY: 0,
		status: 'show',
		clicked: false,
		selectedItem: ''
	  }
	},
	created() {
		this.fetchData();
		
		this.name = appConfig.name;
		
		if (window.ws == undefined) {
			window.ws = new WebSocket('ws://jwt-chat.herokuapp.com');
			//window.ws = new WebSocket('ws://localhost:3000');
 
		}
		ws.onerror = (e) => {
			appConfig.notifications.items.push(this.notification);
		};
		
		ws.onopen = () => {
			//ws.send('Hello '  + appConfig.name +  ' !!!'); 
		};

		ws.onmessage = (e) => {
			let messageObject = e.data;
			if (messageObject.split('###')[0] != 'still alive') {
				this.items.unshift({
					id: +new Date(),
					name: messageObject.split('###')[1],
					date: messageObject.split('###')[2],
					message: messageObject.split('###')[0]
				})
				appConfig.messages.items.unshift({
					id: +new Date(),
					name: messageObject.split('###')[1],
					date: messageObject.split('###')[2],
					message: messageObject.split('###')[0]
				})
			}
			appConfig.http = true;
			appConfig.$emit('itemsCount', appConfig.messages.items.length);
		};
		
		appConfig.$on('searchName', searchQuery => {
			if (!appConfig.http) {
				return;
			}
			
			appConfig.http = false;
			let messageObject;
			messageObject = searchQuery + '###' + appConfig.name;
			ws.send(messageObject);	
		});
		
		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		}
	},
	methods: {
	 	goSend() {
			let messageObject;
			messageObject = 'this.state.messageText' + '###' + appConfig.name;
			ws.send(messageObject);
		},
		fetchData() {
			this.status = 'loading';
			this.$http.get(appConfig.URL + 'messages/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {
				//console.log(result.data)
					let items = result.data.sort(this.sort);
 
					appConfig.messages.items = items;
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
		selectItem(id) {
			this.selectedItem = id;
			this.clicked = !this.clicked;
		},
		onItem() {
			this.clicked = !this.clicked;
		},			
		showDetails(item){
			appConfig.car = item;
			this.$router.push('car-edit');
		},
		sort(a, b) {
			let nameA = +a.id, nameB = +b.id;
			if (nameA < nameB) {
				return 1
			}
			if (nameA > nameB) {
				return -1
			}
			return 0;
		}				
	}
}
</script>
