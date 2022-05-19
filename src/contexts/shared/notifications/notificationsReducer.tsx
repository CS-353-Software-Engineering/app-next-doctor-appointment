import {StateAction} from '../../index'
import {INotificationsContext} from './types'

export default function NotificationsReducer(state: INotificationsContext, action: StateAction): INotificationsContext {
	const {type, payload} = action
	switch (type) {
	default:
		return state
	}
}

