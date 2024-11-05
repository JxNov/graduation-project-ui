import type { ColumnDef, HeaderContext, CellContext } from '@tanstack/vue-table'
import { h } from 'vue'
import DataTableColumnHeader from '../components/base/table/DataTableColumnHeader.vue'
import DataTableRowActions from '../components/base/table/DataTableRowActions.vue'
import { Checkbox } from '~/components/ui/checkbox'

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
  permissionEdit: string,
  permissionDelete: string
): ColumnDef<RowData>[] => {
  const { $authStore } = useNuxtApp()
  const permissions = $authStore.user.permissions
  const canEdit = permissions.includes(permissionEdit)
  const canDelete = permissions.includes(permissionDelete)

  let columns = fields.map(
    ([field, title, className, option]) => {
      if (field === 'select') {
        return {
          id: 'select',
          header: ({ table }: HeaderContext<RowData, unknown>) => h(Checkbox, {
            'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
            'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(value),
            'ariaLabel': 'Select all',
            'class': 'translate-y-0.5'
          }),
          cell: ({ row }: CellContext<RowData, unknown>) => h(Checkbox, {
            'checked': row.getIsSelected(),
            'onUpdate:checked': (value: boolean) => row.toggleSelected(value),
            'ariaLabel': 'Select row',
            'class': 'translate-y-0.5'
          }),
          enableSorting: false,
          enableHiding: false
        }
      }

      if (field === 'actions') { // && (canEdit || canDelete)
        return {
          id: 'actions',
          accessorKey: 'actions',
          header: ({ column }: HeaderContext<RowData, unknown>) => h(DataTableColumnHeader, {
            column,
            title: ''
          }),
          cell: ({ row }: CellContext<RowData, unknown>) => h(DataTableRowActions, {
            row,
            schema,
            permissionEdit: canEdit,
            permissionDelete: canDelete
          }),
          enableSorting: false,
          enableHiding: false
        }
      }

      if (field !== 'actions' || field !== 'select') {
        return {
          accessorKey: field,
          header: ({ column }: HeaderContext<RowData, unknown>) => h(DataTableColumnHeader, {
            column,
            title
          }),
          cell: ({ row }: CellContext<RowData, unknown>) => h('div', { class: className }, row.getValue(field)),
          ...option,
          filterFn: (row: RowData, id: string, value: string[]) => {
            return value.includes(row.getValue(id))
          }
        }
      }
    }
  )

  customFields.forEach(customField => {
    const column = {
      accessorKey: customField.accessorKey,
      header: ({ column }: HeaderContext<RowData, unknown>) => h(DataTableColumnHeader, {
        column,
        title: customField.title
      }),
      cell: ({ row }: CellContext<RowData, unknown>) => customField.render(row),
      ...customField.options,
      filterFn: (row: RowData, id: string, value: string[]) => {
        const rowValue = row.getValue(id)

        if (Array.isArray(rowValue)) {
          const valueArray = Array.isArray(value) ? value : [value]
          return valueArray.some(v =>
            rowValue.some((val: any) =>
              val.toString().toLowerCase().includes(v.toLowerCase())
            )
          )
        }

        return value.includes(rowValue?.toString().toLowerCase())
      }
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
