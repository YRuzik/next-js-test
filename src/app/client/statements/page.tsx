export default function StatementsPage () {
    return <div className={"w-full"}>
        <h4 className={"text-3xl"}>
            Заявления
        </h4>
        <div className={"p-5"}>
            <table className={"table-fixed w-full"}>
                <thead>
                <tr>
                    <td>
                        Номер
                    </td>
                    <td>
                        Статус
                    </td>
                    <td>
                        Нарушение
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        ts830s33
                    </td>
                    <td>
                        В обработке
                    </td>
                    <td>
                        Переехал бабку
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
}