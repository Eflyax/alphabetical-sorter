const input = [
	"import {AsyncLoader} from 'addaris-core/components/core/AsyncLoader/AsyncLoader.vue';",
	"import {configure} from 'vee-validate';",
	"import {defineAsyncComponent} from '#imports';",
	"import {initRules} from '@/helpers/validationRules';",
	"import {ManagementLoader} from 'addaris-core/components/management/ManagementLoader/ManagementLoader.vue';",
	"import {NCard, NModal} from 'naive-ui';",
	"import {useLayout, useRuntimeConfig, useNuxtApp} from '#imports';",
	"import {useUser, useCart, useTranslation, useConfig, useManagement} from '@addaris/composables';",
	"import mdiVue from 'mdi-vue/v3';",
	"import VueGtag from 'vue-gtag-next';",
	"import VueLazyLoad from 'vue3-lazyload';",
	"import vueScrollTo from 'vue-scrollto';",
];

// const input = [
// 	'background: #f3f3f3;',
// 	'border: 1px solid #e4e4e4;',
// 	'border-radius: 5px 5px 0 0;',
// 	'cursor: pointer;',
// 	'flex: 1 1 auto;',
// ];

sortLines = function (lines) {
	lines.sort(function (a, b) {
		a = a.toString();
		b = b.toString();

		for (
			var index = 0, maxLength = Math.max(a.length, b.length);
			index < maxLength && a.charAt(index) === b.charAt(index);
			++index
		);

		if (index === maxLength) {
			return 0;
		}

		const
			charOne = a.charAt(index),
			charTwo = b.charAt(index),
			charOneLowerCase = charOne.toLowerCase(),
			charTwoLowerCase = charTwo.toLowerCase();


		function checkExceptions(valueA, valueB) {
			if (valueA === '-') {
				return 1;
			}

			if (valueB === '{') {
				return 1;
			}

			return -1;
		}

		if (charOneLowerCase < charTwoLowerCase) {
			return checkExceptions(charOneLowerCase, charTwoLowerCase);
		}
		else if (charOneLowerCase > charTwoLowerCase) {
			return 1;
		}
		else {
			if (charOne < charTwo) {
				return -1;
			}
			else if (charOne > charTwo) {
				return 1;
			}
			else {
				return 0;
			}
		}
	});

	return lines;
}


console.log(sortLines(input));
