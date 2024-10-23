import type {ColumnDef, HeaderContext, CellContext} from '@tanstack/vue-table'
import {h} from 'vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import {Checkbox} from '~/components/ui/checkbox'

type RowData = Record<string, any>;
type CustomField = {
    accessorKey: string,
    title: string,
    render: (row: RowData) => any,
    options?: object,
    before?: string,
    after?: string,
};

export const createColumns = (
    fields: any[][],
    schema: object,
    customFields: CustomField[] = [],
    nameEmitEdit: string,
    nameEmitDelete: string,
    permissionEdit: string,
    permissionDelete: string,
): ColumnDef<RowData>[] => {
    const {$generalStore} = useNuxtApp()
    const userPermissions = $generalStore.userPermissions
    const canEdit = userPermissions.includes(permissionEdit)
    const canDelete = userPermissions.includes(permissionDelete)

    let columns = fields.map(
        ([field, title, className, option]) => {
            if (field === 'select') {
                return {
                    id: 'select',
                    header: ({table}: HeaderContext<RowData, unknown>) => h(Checkbox, {
                        'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
                        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
                        'ariaLabel': 'Select all',
                        'class': 'translate-y-0.5',
                    }),
                    cell: ({row}: CellContext<RowData, unknown>) => h(Checkbox, {
                        'checked': row.getIsSelected(),
                        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
                        'ariaLabel': 'Select row',
                        'class': 'translate-y-0.5',
                    }),
                    enableSorting: false,
                    enableHiding: false,
                }
            }

            if (field === 'actions' && (canEdit || canDelete)) {
                return {
                    id: 'actions',
                    accessorKey: 'actions',
                    cell: ({row}: CellContext<RowData, unknown>) => h(DataTableRowActions, {
                        row,
                        schema,
                        nameEmitEdit,
                        nameEmitDelete,
                        permissionEdit: canEdit,
                        permissionDelete: canDelete,
                    }),
                }
            }

            return {
                accessorKey: field,
                header: ({column}: HeaderContext<RowData, unknown>) => h(DataTableColumnHeader, {column, title}),
                cell: ({row}: CellContext<RowData, unknown>) => h('div', {class: className}, row.getValue(field)),
                ...option,
                filterFn: (row: RowData, id: string, value: string[]) => {
                    return value.includes(row.getValue(id))
                },
            }
        }
    )

    customFields.forEach(customField => {
        const column = {
            accessorKey: customField.accessorKey,
            header: ({column}: HeaderContext<RowData, unknown>) => h(DataTableColumnHeader, {
                column,
                title: customField.title
            }),
            cell: ({row}: CellContext<RowData, unknown>) => customField.render(row),
            ...customField.options,
            filterFn: (row: RowData, id: string, value: string[]) => {
                if (Array.isArray(row.getValue(id))) {
                    // return value.some(v => row.getValue(id).includes(v))

                    // Fix filter for array value
                    return value.some(v => row.getValue(id).some((val: any) => val.includes(v)))
                }
            },
        }

        if (customField.before) {
            const index = columns.findIndex(col => col.accessorKey === customField.before)
            if (index !== -1) {
                columns.splice(index, 0, column)
            } else {
                columns.push(column)
            }
        } else if (customField.after) {
            const index = columns.findIndex(col => col.accessorKey === customField.after)
            if (index !== -1) {
                columns.splice(index + 1, 0, column)
            } else {
                columns.push(column)
            }
        } else {
            columns.push(column)
        }
    })

    return columns
}
