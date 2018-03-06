<template>
  <header class="header d-flex justify-content-center align-items-center">
    <form class="search-form" id="search" style="display: block; position: absolute; top: -55px;">
      <input type="text" class="form-control" placeholder="Search by login"
             v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
      <svg class="search-form-svg"><use xlink:href="#maginifierTool"></use></svg>
      <span class="hot-key-hint hot-key-hint--left">/</span>
    </form>

    <div class="search-results-header">
      <div class="search-results-item search-results-choose" style="width: 5%;"></div>
      <div class="search-results-item search-results-sender" style="width: 25%; padding-left: 40px;">ID</div>
      <div class="search-results-item search-results-product"style="width: 20%; right: 0px;">Login</div>
      <div class="search-results-item search-results-sender" style="width: 20%; padding-left: 10px;">Password</div>
      <div class="search-results-item search-results-amount" style="width: 20%; right: 0px;">Description</div>


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
        appConfig.$emit('searchQueryUsers', this.searchQuery);
      },
      searchClear() {
        this.searchQuery = '';
        appConfig.$emit('searchQueryUsers', this.searchQuery);
      }
    }
  }
</script>
