import type {ColumnDef} from '@tanstack/vue-table'
import {h} from 'vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import {Checkbox} from '~/components/ui/checkbox'
import type {Interface} from "node:readline";

// export const createColumns = (fields: any[][], schema: object, dialogEdit: Component, dialogDelete: Component): ColumnDef<Interface>[] => {
//     return fields.map(([field, title, className, option]) => {
//         if (field === 'select') {
//             return {
//                 id: 'select',
//                 header: ({table}) => h(Checkbox, {
//                     'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
//                     'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
//                     'ariaLabel': 'Select all',
//                     'class': 'translate-y-0.5',
//                 }),
//                 cell: ({row}) => h(Checkbox, {
//                     'checked': row.getIsSelected(),
//                     'onUpdate:checked': value => row.toggleSelected(!!value),
//                     'ariaLabel': 'Select row',
//                     'class': 'translate-y-0.5',
//                 }),
//                 enableSorting: false,
//                 enableHiding: false,
//             }
//         }
//
//         if (field === 'actions') {
//             return {
//                 id: 'actions',
//                 header: 'Actions',
//                 cell: ({row}) => h(DataTableRowActions, {}, {
//                         edit: () => h(dialogEdit, {row, schema}),
//                         delete: () => h(dialogDelete, {row, schema}),
//                     }
//                 ),
//             }
//         }
//
//         return {
//             accessorKey: field,
//             header: ({column}) => h(DataTableColumnHeader, {column, title}),
//             cell: ({row}) => h('div', {class: className}, row.getValue(field)),
//             ...option,
//             filterFn: (row, id, value) => {
//                 return value.includes(row.getValue(id))
//             },
//         }
//     })
// }

export const createColumns = (
    fields: any[][],
    schema: object,
    nameEmitEdit: string,
    nameEmitDelete: string,
): ColumnDef<Interface>[] => {
    return fields.map(
        ([field, title, className, option]) => {
            if (field === 'select') {
                return {
                    id: 'select',
                    header: ({table}) => h(Checkbox, {
                        'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
                        'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
                        'ariaLabel': 'Select all',
                        'class': 'translate-y-0.5',
                    }),
                    cell: ({row}) => h(Checkbox, {
                        'checked': row.getIsSelected(),
                        'onUpdate:checked': value => row.toggleSelected(!!value),
                        'ariaLabel': 'Select row',
                        'class': 'translate-y-0.5',
                    }),
                    enableSorting: false,
                    enableHiding: false,
                }
            }

            if (field === 'actions') {
                return {
                    id: 'actions',
                    header: 'Actions',
                    cell: ({row}) => h(DataTableRowActions, {row, schema, nameEmitEdit, nameEmitDelete}
                    ),
                }
            }

            return {
                accessorKey: field,
                header: ({column}) => h(DataTableColumnHeader, {column, title}),
                cell: ({row}) => h('div', {class: className}, row.getValue(field)),
                ...option,
                filterFn: (row, id, value) => {
                    return value.includes(row.getValue(id))
                },
            }
        })
}