import ZeeDataTables from "./DataTable";

export default {
    install (Vue) {
        Vue.component('zee-data-table', ZeeDataTables);
    }
};

export { ZeeDataTables };