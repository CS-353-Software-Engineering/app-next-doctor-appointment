import {format, isValid, parseISO} from 'date-fns'
// //
export const formatDate = (date: string) =>
	isValid(parseISO(date))
		? format(parseISO(date), 'dd-MMMM-yy hh:mm a')
		: 'Invalid Date'

export const validatePakistanNumber = (str: string): boolean =>
	!str.match(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/)

export const validateEmail = (str: string): boolean => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return !re.test(str.toLowerCase())
}
