"use client"
import Image from "next/image";
import Link from "next/link";

export default function ClientHeader() {
    return (
        <div className={"bg-blue-400 h-20 w-full flex items-center"}>
            <div className={"flex mx-auto items-center container justify-between p-1"}>
                <Link href={"/client"} className={'text-amber-50 text-2xl flex items-center justify-between'}>
                    <Image src={"/logo_sham.png"} alt={"logo"} width={100} height={100}/>
                    <div>
                        Нарушениям.Нет
                    </div>
                </Link>
                <div className={'text-amber-50'}>
                    <Link className={"pr-5"} href={"/client/auth"}>
                        Авторизироваться
                    </Link>
                    <Link href={"/client/registration"}>
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
        </div>
    )
}