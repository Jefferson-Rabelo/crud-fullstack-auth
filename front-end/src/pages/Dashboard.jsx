import { useEffect, useState } from 'react'
import api from '../services/api'
import Modal from '../components/Modal'

import toast from 'react-hot-toast'

function Dashboard() {

    const [users, setUsers] = useState([])

    const [editingUser, setEditingUser] = useState(null)

    const [modalOpen, setModalOpen] = useState(false)

    const [logoutModalOpen, setLogoutModalOpen] = useState(false)

    const [selectedUserId, setSelectedUserId] = useState(null)

    const [formData, setFormData] = useState({
        nome: '',
        email: ''
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem('token')

            const response = await api.get('/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUsers(response.data)

        } catch (error) {

            console.error(error)

            toast.error('Erro ao buscar usuário')
        }
    }

    const handleLogout = () => {

        localStorage.removeItem('token')

        window.location.href = '/'

    }

    const handleDelete = async () => {

        try {

            //await api.delete(`/users/${selectedUserId}`)
            const token = localStorage.getItem('token')

            await api.delete(`/users/${selectedUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setModalOpen(false)

            setSelectedUserId(null)

            toast.success('Usuário deletado com sucesso!')

            //setTimeout(() => {
            //    setSuccessModalOpen(false)
            //}, 1000)

            fetchUsers()

        } catch (error) {

            console.error(error)

            toast.error('Erro ao deletar usuário')
        }
    }

    const handleEdit = (user) => {

        setEditingUser(user.id)

        setFormData({
            nome: user.nome,
            email: user.email
        })
    }

    const handleUpdate = async () => {

        try {

            //await api.put(`/users/${editingUser}`, formData)
            const token = localStorage.getItem('token')

            await api.put(
                `/users/${editingUser}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success('Usuário atualizado com sucesso!')

            setEditingUser(null)

            setFormData({
                nome: '',
                email: ''
            })

            fetchUsers()

        } catch (error) {

            console.error(error)

            toast.error('Erro ao atualizar usuário')
        }
    }

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Dashboard
                </h1>

                <button
                    onClick={() => setLogoutModalOpen(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded mb-4"
                >
                    Sair
                </button>

                {editingUser && (

                    <div className="mb-6 bg-gray-100 p-4 rounded">

                        <h2 className="text-xl font-bold mb-4">
                            Editar Usuário
                        </h2>

                        <input
                            type="text"
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    nome: e.target.value
                                })
                            }
                            className="border p-2 w-full mb-3 rounded"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }
                            className="border p-2 w-full mb-3 rounded"
                        />

                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Salvar Alterações
                        </button>

                    </div>
                )}

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-gray-200">

                            <th className="p-3 text-left">
                                ID
                            </th>

                            <th className="p-3 text-left">
                                Nome
                            </th>

                            <th className="p-3 text-left">
                                Email
                            </th>

                            <th className="p-3 text-left">
                                Ações
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {user.id}
                                </td>

                                <td className="p-3">
                                    {user.nome}
                                </td>

                                <td className="p-3">
                                    {user.email}
                                </td>

                                <td className="p-3 flex gap-2">

                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedUserId(user.id)
                                            setModalOpen(true)
                                        }}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Excluir
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <Modal
                    aberto={modalOpen}
                    fechar={() => {
                        setModalOpen(false)
                        setSelectedUserId(null)
                    }}
                    confirmar={handleDelete}
                    titulo="Excluir usuário"
                    mensagem="Deseja realmente excluir este usuário?"
                    textoBotaoConfirmar="Excluir"
                />
                <Modal
                    aberto={logoutModalOpen}
                    fechar={() => setLogoutModalOpen(false)}
                    confirmar={handleLogout}
                    titulo="Sair da conta"
                    mensagem="Deseja realmente sair da conta?"
                    textoBotaoConfirmar="Sair"
                />
            </div>

        </div>
    )
}

export default Dashboard