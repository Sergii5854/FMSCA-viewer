import React from 'react'
import dataService from '../../services/dataService.ts'
import {
    Divider,
    styled,
    TableHead,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Container,
    Typography,
    TableCell,
    tableCellClasses,
    SelectChangeEvent,
} from '@mui/material'
import TablePaginationActions from './TablePaginationActions.tsx'
import { getDisplayDate } from '../../utils/dates.ts'
import { FilterField, IFMSCARow } from '../../types.ts'
import TableFilter from './TableFilter.tsx'
import { filterFields, getFilterFieldByName } from './tableModel.ts'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.primary.main,
        border: '1px solid rgba(224, 224, 224, 1)',
        fontWeight: 'bold',
        textWrap: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        border: '1px solid rgba(224, 224, 224, 1)',
        padding: '12px 8px',
    },
}))

const StyledTablePagination = styled(TablePagination)({
    '&.MuiTableCell-root': {
        padding: '5px 20px 5px 0',
    },
})

const FMSCAViewer = () => {
    const [data, setData] = React.useState<IFMSCARow[]>([])
    const [page, setPage] = React.useState(0)
    const [totalCount, setTotalCount] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [triggerSearch, setTriggerSearch] = React.useState<boolean>(false)
    const [filteringParameter, setFilteringParameter] =
        React.useState<FilterField | null>(null)
    const [search, setSearch] = React.useState<Date | string | number>('')

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setSearch('')
        setFilteringParameter(getFilterFieldByName(event.target.value))
    }

    const handleClearSelect = () => {
        setFilteringParameter(null)
        setSearch('')
        setPage(0)
        setTriggerSearch(!triggerSearch)
    }

    const handleSearch = () => {
        setTriggerSearch(!triggerSearch)
        setPage(0)
    }

    React.useEffect(() => {
        const filters: {
            [key: string]: string | number | Date | (string | number | Date)[]
        } = {
            ...(search !== '' &&
                filteringParameter && {
                    // Enforce multiple search, when search value can be multiple
                    [filteringParameter.name]: filteringParameter.multiple
                        ? [search]
                        : search,
                }),
        }

        const fetchData = async () => {
            const newData = dataService.getData(rowsPerPage, page, filters)
            setData(newData.data)
            setTotalCount(newData.metadata.total_count)
        }
        fetchData()
    }, [page, rowsPerPage, triggerSearch])

    return (
        <Container maxWidth="xl">
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'left',
                    color: 'primary.main',
                }}
                mt={2}
                mb={2}
                component="div">
                FMSCA Viewer
            </Typography>
            <Divider />
            <TableFilter
                filterFields={filterFields}
                selectedField={filteringParameter}
                search={search}
                setSearch={setSearch}
                handleClearSelect={handleClearSelect}
                handleChangeSelect={handleChangeSelect}
                handleSearch={handleSearch}
            />
            <TableContainer sx={{ marginTop: '40px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                Created date
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Modified date
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Entity
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Operating status
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Legal name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                DBA name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Physical address
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Phone
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                DOT
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                MC/MX/FF
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Power units
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Out of service date
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <StyledTableCell>
                                    {getDisplayDate(row.created_dt)}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {getDisplayDate(
                                        row.data_source_modified_dt,
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.entity_type}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.operating_status}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.legal_name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.dba_name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.physical_address}
                                </StyledTableCell>
                                <StyledTableCell sx={{ textWrap: 'nowrap' }}>
                                    {row.phone}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.usdot_number}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.mc_mx_ff_number}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.power_units}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {getDisplayDate(row.out_of_service_date)}
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <StyledTablePagination
                                rowsPerPageOptions={[5, 10, 50, 1000]}
                                colSpan={12}
                                count={data ? totalCount : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default FMSCAViewer
