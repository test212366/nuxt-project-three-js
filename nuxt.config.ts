// https://nuxt.com/docs/api/configuration/nuxt-config

import glsl from 'vite-plugin-glsl'

export default defineNuxtConfig({
  devtools: { enabled: true },
 
	vite: {
		assetsInclude: ['**/*.glb'],
		plugins: [glsl()],
	},
   
})
