"use client"

import {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {IStatement} from "@/src/interfaces/common";
import {useRouter} from "next/navigation";
import {IRole} from "@/src/interfaces/user";

export default function StatementsPage () {
    const {data: session} = useSession()
    const {push} = useRouter()
    const [userStatements, setUserStatements] = useState<IStatement[]>([])

    useEffect(() => {
        if (!session) {
            push("/client")
        }
    }, [push, session]);

    const fetchData = useCallback(async () => {
        if (session) {
            const response = await fetch(`http://localhost:8080/statements?user_id=${session.user.id}`)
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
                Заявления
            </h4>
            <button className={"bg-blue-500 text-amber-50 w-1/3 ml-5"} onClick={() => push("/client/statements/create-statement")}>
                Создать заявление
            </button>
        </div>
        <div className={"p-5"}>
            <table className={"table-fixed w-full border"}>
                <thead>
                <tr>
                    <th className="font-bold p-2 border-b text-left">Номер</th>
                    <th className="font-bold p-2 border-b text-left">Статус</th>
                    <th className="font-bold py-2 px-4 border-b text-left">Нарушение</th>
                </tr>
                </thead>
                <tbody>
                {userStatements.map((statement) => <tr key={statement.id}>
                    <td className={"p-2 border-b text-left"}>
                        {statement.car_number}
                    </td>
                    <td className={"p-2 border-b text-left"}>
                        {statement.status}
                    </td>
                    <td className={"py-2 px-4 border-b text-left"}>
                        {statement.description}
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}