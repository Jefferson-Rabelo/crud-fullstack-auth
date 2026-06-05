import { useEffect, useState } from 'react'
import api from '../services/api'
import Modal from '../components/Modal'
import { FaUsers } from 'react-icons/fa'
import { FaServer } from 'react-icons/fa'
import { FaRocket } from 'react-icons/fa'

import toast from 'react-hot-toast'


function Dashboard() {

    const [users, setUsers] = useState([])

    const [editingUser, setEditingUser] = useState(null)

    const [modalOpen, setModalOpen] = useState(false)

    const [logoutModalOpen, setLogoutModalOpen] = useState(false)

    const [selectedUserId, setSelectedUserId] = useState(null)

    const [loading, setLoading] = useState(false)

    const [deleteLoading, setDeleteLoading] = useState(false)

    const [search, setSearch] = useState('')

    const [formData, setFormData] = useState({
        nome: '',
        email: ''
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {

        setLoading(true)

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

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {

        localStorage.removeItem('token')

        window.location.href = '/'

    }

    const handleDelete = async () => {

        setDeleteLoading(true)

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
        } finally {
            setDeleteLoading(false)
        }
    }

    const handleEdit = (user) => {
        console.log('Usuário clicado:', user)

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

    const filteredUsers = users.filter((user) => {
        return (
            user.nome.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
    })

    console.log('editingUser:', editingUser)
    return (

        <div className="min-h-screen bg-gray-100">

            {/*HEADER*/}
            <header className='bg-white shadow-sm border-b'>
                <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>

                    <div>
                        <h1 className='text-3xl font-bold text-gray-800'>
                            Dashboard</h1>

                        <p className='text-gray-500'>
                            Gerencie os usuarios do sistema</p>

                        <button
                            onClick={() => setLogoutModalOpen(true)}
                            className='bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg font-medium'
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </header>
            {/*CONTEÚDO*/}
            <main className='max-w-7xl mx-auto p-6'>

                {/*CARDS*/}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>

                    <div className='bg-white p-6 rounded-2xl shadow-sm border'>

                        <div className='flex justify-between items-center'>

                            <div>

                                <h2 className='text-gray-500 text-sm'>
                                    Total de Usuários
                                </h2>

                                <p className='text-4xl font-bold text-blue-600 mt-2'>
                                    {users.length}
                                </p>

                            </div>

                            <FaUsers
                                size={40}
                                className='text-blue-500'
                            />

                        </div>

                    </div>

                    <div className='bg-white p-6 rounded-2xl shadow-sm border'>

                        <div className='flex justify-between items-center'>

                            <div>

                                <h2 className='text-gray-500 text-sm'>
                                    Sistema
                                </h2>

                                <p className='text-2xl font-bold text-green-600 mt-2'>
                                    Online
                                </p>

                            </div>

                            <FaServer
                                size={40}
                                className='text-green-500'
                            />

                        </div>

                    </div>

                    <div className='bg-white p-6 rounded-2xl shadow-sm border'>

                        <div className='flex justify-between items-center'>

                            <div>

                                <h2 className='text-gray-500 text-sm'>
                                    Ambiente
                                </h2>

                                <p className='text-2xl font-bold text-purple-600 mt-2'>
                                    Produção
                                </p>

                            </div>

                            <FaRocket
                                size={40}
                                className='text-purple-500'
                            />

                        </div>

                    </div>

                </div>
                <div className='mb-6'>
                    <input
                        type='text'
                        placeholder='Buscar usuário...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full bg-white md:w-80 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'

                    />
                </div>

                {/*TABELA*/}
                {loading ? (
                    <div className='bg-white rounded-2xl shadow-sm border p-10 text-center'>
                        <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4">'></div>
                        <p className='text-gray-500 text-lg'>
                            Carregando usuários...
                        </p>
                    </div>

                ) : (
                    <div className='bg-white rounded-2xl shadow-sm border overflow-hidden'>
                        <div className='p-6 border-b'>
                            <h2 className='text-xl font-bold text-gray-800'>
                                Usuários cadastrados
                            </h2>
                        </div>

                        <div className='overflow-x-auto'>
                            <table className='w-full min-w-[700px]'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='text-left p-4 font-semibold text-gray-600'>ID</th>
                                        <th className='text-left p-4 font-semibold text-gray-600'>Nome</th>
                                        <th className='text-left p-4 font-semibold text-gray-600'>Email</th>
                                        <th className='text-left p-4 font-semibold text-gray-600'>Opções</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className='border-t hover:bg-gray-50 transition'>
                                            <td className='p-4'>
                                                {user.id}
                                            </td>

                                            <td className='p-4 font-medium text-gray-800'>
                                                {user.nome}
                                            </td>

                                            <td className='p-4 text-gray-600'>
                                                {user.email}
                                            </td>

                                            <td className='p-4 flex gap-3'>
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className='bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-lg'
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setSelectedUserId(user.id)
                                                        setModalOpen(true)
                                                    }}
                                                    className='bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg'>
                                                    Excluir
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                    </div>
                )
                }
            </main >

            <Modal
                aberto={modalOpen}
                fechar={() => {
                    setModalOpen(false)
                    setSelectedUserId(null)
                }}
                confirmar={handleDelete}
                titulo="Excluir usuário"
                mensagem="Deseja realmente excluir este usuário?"
                textoBotaoConfirmar={
                    deleteLoading ? 'Excluindo...' : 'Excluir'
                }
            />

            <Modal
                aberto={logoutModalOpen}
                fechar={() => setLogoutModalOpen(false)}
                confirmar={handleLogout}
                titulo="Sair da conta"
                mensagem="Deseja realmente sair da conta?"
                textoBotaoConfirmar='Sair'
            />

            <Modal
                aberto={editingUser}

                titulo="Editar Usuário"
            >
                <div className='space-y-4'>
                    <label className='block text-sm font-medium text-gray-600 mb-2'
                    >Nome</label>
                    <input
                        type='text'
                        placeholder='Nome'
                        value={formData.nome}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                nome: e.target.value
                            })
                        }
                        className='w-full border border-gray-300 rounded-xl px-4 py-2'
                    />
                    <label className='block text-sm font-medium text-gray-600 mb-2'
                    >Email</label>
                    <input
                        type='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }}
                        className='w-full border border-gray-300 rounded-xl px-4 py-2'
                    />
                    <div className='flex justify-center gap-3 pt-2'>

                        <button
                            onClick={() => {
                                setEditingUser(null)
                                setFormData({
                                    nome: '',
                                    email: ''
                                })
                            }}
                            className='px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300'
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleUpdate}
                            className='px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white'
                        >Salvar Alteração</button>
                    </div>

                </div>

            </Modal >

        </div >
    )
}

export default Dashboard