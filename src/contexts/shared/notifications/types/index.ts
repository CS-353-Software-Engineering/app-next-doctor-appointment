export enum NotificationType {
    INFO,
    ERROR,
    SUCCESS
}

export interface NotificationPayload {
    readonly message: string,
    readonly type: NotificationType
}


export interface INotificationsContext {
    sendNotification: ((payload: NotificationPayload) => void),
    showError: ((error: string | null) => void),

}

export const defaultState: INotificationsContext = {
    sendNotification: (() => {
    }),
    showError: (() => {
    })
};
