<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<audits-header></audits-header> 
					<audits-items></audits-items>
				</section>
				<audits-footer></audits-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import auditsHeader from '@/components/audits/header';
import auditsItems from '@/components/audits/items';
import auditsFooter from '@/components/audits/footer';

export default {
  name: 'audits',
  data () {
    return {
      route: 'Audits'
    }
  },
	created() {
		appConfig.getAccessToken();
		if (appConfig.access_token == 'login') {
			this.$router.push('login');
		} 
		
		appConfig.route = this.route;			
	},
	components: {
		navbar:	navbar,
		auditsHeader: auditsHeader,
		auditsItems: auditsItems,
		auditsFooter: auditsFooter
	}
}
</script>
