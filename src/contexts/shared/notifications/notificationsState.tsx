import {StateProps} from '../../index'
import {useReducer,} from 'react'
import {defaultState, NotificationPayload, NotificationType} from './types'
import {toast, ToastContainer} from 'react-toastify'
import NotificationsReducer from './notificationsReducer'
import NotificationContext from './notificationsContext'



export const NotificationsState = (props: StateProps) => {
	const [state, dispatch] = useReducer(NotificationsReducer, defaultState)



	const sendNotification = (payload: NotificationPayload) => {

		switch (payload.type) {
		case NotificationType.ERROR:
			toast.error(payload.message)
			break
		case NotificationType.INFO:
			toast.info(payload.message)
			break
		case NotificationType.SUCCESS:
			toast.success(payload.message)
			break
		}

	}

	const showError = (message: string | null = 'Something went wrong :(') => {
		toast.error(message)
	}


	return (
		<NotificationContext.Provider
			value={{
				...state,
				sendNotification,
				showError
			}}
		>
			<ToastContainer
				position="bottom-left"
				autoClose={3000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{props.children}
		</NotificationContext.Provider>
	)
}