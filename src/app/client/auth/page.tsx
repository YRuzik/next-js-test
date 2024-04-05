"use client"
import {Field, Form, Formik} from "formik";

export default function AuthPage () {
    return <div>
        <Formik initialValues={
            {
                login: "",
                password: ""
            }
        } onSubmit={(values) => console.log(values)}>
            {({values}) => {
                return <div className={"m-5 p-5 shadow-black shadow-sm"}>
                    <h3 className={"text-3xl"}>
                        Авторизация
                    </h3>
                    <Form>
                        <div className={"w-full"}>
                            <label htmlFor={"login"}>Логин</label>
                        </div>
                        <div className={'mb-5'}>
                            <Field classname={'border-2 border-rose-500'} id={"login"} name={"login"} type={"text"}/>
                        </div>
                        <div>
                            <label htmlFor={"password"}>Пароль</label>
                        </div>
                        <div>
                            <Field classname={'border-2 border-solid border-rose-500'} id={"password"} name={"password"} type={"password"}/>
                        </div>
                        <button type={"submit"} className={"mt-5 bg-blue-500 disabled:bg-gray-400 text-amber-50 w-1/5"}>
                            Войти
                        </button>
                    </Form>
                </div>
            }}
        </Formik>
    </div>
}