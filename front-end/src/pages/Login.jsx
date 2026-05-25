import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
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
            const response = await api.post('/login', formData)

            localStorage.setItem('token', response.data.token)

            toast.success('Login realizado com sucesso')

            navigate('/dashboard')

        } catch (error) {
            console.error(error)

            toast.error('Erro ao fazer login')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg"
                    />

                    <input
                        type="password"
                        name="senha"
                        placeholder="Digite sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg"
                    />

                    <button
                        className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90"
                    >
                        Entrar
                    </button>

                    <p className="text-center">
                        Não possui conta?{' '}

                        <span onClick={() => navigate("/register")}
                            className='text-blue-500 cursor-pointer'
                        >Cadastre-se</span>
                    </p>

                </form>
            </div>

        </div>

    )
}

export default Login