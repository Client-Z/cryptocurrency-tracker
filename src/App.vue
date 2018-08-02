<template>
  	<div id="app">
		<v-layout row class="currency-list">
			<template>
				<v-expansion-panel>
					<v-expansion-panel-content v-for="(value, key) in cryptos" class="purple white--text title font-weight-light">
					<div slot="header">
						<span class="left">{{ key }}</span>
						<span class="right">${{ value.USD }}</span>
					</div>
					<v-card class="body-1 white black--text">
						<v-card-text>Here a chart will be placed.</v-card-text>
					</v-card>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</template>
		</v-layout>
		<v-footer class="body-2 caption footer" fixed>
			<p class="text-md-center wide">Powered by ActiveWizards &copy; {{ new Date().getFullYear() }}</p>
		</v-footer>
  	</div>
</template>

<script>
import axios from 'axios'


export default {
	name: 'app',
	data: () => ({
		cryptos: [],
		errors: []
	}),
  	created () {
		
		axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT,XRP,EOS,AION,TRX&tsyms=USD')
			.then(response => {
				this.cryptos = response.data
				//console.log(response)         // This will give you access to the full object
			})
			.catch(e => {
				this.errors.push(e)
			});
		// for btc/usd
		const endpoint = 'https://min-api.cryptocompare.com/data/histominute?fsym=' + 'BTC' + '&tsym=' + 'USD' + '&limit=60&aggregate=3&e=CCCAGG';
		axios.get(endpoint)
			.then(response => {
				//this.cryptos = response.data
				console.log(response)
			})
			.catch(e => {
				this.errors.push(e)
			});
  	}
}

	
</script>

<style>
body, #app {
	background: #f1f1f1;
	min-height: 100vh;
	min-width: 100vw;
}

#app {
	padding-top: 30px;
}

.currency-list {
	width: 90%;
	margin: 0 auto;
}

.wide {
	width: 100%;
}

.footer {
	margin-top: 15px;
}

div#crypto-container {
	background:white;
	width: 70%;
	margin: 0 auto 4px auto;
	padding: 1em;
	box-shadow: 1px 1px 0 lightgrey;
}

span.left {
	font-weight: bold;
}

span.right {
	float:right;
}
</style>
