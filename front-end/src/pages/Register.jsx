import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Register() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await api.post('/users', formData)
            toast.success('Usuário cadastrado com sucesso')
            navigate('/')

        } catch (error) {
            console.error(error)
            toast.error('Erro ao cadastrar usuário')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6" >Cadastro</h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="nome"
                        placeholder="Digite seu nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg">

                    </input>

                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg">

                    </input>

                    <input
                        type="password"
                        name="senha"
                        placeholder="Digite seu senha"
                        value={formData.senha}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg">

                    </input>

                    <button className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90" >
                        Cadastrar
                    </button>

                    <p className="text-center">
                        já possui conta?{' '}

                        <span
                            onClick={() => navigate('/')}
                            className="text-blue-500 cursor-pointer">
                            Fazer login
                        </span>
                    </p>


                </form>


            </div>
        </div>

    )
}

export default Register