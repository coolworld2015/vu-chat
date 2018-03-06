<template>
	<div v-if="loading">
		<div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
			 <img src="../../assets/img/loading.gif">
		</div>
	</div>
	
	<div v-else>
		<form action="/" class="payment-form payment-form--create d-flex justify-content-stretch">				
			<fieldset class="sender-data form-section-wrapper">
				<legend>Відправник</legend>
				
				<div class="form-section">
					<div class="form-group">
						<label for="senderSurname">Прізвище</label>
						<input type="text" class="form-control" id="senderSurname" placeholder="Прізвище відправника" v-model="name">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть прізвище відправника.
						</div>
					</div>
					<div class="form-group">
						<label for="senderName">Ім'я</label>
						<input type="text" class="form-control" id="senderName" placeholder="Ім'я відправника" v-model="pass">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть ім'я відправника.
						</div>
					</div>
					<div class="form-group">
						<label for="senderPatronymic">По-батькові</label>
						<input type="text" class="form-control" id="senderPatronymic" placeholder="По-батькові відправника" v-model="description">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть по-батькові відправника.
						</div>
					</div>
					<div class="form-group">
						<label for="senderPhone">Номер телефону</label>
						<input type="text" class="form-control" id="senderPhone" placeholder="+380 (XX) XXX-XX-XX" v-model="amount">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть номер телефону відправника.
						</div>
					</div>
					<div class="form-group input-disabled">
						<label for="senderBirthday">Дата народження</label>
						<input type="text" class="form-control" id="senderBirthday" placeholder="ДД.ММ.РРРР" disabled>
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть дату народження відправника.
						</div>
					</div>
					<div class="form-group input-disabled">
						<label for="senderBirthPlace">Місце народження</label>
						<input type="text" class="form-control" id="senderBirthPlace" placeholder="Місто народження, країна" disabled>
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть місце народження відправника.
						</div>
					</div>
					<div class="form-group input-disabled">
						<label for="taxId">ІПН</label>
						<input type="text" class="form-control" id="taxId" placeholder="Ідентифікаційний номер" disabled>
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть індивідуальний податковий номер відправника.
						</div>
					</div>
				</div>

				<div class="form-section">
					<div class="form-group">
						<label for="typeId">Тип документу</label>
						<select class="form-control" id="typeId">
							<option>{{ amount }}</option>
						</select>
						<div class="invalid-feedback">
							Будь ласка, виберіть зі списку тип документу.
						</div>
					</div>

					<div class="form-row">
						<div class="form-group col-md-3">
							<label for="idSeries">Серія</label>
							<input type="text" class="form-control" id="idSeries" placeholder="-" v-model="amount">
							<div class="invalid-feedback">
								Будь ласка, коректно вкажіть серію документу.
							</div>
						</div>
						<div class="form-group col-md-9">
							<label for="numberId">Номер</label>
							<input type="text" class="form-control" id="numberId" placeholder="-" v-model="amount">
							<div class="invalid-feedback">
								Будь ласка, коректно вкажіть номер документу.
							</div>
						</div>
					</div>
					
					<div class="form-group">
						<label for="issueOrganization">Орган видачі</label>
						<textarea class="form-control" row="3" id="issueOrganization" placeholder="Організація, що видала документ"></textarea>	
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть організацію, що видала документ.
						</div>
					</div>

					<div class="form-group">
						<label for="issueDate">Дата видачі</label>
						<input type="text" class="form-control" id="issueDate" placeholder="ДД.ММ.РРРР">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть дату видачі документу.
						</div>
					</div>

				</div>
			</fieldset>
			
			<fieldset class="receiver-data">
				<legend>Отримувач</legend>
				<div class="form-section">
					<div class="form-group">
						<label for="receiverSurname">Прізвище</label>
						<input type="text" class="form-control" id="receiverSurname" placeholder="Прізвище отримувача">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть прізвище отримувача.
						</div>
					</div>
					<div class="form-group">
						<label for="receiverName">Ім'я</label>
						<input type="text" class="form-control" id="receiverName" placeholder="Ім'я отримувача">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть ім'я отримувача.
						</div>
					</div>
					<div class="form-group">
						<label for="receiverPatronymic">По-батькові</label>
						<input type="text" class="form-control" id="receiverPatronymic" placeholder="По-батькові отримувача">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть по-батькові отримувача.
						</div>
					</div>
					<div class="form-group">
						<label for="receiverPhone">Номер телефону</label>
						<input type="text" class="form-control" id="receiverPhone" placeholder="+380 (XX) XXX-XX-XX">
						<div class="invalid-feedback">
							Будь ласка, коректно вкажіть номер телефону отримувача.
						</div>
					</div>
				</div>
			</fieldset>

			<fieldset class="amount-data">
				<legend>Сума</legend>
				<div class="form-section">
					<div class="form-group">
						<label for="amount">Сума переказу, грн</label>
						<input type="number" class="form-control" id="amount" placeholder="0.00" v-model="amount">
						<div class="invalid-feedback">
							Сума переказу не може перевищувати 149 999.99 грн.
						</div>
					</div>
					<div class="form-group">
						<label for="fee">Комісія</label>
						<input type="text" class="form-control" id="fee" value="2%" disabled>
					</div>
					<div class="form-group">
						<label for="totalAmount">Загальна сума</label>
						<input type="text" class="form-control" id="totalAmount" disabled>
					</div>
					<div class="form-group">
						<label for="amountReceived">Гроші клієнта</label>
						<input type="number" class="form-control" id="amountReceived" placeholder="0.00">
						<div class="invalid-feedback">
							Сума не може бути меншою за загальну суму переказу!
						</div>
					</div>
					<div class="form-group">
						<label for="charge">Решта</label>
						<input type="text" class="form-control" id="charge" disabled>
					</div>
				</div>
			</fieldset>
		</form>	
		<div class="form-info">
			<p>Відправити платіж <span class="amount">{{((+amount).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}}</span> UAH</p>
			<button class="btn btn-danger" type="submit" v-on:click="addItem">Відправити</button>
		</div>
	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';

export default {
	name: 'users-add',
	data() {
		return {
			name: '',
			pass: '',
			description: '',
			amount: '',
			loading: false
		}
	},
	created() {
 
	},
	methods: {
		setData() {
			if (appConfig) {
				if (appConfig.user) {
					this.id = appConfig.user.id;
					this.name = appConfig.user.name;
					this.pass = appConfig.user.pass;
					this.description = appConfig.user.description;
				}
			}
		},
		goBack() {
			this.$router.push('/users');
		},
		addItem() {
			this.loading = true;
			this.$http.post('https://ui-base.herokuapp.com/api/users/add', {                
					id: +new Date,
					name: this.name,
					pass: this.pass,
					description: this.description})
				.then(result => { 
					this.$router.push('/users');
				})
		},
	}
}
</script>
