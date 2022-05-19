import {createContext} from 'react'
import {defaultState, INotificationsContext,} from './types'

const NotificationContext = createContext<INotificationsContext>(defaultState)
export default NotificationContext
