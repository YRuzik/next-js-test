"use client"
import Image from "next/image";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {IRole} from "@/src/interfaces/user";

export default function ClientHeader() {
    const {data: session} = useSession()
    return (
        <div className={"bg-blue-400 h-20 w-full flex items-center"}>
            <div className={"flex mx-auto items-center container justify-between p-1"}>
                <Link href={"/client"} className={'text-amber-50 text-2xl flex items-center justify-between'}>
                    <Image src={"/logo_sham.png"} alt={"logo"} width={100} height={100}/>
                    <div>
                        Нарушениям.Нет
                    </div>
                </Link>
                {session ? <div className={'text-amber-50'}>
                    {session.user.role === IRole.admin &&
                        <Link className={"mr-5"} href={"/client/dashboard"}>Админ панель</Link>}
                    <Link href={"/client/statements"}>
                        Мои заявления
                    </Link>
                    <button className={"ml-5"} onClick={() => signOut()}>
                        Выйти
                    </button>
                </div> : <div className={'text-amber-50'}>
                    <Link className={"pr-5"} href={"/client/auth"}>
                        Авторизироваться
                    </Link>
                    <Link href={"/client/registration"}>
                        Зарегистрироваться
                    </Link>
                </div>}

            </div>
        </div>
    )
}