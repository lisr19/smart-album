<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {}
		},
		created() {

		},
		methods: {
		}
	}
</script>

<style>
	#app {
		/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
		font-family: PingFangSC-Medium;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		margin: 0;
		padding: 0;
		min-height: 100%;
		width: 100%;
	}
</style>
