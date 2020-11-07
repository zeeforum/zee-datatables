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

Now you have to bind **columns** and **rows** with data table:

```
<zee-data-table v-bind:columns="columns" v-bind:rows="rows"></zee-data-table>
```

#### Shorthand:

```
<zee-data-table :columns="columns" :rows="rows"></zee-data-table>
```

### Options

Added layout options in DataTable. The datatable also support bootstrap 4. Customize layout option:

```
<zee-data-table :columns="columns" :rows="rows" :layout="layout"></zee-data-table>
```

In component data also add **layout** object, as you have above given columns and rows array:

```
data() {
    return {
        layout: {
            main: 'container', // can use any bootstrap or custom class you want to use like 'fluid-container'. You can use multiple classes separated by space
            table: 'table-hover table-bordered table-primary', //Classes added on table tag.
            responsive: true //use if you want to use bootstrap responsive table
        }
    };
}
```

### Sorting

If you want to sort the data use sort option in columns, if you will use multiple field sort, first will be used by default.

You can also use orderBy option to sort **ascending** or **descending**. If you don't want to provide this option ignore it. By **default order** will be ascending.

For now you can use only client side sorting. Later on server side option will be added.

```
columns: [
    {
        fieldLabel: "#",
        fieldName: "id",
        sort: true,
        orderBy: 'ASC'
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
```

It's still **simple** but powerful datatable. More options will be discussed later.