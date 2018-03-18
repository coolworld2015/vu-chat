<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<chat-header></chat-header> 
					<chat-items></chat-items>
				</section>
				<chat-footer></chat-footer> 
			</main>
		</div>
	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import chatHeader from '@/components/chat/header';
import chatItems from '@/components/chat/items';
import chatFooter from '@/components/chat/footer';

export default {
  name: 'chat',
  data () {
    return {
      route: 'Chat'
    }
  },
	created() {
		appConfig.getAccessToken();
		appConfig.getName();
		if (appConfig.access_token == 'login') {
			this.$router.push('login');
		}
		
		appConfig.route = this.route;		
		appConfig.http = true;			
	},
	components: {
		navbar,
		chatHeader,
		chatItems,
		chatFooter
	}
}
</script>
