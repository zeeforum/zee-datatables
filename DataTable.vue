<template>
	<div class="table-responsive">
		<table class="table table-hover table-bordered"  v-if="columns || rows">
			<thead v-if="columns">
				<tr>
					<th v-for="col in columns" :key="col.fieldName">
						{{ col.fieldLabel }}
					</th>
				</tr>
			</thead>
			<tbody v-if="columns && columns.length > 0 && rows && rows.length > 0">
				<tr v-for="row in rows" :key="row.id">
					<td v-for="col in columns" :key="col.fieldName + row.id">
						<fragment
							v-if="col.fieldName && col.fieldName != 'options' && col.fieldName != ''"
						>
							<app-data-field
								:col="col"
								:row="row"
							></app-data-field>
						</fragment>
						<fragment v-else>
							<div v-if="col.options">
								<fragment v-for="(option, index) in col.options" :key="index">
									<router-link 
										v-if="!option.confirmDialog"
										:to="option.named ? sprintf(option.url, ...row) : sprintf(option.url, row.id)"
										class="btn btn-xs btn-outline-primary ml-1"
										:class="option.classes"
									>
										<fragment v-if="option.icon">
											<i :class="option.icon"></i>
										</fragment>
										<fragment v-else-if="option.label">
											{{ option.label }}
										</fragment>
										<fragment v-else>
											{{ capitalizeFirstLetter(option.name) }}
										</fragment>
									</router-link>

									<a 
										v-if="option.confirmDialog"
										class="btn btn-xs ml-1"
										:class="[!option.classes ? 'btn-outline-primary' : option.classes]"
										@click="deleteRecord(row)"
									>
										<fragment v-if="option.icon">
											<i :class="option.icon"></i>
										</fragment>
										<fragment v-else-if="option.label">
											{{ option.label }}
										</fragment>
										<fragment v-else>
											{{ capitalizeFirstLetter(option.name) }}
										</fragment>
									</a>
								</fragment>
							</div>
							<div v-else>
								<router-link
									:to="{
										path: editUrl ? sprintf(editUrl, row.id) : path + '/' + row.id + '/edit',
									}"
									class="btn btn-xs btn-outline-primary"
								>
									<i class="fa fa-pencil-alt"></i>
								</router-link>

								<a
									class="btn btn-xs btn-outline-danger ml-1"
									@click="deleteRecord(row)"
								>
									<i class="fa fa-trash"></i>
								</a>
							</div>
						</fragment>
					</td>
				</tr>
			</tbody>
			<tr v-else>
				<td :colspan="columns && columns.length">No Record Found!</td>
			</tr>
		</table>

		<vue-confirm-dialog></vue-confirm-dialog>
	</div>
</template>

<script>
import Vue from "vue";
import VueConfirmDialog from 'vue-confirm-dialog';
import { Plugin } from "vue-fragment";
import { sprintf, vsprintf } from "sprintf-js";
import DataField from "./DataField";

// Confirm Dialog
Vue.use(VueConfirmDialog);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

// Fragment
Vue.use(Plugin);

export default {
	name: 'ZeeDataTable',
	props: ["columns", "rows", "results", 'editUrl', 'options'],

	data() {
		return {
			path: null,
		};
	},

	created() {
		if (this.$router) {
			this.path = this.$router.currentRoute.path;
		}
	},

	components: {
		appDataField: DataField,
	},

	methods: {
		sprintf,
		vsprintf,
		deleteRecord(row) {
			// console.log(row);
			this.$confirm(
				{
					title: 'Are you sure?',
					message: `You want to delete this record.`,
					button: {
						no: 'No',
						yes: 'Yes'
					},
					/**
					 * Callback Function
					 * @param {Boolean} confirm 
					 */
					callback: confirm => {
						if (confirm) {
							this.$emit('deleteRow', row);
						}
					}
				}
			);
		},

		capitalizeFirstLetter(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	},
};
</script>

<style scoped>
table tr td {
	vertical-align: middle;
}
</style>
