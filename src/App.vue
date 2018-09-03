<template>
  	<div id="app">
		<h1 class="headline text-md-center font-weight-light font-italic">Statistics of Cryptocurrencies</h1>
		<v-layout row class="currency-list">
			<template>
				<v-expansion-panel>
					<v-expansion-panel-content v-for="(value, key) in cryptos" :key="key"
						class="purple white--text title font-weight-light">
						<div slot="header">
							<span class="left">{{ key }}</span>
							<span class="right">${{ value.USD }}</span>
						</div>
						<v-card class="body-1 white black--text">
							<!--We are using the LineChart component imported below in the script and 
								also setting the chart-data prop to the datacollection object-->
							<line-chart :chart-data="datacollection[key]"></line-chart>
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
import moment from 'moment'
import LineChart from './components/LineChart'
import cc from 'cryptocompare';

import { timeConverter } from './helpers.js';


export default {
	name: 'app',
	components: { LineChart },
	data: () => ({
		cryptos: [],
		errors: [],
		historicalData: [],
		datacollection: {},
		open: null,
		close: null
	}),
	
  	created () {
		axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT,XRP,EOS,AION,TRX&tsyms=USD')
			.then(response => {
				this.cryptos = response.data
			})
			.catch(e => {
				this.errors.push(e)
			});
		this.collectData();
	},
    mounted () {
    	
	},
	computed: {
		chartData: () => {
			
		}
	},
	methods: {
		click() {
			console.log('click');
		},
		getData (fsym, tsym) {
			// about last 6 month
			const endpoint = `https://min-api.cryptocompare.com/data/histoday?fsym=${fsym}&tsym=${tsym}&limit=35&aggregate=5&e=CCCAGG`;
			axios.get(endpoint)
				.then(response => {
					this.historicalData = response.data.Data;
					
					let timeResult = this.historicalData.map(a => timeConverter(a.time).slice(0,11) );
					let openPosition = this.historicalData.map(a => a.open);
					let closePosition = this.historicalData.map(a => a.close);
					
					this.time = timeResult;
					this.open = openPosition;
					this.close = closePosition;

					// fix reactivity, because here we create new properties and they needs vue-setters and getters for reactivity
					this.$set(this.datacollection, fsym, {
						labels: this.time,
						datasets: [
							{
								label: 'Open position',
								backgroundColor: '#f87979',
								data: this.open
							},
							{
								label: 'Close position',
								backgroundColor: '#5bf8bf',
								data: this.close
							}
						]
					})
					console.log(this.datacollection[fsym].labels)
				})
				.catch(e => {
					this.errors.push(e)
				});
		},
		collectData () {
			this.getData('BTC', 'USD');
			this.getData('ETH', 'USD');
			this.getData('IOT', 'USD');
			this.getData('XRP', 'USD');
			this.getData('EOS', 'USD');
			this.getData('AION', 'USD');
			this.getData('TRX', 'USD');
		}
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

h1 {
	margin-bottom: 10px;
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
/* charts */
#line-chart {
	height: 400px !important;
}

</style>
