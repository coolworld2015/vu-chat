<template>
  <div v-if="status === 'loading'">
    <div
      style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else-if="status === 'show'" class="search-results-content">
    <div class="payment" v-for="item in items"
         v-bind:class="{ selected: (item.id == selectedItem && clicked)}"
         v-on:click="selectItem(item.id)">
      <div class="search-results-item search-results-choose"><span class="circle"></span></div>
      <div class="search-results-item search-results-sender" style="width: 20%;">{{ item.id }}</div>
      <div class="search-results-item search-results-transfer" style="width: 15%;">{{ item.name }}</div>
      <div class="search-results-item search-results-transfer" style="width: 20%;">{{ item.date }}</div>
      <div class="search-results-item search-results-amount" style="width: 20%;">{{ (item.ip).split('f:')[1]}}</div>
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
    name: 'audits-items',
    data() {
      return {
        items: [],
        filteredItems: [],
        recordsCount: 20,
        positionY: 0,
        status: 'loading',
        clicked: false,
        selectedItem: ''
      }
    },
    created() {
		this.fetchData();
		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		}
		appConfig.$on('searchQueryAudits', searchQuery => {
			this.searchQuery = searchQuery;
			let arr = [].concat(appConfig.audits.items);
			let items = arr.filter((el) => el.name.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1);
			this.filteredItems = items;
			this.items = items.slice(0, 20);
			this.positionY = 0;
			this.recordsCount = 20;

			appConfig.$emit('itemsCount', items.length);
			if (searchQuery == '') {
			  this.items = appConfig.audits.items.slice(0, 20);
			  this.filteredItems = appConfig.audits.items;
			}
		})
    },
    methods: {
      fetchData() {
        this.$http.get(appConfig.URL + 'audit/get', {headers: {'Authorization': appConfig.access_token}})
          .then(result => {
            appConfig.audits.items = result.data;
            this.items = result.data.slice(0, 20);
            this.filteredItems = result.data;
            this.status = 'show';
            appConfig.$emit('itemsCount', result.data.length);
            setTimeout(() => {
              document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)
            }, 100);
          }).catch((error) => {
				appConfig.notifications.items.push(this.notification);
				this.status = 'show';
				this.$router.push('/login');
        })
      },
      handleScroll() {
        let position = document.querySelector('.search-results-content').scrollTop;
        let items, positionY, recordsCount;
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
      showDetails(item) {
        appConfig.audit = item;
        this.$router.push('audit-edit');
      },
      sort(a, b) {
		return 0;
        let nameA = a.id.toLowerCase(), nameB = b.id.toLowerCase();
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