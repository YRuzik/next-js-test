"use client"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useCallback, useState} from "react";
import {IRole, IUser} from "@/src/interfaces/user";
import {useRouter} from "next/navigation";

export default function RegistrationPage() {
    const [serverError, setServerError] = useState("")
    const {push} = useRouter()

    const telRegExp = new RegExp(/\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}/)
    const fioRegExp = new RegExp(/^[^A-Za-z0-9!@#$%^&*()_+.,/\]\[|\\?:;"'`~№<>=-]*$/g)

    const handleRegistration = useCallback(async (user: IUser) => {
        const response = await fetch(`http://localhost:8080/users?login=${user.login}`)
        const unpackedResponse = await response.json()

        if (unpackedResponse instanceof Array && unpackedResponse.length !== 0) {
            console.log(unpackedResponse)
            setServerError("Пользователь уже существует")
            return;
        }

        const registrationResponse = await fetch(`http://localhost:8080/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        if (!registrationResponse.ok) {
            setServerError("Ошибка сервера")
            return;
        }

        setServerError("")
        push("/client/auth")

    }, [push])

    return <div>
        <Formik initialValues={
            {
                login: "",
                password: "",
                fio: "",
                phone: "",
                email: ""
            }
        }
                validationSchema={Yup.object({
                    login: Yup.string().required("Обязательное поле"),
                    password: Yup.string().required("Обязательное поле").min(6, "Минимум 6 символов"),
                    fio: Yup.string().required("Обязательное поле").matches(fioRegExp, "Только кириллица и пробелы"),
                    phone: Yup.string().required("Обязательное поле").matches(telRegExp, "Формат тел. должен соответствовать +7(XXX)-XXX-XX-XX"),
                    email: Yup.string().required("Обязательное поле").email("Некорректный формат эл. почты")
                })}

                onSubmit={async (values, {setSubmitting}) => {
                    await handleRegistration({
                        ...values,
                        role: IRole.user,
                        id: 0
                    })
                    setSubmitting(false)
                }}>
            {({isValid, isSubmitting, dirty}) => {
                return <div className={"m-5 p-5 shadow-black shadow-sm"}>
                    <h3 className={"text-3xl"}>
                        Регистрация
                    </h3>
                    <Form>
                        <div className={"w-full"}>
                            <label htmlFor={"login"}>Логин</label>
                        </div>
                        <div>
                            <Field className={'border-2 border-blue-500'} id={"login"} name={"login"} type={"text"}/>
                        </div>
                        <div className={"text-red-500"}>
                            <ErrorMessage name={"login"}/>
                        </div>
                        <div>
                            <label htmlFor={"password"}>Пароль</label>
                        </div>
                        <div>
                            <Field className={'border-2 border-solid border-blue-500'} id={"password"} name={"password"}
                                   type={"password"}/>
                        </div>
                        <div className={"text-red-500"}>
                            <ErrorMessage name={"password"}/>
                        </div>
                        <div>
                            <label htmlFor={"fio"}>ФИО</label>
                        </div>
                        <div>
                            <Field className={'border-2 border-solid border-blue-500'} id={"fio"} name={"fio"}
                                   type={"text"}/>
                        </div>
                        <div className={"text-red-500"}>
                            <ErrorMessage name={"fio"}/>
                        </div>
                        <div>
                            <label htmlFor={"phone"}>Телефон</label>
                        </div>
                        <div>
                            <Field className={'border-2 border-solid border-blue-500'} id={"phone"} name={"phone"}
                                   type={"tel"}/>
                        </div>
                        <div className={"text-red-500"}>
                            <ErrorMessage name={"phone"}/>
                        </div>
                        <div>
                            <label htmlFor={"email"}>Электронная почта</label>
                        </div>
                        <div>
                            <Field className={'border-2 border-solid border-blue-500'} id={"email"} name={"email"}
                                   type={"email"}/>
                        </div>
                        <div className={"text-red-500"}>
                            <ErrorMessage name={"email"}/>
                        </div>
                        <div className={"text-red-500"}>
                            {serverError}
                        </div>
                        <button disabled={!dirty || !isValid || isSubmitting} type={"submit"}
                                className={"mt-5 bg-blue-500 disabled:bg-gray-400 text-amber-50 w-1/5"}>
                            Зарегистрироваться
                        </button>
                    </Form>
                </div>
            }}
        </Formik>
    </div>
}