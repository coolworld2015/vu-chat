<template>
	<div class="wrapper" style="background: #dc3545;">
		<div class="content" style="background: #dc3545;">
			<div style="width: 400px; padding: 45px 90px 30px;
					margin: 160px auto; border-radius: 3px;
					color: #000; background: #fff;
					box-shadow: 0px 2px 15px 0px rgba(0,0,0,0.5); text-align: center;">
				<div class="col-sm-12 d-flex flex-column justify-content-around">
					<form class="align-self-center login-form" autocomplete="off">
						<p class="h5" style="font-weight: bold;">GAI</p>
						<img src="../../assets/img/logo.jpg" style="margin-bottom: 10px; width: 200px;"> 
						<input v-model="name" type="text" class="form-control login-input" id="user" placeholder="Login">
						<input v-model="pass" type="password" class="form-control login-input" id="password" placeholder="Password">
						<input type="submit" value="Submit" class="btn btn-danger button-login" id="login" v-on:click="fetchData">
						<div style="font-weight: bold; font-size: 14px; color: #dc3545; margin-top: 15px">
							<span v-show="error" >Access denied</span>
						</div>
						<img v-show="loading" src="../../assets/img/loading.gif" style="margin-bottom: -90px; margin-top: -60px;">
					</form>
				</div>
			</div>
		</div>
	</div> 
</template>

<script>
import appConfig from '../../main';

export default {
  name: 'login',
  data () {
    return {
      route: 'Login',
      name: '',
      pass: '',
	  loading: false,
	  error: false
    }
  },
	created() {
		appConfig.route = this.route;
		localStorage.setItem('access_token', 'login');
	},
	methods: {
		fetchData() {
			this.loading = true;
			this.error = false;
			this.$http.post('https://jwt-gai.herokuapp.com/api/login', 
				{
					name: this.name,
					pass: this.pass,
					description: 'Web'
				})
				.then(result => {
					appConfig.access_token = result.body.token;
					localStorage.setItem('access_token', result.body.token);
					this.loading = false;
					this.error = false;
					this.$router.push('cars');
				})
				.catch((error)=> {
					this.loading = false;
					this.error = true;
				})
		}	
	}
}
</script>
