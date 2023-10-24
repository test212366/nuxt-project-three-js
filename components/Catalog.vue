<style scoped>
	.catalog__more {
		background-color: transparent;
		border: none;
		margin-top: 60px;
		text-decoration: underline;
		color: #707070;
		transition: .5s ease color;
		/* font-weight: 500; */
		line-height: 15.5px; /* 96.875% */
		letter-spacing: 0.4px;
	 
	} 
	.catalog__more:hover {
		color: #fff;
	}
	@media screen and (max-width: 1000px) {
		.catalog__more {
			font-size: 11px;
		}
	}
	.catalog {
		display: flex;
		align-items: center;
		flex-direction: column;
		position: absolute;
		left: 0;
		right: 0;
		/* top: 0; */
		/* bottom: -200px; */
	}
	.items_cat {
		display: flex;
		flex-wrap: wrap;
		max-width: 1200px;
		justify-content: center;
	}
	@media screen and (max-width: 900px) {
		.items_cat > div:last-child {
			display: none;
		}
	}
	@media screen and (max-width: 670px) {
		.items_cat > div:nth-child(3) {
			display: none;
		}
	}
	@media screen and (max-width: 350px) {
		.items_cat > div:nth-child(2) {
			display: none;
		}
	}
	 

</style>

<template> 
	<section id="catalog"  class="catalog">
		<div class="items_cat">

			<CatalogItem />
			<CatalogItem />
			<CatalogItem />
			<CatalogItem  />

		</div>
		<button class="catalog__more">
			Show More
		</button>
	</section>

</template>


<script>



</script>

