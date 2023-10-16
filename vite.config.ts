import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const filePath = dirname(fileURLToPath(import.meta.url))
// I think there is something wrong with this path -- Ryan Iguchi - 6/28/2023

// This is another possibility for this filePath var
// const filePath = process.cwd()


// I think it is the sassPath that is causing the File error. 
// How do we trace this out and rewrite the path to the local file path?
// root: process.cwd() ------ This is the suggested path constant.

// const sassPath = `D:/Coding - David/Work/NetDevs/ULF/src/styles/`
const sassPath = `${filePath}/src/styles/`

const config: UserConfig = {
	plugins: [sveltekit()],
	// test: {
	// 	include: ['src/**/*.{test,spec}.{js,ts}']
	// },
	css: {
		preprocessorOptions: {
		  scss: {
			additionalData: `
				@import '${sassPath}_mixins.scss';
				@import '${sassPath}_vars.scss';
			`,
		  }
		},
	},	
	
	build:{
//		root: process.cwd(), ------- Going to leave this commented out for now. 
		sourcemap: true, // Config vite to generate sourcemap when bundling.
		minify: true
	},
};

export default config;