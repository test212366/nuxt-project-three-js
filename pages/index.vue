<script setup lang="ts">


</script>

<template> 
	<main>
		<Header/>
		<WebGL />
		<!-- <section class="section__content">
			<div class="section__content-hr"> </div>
		</section> -->
		<Catalog />


	</main>
 
</template>


<style  >
	.activeMenu {
		right: 30px !important;
	}
	.section__content {
		height: 100vh;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
	}
	.section__content-hr {
		height: 2px;
		width: 100%;
		/* border-width: px; */
		box-shadow: 0px 0px 20px 20px rgba(35, 73, 125, 0.25);
		background-color: rgb(44, 75, 119);
	 }

	.and__body {
		position: absolute;
		left: 0;
		right: 0;
		top: 42%;
	}
	.and__body p {
		font-size: 25px;
		margin-left: 30%;
		color: #7a7a7a;
		/* color: rgb(40, 40, 182); */
	}
 
	body {
		overscroll-behavior: none;
		overflow: hidden;
		background-color: #000;
	}
	* {
		color: #fff;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: Roobert;
		-ms-user-select: none; 
		-moz-user-select: none; 
		-webkit-user-select: none; 
		user-select: none; 
	}
	#__nuxt > div {
		overflow: hidden;
	}
	@font-face {
		font-weight: 400;
		font-family: Roobert;
		src: url("../assets/fonts/Roobert-Regular.otf");
	}
	@font-face {
		font-weight: 500;
		font-family: Roobert;
		src: url("../assets/fonts/Roobert-Medium.otf");
	}
	@font-face {
		font-weight: 600;
		font-family: Roobert;
		src: url("../assets/fonts/Roobert-SemiBold.otf");
	}
	@font-face {
		font-weight: 800;
		font-family: Roobert;
		src: url("../assets/fonts/Roobert-Bold.otf");
	}
	@font-face {
		font-weight: 300;
		font-family: Roobert;
		src: url("../assets/fonts/Roobert-Light.otf");
	}


</style>