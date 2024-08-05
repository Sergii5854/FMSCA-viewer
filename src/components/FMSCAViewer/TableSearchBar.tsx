import {
    InputAdornment,
    styled,
    TextField,
    TextFieldProps,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { parseISO } from 'date-fns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { dayFormat, InputVariant } from '../../constants.ts'
import { getDateWithTime } from '../../utils/dates.ts'
import { FilterField } from '../../types.ts'

const StyledTextField = styled(TextField)(() => ({
    '.MuiInputBase-root': {
        width: '240px',
        marginRight: 24,
    },
}))

type Props = {
    search?: string | number | Date
    selectedField: FilterField | null
    setSearch: (val: string | number | Date) => void
}

const DateTextField = (params: TextFieldProps) => (
    <TextField
        sx={{
            width: 240,
            mr: 3,
        }}
        variant={InputVariant}
        {...params}
    />
)

const TableSearchBar = (props: Props) => {
    const { selectedField, search, setSearch } = props

    const handleChangeValue = (value: string | number | Date) => {
        switch (selectedField?.type) {
            case 'string':
                setSearch(value)
                break
            case 'number':
                if (Number.isInteger(parseInt(String(value), 10))) {
                    setSearch(parseInt(String(value), 10))
                }
                break
            case 'date':
                setSearch(getDateWithTime(new Date(value)))
                break
            default:
                setSearch(value)
        }
    }

    if (selectedField && selectedField.type === 'date') {
        const dateValue = typeof search === 'string' ? parseISO(search) : search
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Search date"
                    value={dateValue as Date | undefined}
                    disabled={!selectedField}
                    format={dayFormat}
                    onChange={(val) => {
                        if (val) {
                            handleChangeValue(val)
                        }
                    }}
                    slots={{
                        textField: DateTextField,
                    }}
                    sx={{
                        width: '240px',
                        marginRight: '24px',
                    }}
                />
            </LocalizationProvider>
        )
    }

    return (
        <StyledTextField
            id="search"
            type="text"
            label="Search"
            value={search}
            variant={InputVariant}
            disabled={!selectedField}
            onChange={(e) => handleChangeValue(e.target.value)}
            InputProps={{
                endAdornment: search && (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default TableSearchBar
