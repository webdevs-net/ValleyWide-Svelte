export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23')
];

export const server_loads = [0];

export const dictionary = {
		"/": [~8],
		"/about-us": [~9],
		"/articles": [~10,[2]],
		"/articles/[slug]": [~11,[2,3]],
		"/clear": [12],
		"/contact-us": [~13,[4]],
		"/home_old": [~14],
		"/our-process": [~15],
		"/our-team": [~16],
		"/our-team/[slug]": [~17],
		"/page": [18,[5]],
		"/page/[slug]": [~19,[5,6]],
		"/portfolio": [~20],
		"/portfolio/[slug]": [~21],
		"/privacy": [~22,[7]],
		"/services": [~23]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';