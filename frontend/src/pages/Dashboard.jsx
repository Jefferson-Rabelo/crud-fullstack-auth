import { useEffect, useState } from 'react'
import api from '../services/api'

function Dashboard() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await api.get('/users')
            setUsers(response.data)

        } catch (error) {
            console.error(error)
            alert('Erro ao buscar usuário')
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('token')

        window.location.href = '/'
    }



    return (
        <div className="min-h-screen bg-gray-100 p-8" >
            <div className="max-w-4x1 mx-auto bg-white p-6 rounded-lg shadown" >

                <h1 className="text-3x1 font-bold mb-6">
                    Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className=" bg-red-500 text-white px-4 py-2 rounded mb-4"
                >
                    Sair
                </button>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200" >
                            <th className="p-3 text-left" >ID</th>
                            <th className="p-3 text-left" >Nome</th>
                            <th className="p-3 text-left" >Email</th>
                        </tr>
                    </thead>

                    <body>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b"
                            >
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.nome}</td>
                                <td className="p-3">{user.email}</td>
                            </tr>
                        ))}
                    </body>

                </table>

            </div>
        </div>

    )
}

export default Dashboard