<script>

	export default {
		data() {
			return {
				openMenu: false
			}
		},
		methods: {
			toggleMenu() {
				this.openMenu = !this.openMenu
			}
		}
	}



</script>

<template>
	<header>
		<div class="container">
			<p class="logo__header">AlmaGSO</p>
			<nav>
				 
				<ul>
					<li>About</li>
					<li>Contacts</li>
					<li>Store</li>
					<!-- <li>Login</li> -->
				</ul>
				<div class="search">
					<svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_3_32)">
						<path d="M7.77433 0C3.48169 0 0.00109863 3.48059 0.00109863 7.77327C0.00109863 12.0659 3.48169 15.5465 7.77436 15.5465C9.42506 15.5465 10.9559 15.0317 12.2143 14.1547L12.2152 14.1537L17.9802 19.9188C18.0872 20.0257 18.2573 20.0285 18.367 19.9188L19.9208 18.365C20.0278 18.258 20.0223 18.0806 19.9199 17.9782L14.1557 12.2141C15.0327 10.9548 15.5476 9.42393 15.5476 7.77327C15.5476 3.48059 12.067 0 7.77433 0ZM7.77433 13.7175C4.49126 13.7175 1.83008 11.0563 1.83008 7.77327C1.83008 4.4902 4.4913 1.82901 7.77433 1.82901C11.0574 1.82901 13.7186 4.4902 13.7186 7.77327C13.7186 11.0563 11.0574 13.7175 7.77433 13.7175Z" fill="#ffffff"/>
						</g>
						<defs>
						<clipPath id="clip0_3_32">
						<rect width="20" height="20" fill="#ffffff"/>
						</clipPath>
						</defs>
					</svg>

				</div>
			</nav>
			<button @click="toggleMenu" class="menu__mobile">
				M <div></div>
			</button>

			<div id="menu__show-bar"  :class="{  'activeMenu' : openMenu }">
				<p>MENU</p>
				<button>About</button>
				<button>Contacts</button>
				<button>Store</button>

			</div>
		</div>
		


	</header>


</template>


<style scoped>
	#menu__show-bar {
		display: none;
		transition: .3s ease all;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 20px;
		-webkit-backdrop-filter: blur(3px);
		backdrop-filter: blur(5px);
		position: absolute;
		right: -100%;
		top: 80px;
		border-radius: 20px;
		height: 180px;
		width: 170px;

		background-color: #39393933;
	}
	#menu__show-bar p {
		font-size: 12px;
		margin-bottom: 15px;
	}
	#menu__show-bar button {
		width: 100%;
		margin-bottom: 5px;
		height: 30px;
		background-color: transparent;
		border: none;
		text-decoration: underline;
		font-size: 11px;
		color: #ffffff;
	}
	.menu__mobile {
		display: none;
	}
	.menu__mobile:hover > div {
		width: 10px !important;
	}
	.logo__header {
		font-size: 17px;
		letter-spacing: .6px;
		font-weight: 500;
	 }
	.container {
		max-width: 1650px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.container ul {
		display: flex;
	}
	.container li {
		letter-spacing: .6px;
		margin-right: 80px;
		font-size: 13px;
		list-style: none;
		color: #838383;
		transition: .3s ease color;
	}
	.container li:hover {
		color: #fff;
	}
	.search {
		margin-left: 100px;
	}
	.container nav {
		display: flex;
		align-items: center;
		
	}
	.container li:last-child {
		margin-right: 0 ;
	}
	header {
		display: flex;
		justify-content: center;
		padding: 65px 30px 0 30px;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 10;
	}
	@media screen and (max-width: 1050px) {
		.logo__header {
			font-size: 14px;
		 
		}
		.menu__mobile {

			display:flex;
			align-items: center;

			background-color: transparent;
			border: none;
		}
		.menu__mobile div {
			margin-left: 10px;
			width: 16px;
			height: 1px;
			background-color: #fff;
		}
		.container nav { 
			display: none;
		}
		header {
			padding: 45px 30px 0 30px;

		}
	}
	@media screen and (max-width: 900px) {
		#menu__show-bar {
			display: flex !important;
		}
		.logo__header {
			font-size: 12px;
		 
		}
		.menu__mobile {
			font-size: 11px;
		}
		.menu__mobile div {
			transition: .3s ease all;
			width: 17px;
  
		 
		}
	}
</style>