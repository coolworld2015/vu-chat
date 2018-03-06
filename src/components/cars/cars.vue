<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<cars-header></cars-header> 
					<cars-items></cars-items>
				</section>
				<cars-footer></cars-footer> 
			</main>
		</div>
	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import carsHeader from '@/components/cars/header';
import carsItems from '@/components/cars/items';
import carsFooter from '@/components/cars/footer';

export default {
  name: 'cars',
  data () {
    return {
      route: 'Cars'
    }
  },
	created() {
		appConfig.getAccessToken();
		if (appConfig.access_token == 'login') {
			this.$router.push('login');
		}
		
		appConfig.route = this.route;		
		appConfig.http = true;			
	},
	components: {
		navbar,
		carsHeader,
		carsItems,
		carsFooter
	}
}
</script>
