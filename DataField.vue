<template>
	<fragment v-if="col.image">
		<div
			class="img-xs"
			v-if="col.html && row[col.fieldName]"
			v-html="
				vsprintf(col.html, [
					imgUrl + row[col.fieldName],
					row[col.fieldName],
				])
			"
		></div>
		<div class="img-xs" v-else-if="row[col.fieldName]">
			<img :src="imgUrl + row[col.fieldName]" :alt="row[col.fieldName]" />
		</div>
		<div v-else>
			-
		</div>
	</fragment>
	<fragment v-else>
		<fragment v-if="col.filter">
			<fragment v-if="col.html">
				<div v-html="filterSprintf(col.html, {
					...row,
				}, col.fieldName, col.filter)"></div>
			</fragment>
			<fragment v-else>
				{{ row[col.fieldName] | dynamicFilter(col.filter) }}
			</fragment>
		</fragment>
		<fragment v-else>
			<div v-html="col.html ? filterSprintf(col.html, {
				...row,
			}, row[col.fieldName], col.filter) : row[col.fieldName]"></div>
		</fragment>
	</fragment>
</template>

<script>
import Vue from "vue";
import { sprintf, vsprintf } from "sprintf-js";

export default {
	props: ["col", "row"],

	methods: {
		sprintf,
		vsprintf,
		filterSprintf(html, dataObj, fieldName, filter) {
			if (filter && filter != undefined) {
				dataObj[fieldName] = Vue.filter(filter)(dataObj[fieldName]);
			}
			console.log('HTML', html);
			console.log('Data', dataObj);
			return sprintf(html, dataObj);
		}
	},
};
</script>

<style lang="scss" scoped>
.img-xs {
	width: 75px;
}
</style>
