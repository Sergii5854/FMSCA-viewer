import { FilterField } from '../../types.ts'

export const filterFields: FilterField[] = [
    {
        name: 'created_dt',
        label: 'Created date',
        type: 'date',
        multiple: false,
    },
    {
        name: 'data_source_modified_dt',
        label: 'Modified date',
        type: 'date',
        multiple: false,
    },
    {
        name: 'entity_type',
        label: 'Entity',
        type: 'string',
        multiple: false,
    },
    {
        name: 'operating_status',
        label: 'Operating status',
        type: 'string',
        multiple: false,
    },
    {
        name: 'legal_name',
        label: 'Legal name',
        type: 'string',
        multiple: false,
    },
    {
        name: 'dba_name',
        label: 'DBA name',
        type: 'string',
        multiple: false,
    },
    {
        name: 'physical_address',
        label: 'Physical address',
        type: 'string',
        multiple: false,
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'phone',
        multiple: false,
    },
    {
        name: 'usdot_number',
        label: 'DOT',
        type: 'number',
        multiple: false,
    },
    {
        name: 'mc_mx_ff_number',
        label: 'MC/MX/FF',
        type: 'string',
        multiple: false,
    },
    {
        name: 'power_units',
        label: 'Power units',
        type: 'number',
        multiple: false,
    },
    {
        name: 'out_of_service_date',
        label: 'Out of service date',
        type: 'date',
        multiple: false,
    },
]

export const getFilterFieldByName = (name: string): FilterField | null => {
    return filterFields.find((field) => field.name === name) || null
}
