"use client"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {IStatement, IStatementStatuses} from "@/src/interfaces/common";

export default function CreateStatementPage() {
    const [serverError, setServerError] = useState("")
    const {data: session} = useSession()
    const {push} = useRouter()
    const carNumberRegExp = new RegExp(/\w{2}\d{3}\w\d{2}/)

    useEffect(() => {
        if (!session) {
            push("/client")
        }
    }, [push, session]);

    const handleCreateStatement = useCallback(async (statement: IStatement) => {
        if (session) {
            const response = await fetch("http://localhost:8080/statements", {
                method: "POST",
                body: JSON.stringify(statement),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                push("/client/statements")
            } else {
                setServerError("Ошибка сервера")
            }
        }
    }, [push, session])

    return <div>
        <Formik initialValues={
            {
                car_number: "",
                description: ""
            }
        }
                validationSchema={Yup.object({
                    car_number: Yup.string().required("Обязательное поле").matches(carNumberRegExp, "Формат должен быть aa000a00"),
                    description: Yup.string().required("Обязательное поле")
                })}
                onSubmit={
                    async (values) => await handleCreateStatement({
                        ...values,
                        user_id: session?.user.id ?? 0,
                        status: IStatementStatuses.in_process,
                        id: 0
                    })
                }>
            {({isSubmitting, isValid, dirty}) => {
                return <div className={"m-5 p-5 shadow-2xl"}>
                    <Form>
                        <h5 className={"text-4xl"}>Формирование заявления</h5>
                        <div>
                            <label htmlFor={"car_number"}>Номер автомобиля</label>
                        </div>
                        <div>
                            <Field name={"car_number"} id={"car_number"} placeholder={"аа234а33"}
                                   className={"border border-blue-500"}/>
                        </div>
                        <div className={"text-red-600"}>
                            <ErrorMessage name={"car_number"}/>
                        </div>
                        <div>
                            <label htmlFor={"description"}>Описание нарушения</label>
                        </div>
                        <div>
                            <Field name={"description"} id={"description"} placeholder={"Переехал двойную сплошную"}
                                   className={"border border-blue-500"}/>
                        </div>
                        <div className={"text-red-600"}>
                            <ErrorMessage name={"description"}/>
                        </div>
                        <div className={"text-red-600"}>
                            {serverError}
                        </div>
                        <button disabled={!dirty || !isValid || isSubmitting} type={"submit"}
                                className={"mt-5 bg-blue-500 disabled:bg-gray-400 text-amber-50 w-1/5"}>
                            Создать заявление
                        </button>
                    </Form>
                </div>
            }}
        </Formik>
    </div>
}