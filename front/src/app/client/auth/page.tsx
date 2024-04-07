"use client"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useCallback, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function AuthPage() {
    const [serverError, setServerError] = useState("")
    const {push} = useRouter()

    const handleAuth = useCallback(async (authValues: { login: string, password: string }) => {
        const response = await signIn("auth_creds", {
            redirect: false,
            login: authValues.login,
            password: authValues.password,
            callbackUrl: `${window.location.origin}`
        })

        if (response?.error) {
            setServerError("Неправильный логин или пароль")
        } else {
            setServerError("")
        }

        if (response?.url) {
            push(response.url)
        }

    }, [push])

    return <div>
        <Formik initialValues={
            {
                login: "",
                password: ""
            }
        }
                validationSchema={Yup.object({
                    login: Yup.string().required("Обязательное поле"),
                    password: Yup.string().required("Обязательное поле")
                })}
                onSubmit={async (values) => await handleAuth({login: values.login, password: values.password})}>
            {({isValid, isSubmitting, dirty}) => {
                return <div className={"m-5 p-5 shadow-black shadow-sm"}>
                    <h3 className={"text-3xl"}>
                        Авторизация
                    </h3>
                    <Form>
                        <div className={"w-full"}>
                            <label htmlFor={"login"}>Логин</label>
                        </div>
                        <div>
                            <Field className={'border-2 border-blue-500'} id={"login"} name={"login"} type={"text"}/>
                        </div>
                        <div className={"text-red-600"}>
                            <ErrorMessage name={"login"}/>
                        </div>
                        <div>
                            <label htmlFor={"password"}>Пароль</label>
                        </div>
                        <div>
                            <Field className={'border-2 border-solid border-blue-500'} id={"password"} name={"password"}
                                   type={"password"}/>
                        </div>
                        <div className={"text-red-600"}>
                            <ErrorMessage name={"password"}/>
                        </div>
                        <div className={"text-red-600"}>
                            {serverError}
                        </div>
                        <button disabled={!dirty || !isValid || isSubmitting} type={"submit"}
                                className={"mt-5 bg-blue-500 disabled:bg-gray-400 text-amber-50 w-1/5"}>
                            Войти
                        </button>
                    </Form>
                </div>
            }}
        </Formik>
    </div>
}