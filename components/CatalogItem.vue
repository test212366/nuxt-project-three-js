<style scoped>

	.catalog__item img  {
		width: 100%;
	}
	.catalog__item {
		-webkit-backdrop-filter: blur(3px);
		backdrop-filter: blur(5px);
		margin: 10px;
		max-width: 280px;
		border-radius: 20px;
		overflow: hidden;
		border-radius: 20px;
		background: rgba(35, 35, 35, 0.241);
		box-shadow: 0px 4px 20px 5px rgba(19, 26, 38, 0.20);
		position: relative;
	}

 
	.catalog__buy {
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		margin-bottom: 20px;
		align-items: center;
	}
	.catalog__item p {
		margin: 20px;
 
		font-size: 13px;
		font-weight: 300;
		text-align: center;
		color: #cacaca;
		line-height: 22px;
		letter-spacing: 1.275px;
	}
	.catalog__price {
		font-size: 14px !important;
		margin: 0 !important;
		color: #fff !important;
	}
	.catalog__buy-button svg {
		margin-left: 8px;
	}
	.catalog__buy-button {
		border-radius: 15px;
		font-size: 12px;
		height: 35px;
		padding: 0 20px;
		display: flex;
		align-items: center;
		border: none;
		background: rgba(217, 217, 217, 0.04);
	}
	@media screen and (max-width: 1440px) {
		.catalog__item {
			max-width: 230px;
		}
		.catalog__item p {
 
	
			font-size: 11px;
		 
			line-height: 15px;
	 
		}
	}
	@media screen and (max-width: 1030px) {
		.catalog__item {
			max-width: 200px;
		}	
		.catalog__price {
			font-size: 10px !important;
		}
		.catalog__buy-button {
			font-size: 10px !important;
		}
	}
	@media screen and (max-width: 450px) {
		.catalog__item {
			max-width: 180px;
		}
		.catalog__item  button svg {
			display: none;
		}
	}
	@media screen and (max-width: 450px) {
		.catalog__item {
			max-width: 165px;
			margin: 5px;
		}
		.catalog__price {
			width: 100%;
			text-align: center;
		}
		.catalog__buy-button {
			display: none;
		}
	}
 
</style>

<template>

	<div class="catalog__item">
			 
			 <img src="../assets/oneCatalog.jpg" alt="catalog-item">
	 
			 <p>Description Product Some Text and product</p>
			 <div class="catalog__buy">
				 <p class="catalog__price">2.499 ₽</p>
				 <button class="catalog__buy-button">In the Cart <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					 <g clip-path="url(#clip0_3_365)">
					 <path d="M19.006 2.97C18.815 2.751 18.54 2.625 18.25 2.625H4.431L4.236 1.461C4.156 0.979 3.739 0.625 3.25 0.625H1C0.447 0.625 0 1.072 0 1.625C0 2.178 0.447 2.625 1 2.625H2.403L4.263 13.789C4.271 13.834 4.294 13.871 4.308 13.913C4.324 13.966 4.337 14.016 4.362 14.064C4.394 14.13 4.437 14.186 4.482 14.243C4.513 14.282 4.541 14.321 4.577 14.355C4.635 14.409 4.702 14.447 4.77 14.485C4.808 14.506 4.841 14.534 4.882 14.55C4.998 14.597 5.12 14.625 5.249 14.625H16.25C16.803 14.625 17.25 14.178 17.25 13.625C17.25 13.072 16.803 12.625 16.25 12.625H6.097L5.931 11.625H17.25C17.748 11.625 18.17 11.259 18.24 10.767L19.24 3.767C19.281 3.479 19.195 3.188 19.006 2.97ZM17.097 4.625L16.812 6.625H13.25V4.625H17.097ZM12.25 4.625V6.625H9.25V4.625H12.25ZM12.25 7.625V9.625H9.25V7.625H12.25ZM8.25 4.625V6.625H5.25C5.197 6.625 5.149 6.64 5.102 6.655L4.764 4.625H8.25ZM5.264 7.625H8.25V9.625H5.597L5.264 7.625ZM13.25 9.625V7.625H16.668L16.383 9.625H13.25Z" fill="white"/>
					 <path d="M6.75 18.625C7.57843 18.625 8.25 17.9534 8.25 17.125C8.25 16.2966 7.57843 15.625 6.75 15.625C5.92157 15.625 5.25 16.2966 5.25 17.125C5.25 17.9534 5.92157 18.625 6.75 18.625Z" fill="white"/>
					 <path d="M15.75 18.625C16.5784 18.625 17.25 17.9534 17.25 17.125C17.25 16.2966 16.5784 15.625 15.75 15.625C14.9216 15.625 14.25 16.2966 14.25 17.125C14.25 17.9534 14.9216 18.625 15.75 18.625Z" fill="white"/>
					 </g>
					 <defs>
					 <clipPath id="clip0_3_365">
					 <rect width="19.25" height="19.25" fill="white"/>
					 </clipPath>
					 </defs>
					 </svg>
				 </button>
			 </div>
			 
		 </div>

</template>


<script>


</script>