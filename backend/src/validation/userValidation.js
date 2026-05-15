const { z } = require('zod')

const userSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter no mínomo 3 caracteres'),
    email: z.string().email(' Email inválido'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional()
})

module.exports = { userSchema }