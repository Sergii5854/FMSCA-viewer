export interface IFMSCARow {
    created_dt: string
    data_source_modified_dt?: string
    entity_type: string
    operating_status: string
    legal_name: string
    dba_name?: string
    physical_address: string
    phone: string
    usdot_number?: string
    mc_mx_ff_number?: string
    power_units?: number
    out_of_service_date?: string
    id: number
}

export type PaginationMetadata = {
    limit: number
    skip: number
    current_page: number
    total_count: number
    total_pages: number
}

export type PaginatedResponse<T> = {
    data: T[]
    metadata: PaginationMetadata
}

export type FilterTypes = 'string' | 'number' | 'date' | 'phone'

export type FilterField = {
    name: string
    label: string
    type: FilterTypes
    multiple: boolean
}
