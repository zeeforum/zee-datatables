## Zee DataTables

### Installation
To install my plugin:

```
npm i zee-datatables
```

### Usage
My DataTable plugin is powerfull yet and easy to use.

To use globally in your project:

```
import Vue from "vue"
import ZeeDataTable from "zee-datatables";

Vue.use(ZeeDataTable);
```

In your component you have the following tag:

```
<zee-data-table></zee-data-table>
```

Now you have to bind column and rows. In your component you need to initialize columns and rows in data method:

```
data() {
    return {
        columns: [
            {
                fieldLabel: "#",
                fieldName: "id"
            },
            {
                fieldLabel: "Customer Name",
                fieldName: "name"
            },
            {
                fieldLabel: "Customer Email",
                fieldName: "email"
            }
        ],
        rows: [
            {
                id: 1,
                name: "ABC Test",
                email: "abc@example.com"
            },
            {
                id: 2,
                name: "XYZ Test",
                email: "xyz@example.com"
            },
            {
                id: 3,
                name: "Sample Name",
                email: "sample@example.com"
            }
        ]
    }
}
```

#### Binding Variable to Component

Now you have to bind *columns* and *rows* with data table:

```
<zee-data-table v-bind:columns="columns" v-bind:rows="rows"></zee-data-table>
```

#### Shorthand:

```
<zee-data-table :columns="columns" :rows="rows"></zee-data-table>
```

It's still *simple* but powerful datatable. More options will be discussed later.