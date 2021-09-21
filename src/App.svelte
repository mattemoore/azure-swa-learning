<script>
	import Poster from './Poster.svelte';
	import Nav from './Nav.svelte';
	import Footer from './Footer.svelte';
	import { Styles } from 'sveltestrap';
</script>
<head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">
</head>
<main>
	<Styles />
	<Nav />
	<div class="col-lg-8 mx-auto p-3 py-md-5">
	<Poster />
	<Footer />
	</div>
</main>

<style>
</style>
