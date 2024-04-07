"use client"
import {useSession} from "next-auth/react";
import {FC, useCallback, useEffect, useState} from "react";
import {IStatement, IStatementStatuses} from "@/src/interfaces/common";
import {IRole, IUser} from "@/src/interfaces/user";
import {useRouter} from "next/navigation";

export default function ClientDashboardPage() {
    const {data: session} = useSession()
    const {push} = useRouter()
    const [userStatements, setUserStatements] = useState<IStatement[]>([])

    useEffect(() => {
        if (!session || session.user.role !== IRole.admin) {
            push("/client")
        }
    }, [push, session]);

    const fetchData = useCallback(async () => {
        if (session) {
            const response = await fetch(`http://localhost:8080/statements`)
            const unpackedResponse = await response.json()
            setUserStatements(unpackedResponse)
        }
    }, [session])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return <div className={"w-full"}>
        <div className={"flex items-center justify-start"}>
            <h4 className={"text-3xl"}>
                Все заявления
            </h4>
        </div>
        <div className={"p-5"}>
            <table className={"table-fixed w-full border"}>
                <thead>
                <tr>
                    <th className="font-bold p-2 border-b text-left">Номер</th>
                    <th className="font-bold p-2 border-b text-left">ФИО</th>
                    <th className="font-bold p-2 border-b text-left">Статус</th>
                    <th className="font-bold py-2 px-4 border-b text-left">Нарушение</th>
                    <th className="font-bold py-2 px-4 border-b text-left">Действия</th>
                </tr>
                </thead>
                <tbody>
                {userStatements.map((statement) => <UserStatementTile key={statement.id} statement={statement}
                                                                      onAction={() => fetchData()}/>)}
                </tbody>
            </table>
        </div>
    </div>
}

type userStatementTileProps = {
    statement: IStatement,
    onAction: () => void
}

const UserStatementTile: FC<userStatementTileProps> = ({statement, onAction}) => {
    const {status, user_id, car_number, id, description} = statement
    const [user, setUser] = useState<IUser | undefined>(undefined)

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:8080/users?id=${user_id}`)
        const unpackedResponse = await response.json()

        setUser(unpackedResponse[0])

    }, [user_id])

    const handleOnSubmit = useCallback(async () => {
        await fetch(`http://localhost:8080/statements/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: IStatementStatuses.trusted})
        })
        onAction()
    }, [onAction, user_id])

    const handleOnDecline = useCallback(async () => {
        await fetch(`http://localhost:8080/statements/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: IStatementStatuses.canceled})
        })
        onAction()
    }, [onAction, user_id])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return <tr>
        <td className={"p-2 border-b text-left"}>
            {car_number}
        </td>
        <td className={"p-2 border-b text-left"}>
            {user?.fio ?? "Неизвестно"}
        </td>
        <td className={"p-2 border-b text-left"}>
            {status}
        </td>
        <td className={"p-2 border-b text-left"}>
            {description}
        </td>
        <td className={"py-2 px-4 border-b text-left flex"}>
            {status === IStatementStatuses.in_process && <>
                <button onClick={() => handleOnDecline()} className={"bg-red-600 px-5 text-amber-50"}>
                    Отменить
                </button>
                <button onClick={() => handleOnSubmit()} className={"bg-green-500 ml-5 px-5 text-amber-50"}>
                    Подтвердить
                </button>
            </>}
        </td>
    </tr>
}