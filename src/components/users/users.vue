<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<users-header></users-header> 
					<users-items></users-items>
				</section>
				<users-footer></users-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import usersHeader from '@/components/users/header';
import usersItems from '@/components/users/items';
import usersFooter from '@/components/users/footer';

export default {
  name: 'users',
  data () {
    return {
      route: 'Users'
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
		usersHeader: usersHeader,
		usersItems: usersItems,
		usersFooter: usersFooter
	}
}
</script>
