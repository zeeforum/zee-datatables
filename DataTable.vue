<template>
	<div :class="[layout.responsive && 'table-responsive', layout.main]">
		<table class="table" :class="[layout.table]" v-if="columns || rows">
			<thead v-if="columns">
				<tr>
					<th v-for="col in columns" :key="col.fieldName">
						<div class="pointer" v-if="col.sort" @click="changeSort(col.orderBy, col.fieldName)">
							{{ col.fieldLabel }}
							<span class="sort label-right">
								{{ typeof col.orderBy === 'string' ? col.orderBy.charAt(0).toUpperCase() : 'A' }}
							</span>
						</div>
						<div v-else>
							{{ col.fieldLabel }}
						</div>
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
	props: ["columns", "rows", "results", 'editUrl', 'options', 'layout'],

	data() {
		return {
			path: null,
		};
	},

	created() {
		if (this.$router) {
			this.path = this.$router.currentRoute.path;
		}

		this.initlizeSorting();
	},

	components: {
		appDataField: DataField,
	},

	computed: {
		sortedRows() {
			return this.getSorted();
		}
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
		},

		getSorted() {
			let columns = this.columns;

			for (var col in columns) {
				if (columns[col].sort && columns[col].orderBy) {
					return this.sortRows(columns[col].orderBy, columns[col].fieldName);
				}
			}

			return this.rows;
		},

		sortRows(sort, fieldName) {
			if (sort) {
				if (typeof sort == 'string') {
					if (sort.toLowerCase() == "d" || sort.toLowerCase() == "desc") {
						return this.rows.sort((a, b) => a[fieldName] < b[fieldName] ? 1 : ((b[fieldName] < a[fieldName]) ? -1 : 0));
					}
				}
				
				this.rows.sort((a, b) => a[fieldName] > b[fieldName] ? 1 : ((b[fieldName] > a[fieldName]) ? -1 : 0));
			}

			return this.rows;
		},

		changeSort(sort, fieldName) {
			let sorting;
			if (sort) {
				sorting = (typeof sort == 'string' && (sort.toLowerCase() == 'd' || sort.toLowerCase() == 'desc')) ? 'a' : 'd';
			} else {
				sorting = 'd';
			}

			let columns = this.columns;
			if (columns) {
				for (var col in columns) {
					if (columns[col].sort && columns[col].fieldName == fieldName) {
						this.columns[col].orderBy = sorting;
					} else if (columns[col].sort) {
						this.columns[col].orderBy = '';
					}
				}
			}

			this.getSorted();
		},

		initlizeSorting() {
			let columns = this.columns;
			let isEnabledSort = false;

			if (columns) {
				for (var col in columns) {
					if (isEnabledSort) {
						this.columns[col].orderBy = '';
						continue;
					}

					if (columns[col].sort) {
						this.columns[col].orderBy = typeof columns[col].orderBy == 'string' ? columns[col].orderBy : 'A';
						isEnabledSort = true;
					}
				}
			}
		}
	},
};
</script>

<style scoped>
table {
	width: 100%;
}

table tr td {
	vertical-align: middle;
}

.sort {
	font-size: 10px;
}

.label-right {
	text-align: right;
	display: block;
	float: right;
	clear: both;
	margin-top: 4px;
}

.pointer {
	cursor: pointer;
}
</style>
