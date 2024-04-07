export interface IStatement {
    id: number,
    status: IStatementStatuses,
    car_number: string,
    description: string,
    user_id: number
}

export enum IStatementStatuses {
    in_process = "В обработке",
    trusted = "Подтверждено",
    canceled = "Отменено"
}