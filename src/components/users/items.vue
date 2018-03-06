<template>
  <div v-if="status === 'loading'">
    <div
      style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else-if="status === 'show'" class="search-results-content">
    <div class="payment" v-for="item in items" v-on:click="showDetails(item)">
      <div class="search-results-item search-results-choose" style="width: 5%;"><span class="circle"></span></div>
      <div class="search-results-item search-results-transfer" style="width: 25%;">{{ item.id }}</div>
      <div class="search-results-item search-results-sender" style="width: 20%;">{{ item.name }}</div>
      <div class="search-results-item search-results-transfer" style="width: 20%;">{{ item.pass }}</div>
      <div class="search-results-item search-results-transfer" style="width: 20%;">{{ item.description }}</div>

    </div>
  </div>

  <div v-else-if="status === 'error'">
    <div
      style="position: relative; top: 200px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; color: red; font-weight: bold; font-size:24px">
      Something went wrong
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import appConfig from '../../main';

export default {
	name: 'users-items',
	data() {
	  return {
		items: [],
		filteredItems: [],
		recordsCount: 20,
		positionY: 0,
		status: 'loading',
		clicked: false
	  }
	},
	created() {
		this.fetchData();
		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		}
		appConfig.$on('searchQueryUsers', searchQuery => {
			this.searchQuery = searchQuery;
			var arr = [].concat(appConfig.users.items);
			var items = arr.filter((el) => el.name.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
			this.filteredItems = items;
			this.items = items.slice(0, 20);
			this.positionY = 0;
			this.recordsCount = 20;
			
			appConfig.$emit('itemsCount', items.length);
			if (searchQuery == '') {
				this.items = appConfig.users.items.slice(0, 20);
				this.filteredItems = appConfig.users.items;
			}
		})
	},
	methods: {
		fetchData() {
			this.$http.get(appConfig.URL + 'users/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {
					appConfig.users.items = result.data.sort(this.sort);
					this.items = result.data.sort(this.sort).slice(0, 20);
					this.filteredItems = result.data.sort(this.sort);
					this.status = 'show';
					appConfig.$emit('itemsCount', result.data.length);
					setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.status = 'show';
					this.$router.push('login');
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
			appConfig.user = item;
			this.$router.push('user-edit');
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
