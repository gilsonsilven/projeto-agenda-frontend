import PageLayout from "@/components/PageLayout.jsx"

export default function Contacts() {

    return (

        <PageLayout>
            <div className="flex justify-between align-center mx-4 mt-4">
                <h1 className="text-xl font-semibold">Meus Contatos</h1>
                <button className="p-1 w-[70px] rounded bg-blue-500 text-white">Novo?</button>
            </div>
            <div className="mx-4 mt-4">
                <table className="table-fixed bg-white border-separate border-spacing-0 w-full">
                    <thead>
                        <tr className="bg-[#E1E1E1] h-12">
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Data de nascimento</th>
                            <th>Email</th>
                            <th>Endereço</th>                        
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        
                    </tbody>

                </table>
            </div>
        </PageLayout>
    )
}