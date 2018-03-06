<template>
	<div v-if="loading">
		<div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
			 <img src="../../assets/img/loading.gif">
		</div>
	</div>
	
	<div v-else>
		<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
			<div style="text-align: center; padding-right: 40px;">{{ model }}</div>
		</div>
		<form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
		  <fieldset class="sender-data form-section-wrapper">
			<div class="form-section" style="width: 100%;">
			  <div class="form-group">
				<label for="senderSurname">Model</label>
				<input type="text" class="form-control" id="senderSurname" placeholder="Model" v-model="model">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть прізвище відправника.
				</div>
			  </div>			  
			  
			  <div class="form-group">
				<label for="senderSurname">Registration</label>
				<input type="text" class="form-control" id="senderSurname" placeholder="Regnum" v-model="regnum">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть прізвище відправника.
				</div>
			  </div>		
			  
			  <div class="form-group">
				<label for="senderSurname">Year</label>
				<input type="text" class="form-control" id="senderSurname" placeholder="Year" v-model="year">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть прізвище відправника.
				</div>
			  </div>			
			  
			  <div class="form-group">
				<label for="senderSurname">Name</label>
				<input type="text" class="form-control" id="senderSurname" placeholder="Name" v-model="name">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть прізвище відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderName">Phone</label>
				<input type="text" class="form-control" id="senderName" placeholder="Phone" v-model="phone">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть ім'я відправника.
				</div>
			  </div>
			  
			  <div class="form-group">
				<label for="senderName">Birthday</label>
				<input type="text" class="form-control" id="senderName" placeholder="Birthday" v-model="bdate">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть ім'я відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderPatronymic">Job</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="Job" v-model="job">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>
			  
			  <div class="form-group">
				<label for="senderPatronymic">Position</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="Position" v-model="pos">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>			
			  
			  <div class="form-group">
				<label for="senderPatronymic">Street</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="Street" v-model="street">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>
			  
			  <div class="form-group">
				<label for="senderPatronymic">House</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="House" v-model="house">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>			  
			  
			  <div class="form-group">
				<label for="senderPatronymic">Apt</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="Apt" v-model="apt">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>			
	 
			  <div class="d-flex justify-content-center" style="margin-top: 30px;">
				<button class="btn btn-danger" v-on:click="goBack" style="margin: 10px; width: 100px; font-size: 14px;">Back</button>
 
			  </div>
	 
			</div>
		  </fieldset>
		</form>
 
	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';

export default {
	name: 'cars-edit',
	data() {
		return {
			model: '',
			regnum: '',
			year: '',
			name: '',
			phone: '',
			street: '',
			house: '',
			apt: '',
			bdate: '',
			job: '',
			pos: '',
			index: '',
			loading: false
		}
	},
	created() {
		if (!appConfig.car) {
			this.$router.push('/cars');
		} else {
			this.setData();
		}
	},
	methods: {
		setData() {
			if (appConfig) {
				if (appConfig.car) {
					this.id = appConfig.car.id;
					this.model = appConfig.car.model;
					this.regnum = appConfig.car.regnum;
					this.year = appConfig.car.year;
					this.name = appConfig.car.name + ' ' + appConfig.car.name1 + ' ' + appConfig.car.name2;
					this.bdate = appConfig.car.bdate;
					this.phone = appConfig.car.phone;
					this.street = appConfig.car.str;
					this.house = appConfig.car.house;
					this.apt = appConfig.car.apt;
					this.job = appConfig.car.job;
					this.pos = appConfig.car.pos;
				}
			}
		},
		goBack() {
			this.$router.push('/cars');
		}
	}
}
</script>
