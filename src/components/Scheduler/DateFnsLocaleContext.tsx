import { createContext } from 'react'
import { enUS } from 'date-fns/locale/en-US'

const DateFnsLocaleContext = createContext(enUS)

export default DateFnsLocaleContext
