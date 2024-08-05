import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
} from '@mui/material'
import { InputVariant } from '../../constants.ts'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import TableSearchBar from './TableSearchBar.tsx'
import { FilterField } from '../../types.ts'

const StyledIconButton = styled(IconButton)({
    position: 'absolute',
    left: '190px',
    top: '17px',
})

const StyledGrid = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    position: 'relative',
})

type TableFilterProps = {
    filterFields: FilterField[]
    selectedField: FilterField | null
    search?: string | number | Date
    setSearch: (val: string | number | Date) => void
    handleClearSelect: () => void
    handleChangeSelect: (event: SelectChangeEvent) => void
    handleSearch: () => void
}

const TableFilter = (props: TableFilterProps) => {
    const {
        filterFields,
        selectedField,
        search,
        setSearch,
        handleClearSelect,
        handleChangeSelect,
        handleSearch,
    } = props
    return (
        <StyledGrid item xs={12} mt={4}>
            <FormControl
                variant={InputVariant}
                sx={{
                    width: 240,
                    mr: 3,
                }}>
                <InputLabel id="parameters-selector">Filter</InputLabel>
                <Select
                    sx={{ textAlign: 'left' }}
                    labelId="parameters-selector"
                    id="filtering-parameters-selector"
                    value={selectedField ? selectedField.name : ''}
                    onChange={handleChangeSelect}
                    label="Select filtering parameters">
                    <MenuItem value="" key="None">
                        None
                    </MenuItem>
                    {filterFields.map((field) => (
                        <MenuItem value={field.name} key={field.name}>
                            {field.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedField && (
                <StyledIconButton
                    size="small"
                    onClick={handleClearSelect}
                    color="primary"
                    aria-label="Clear filter">
                    <ClearIcon fontSize="small" />
                </StyledIconButton>
            )}
            <TableSearchBar
                selectedField={selectedField}
                search={search}
                setSearch={setSearch}
            />
            <Button
                onClick={handleSearch}
                variant="contained"
                disabled={!search}
                endIcon={<SearchIcon />}>
                Search
            </Button>
        </StyledGrid>
    )
}

export default TableFilter
