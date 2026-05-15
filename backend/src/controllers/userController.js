const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userSchema } = require('../validation/userValidation')

//Criar usuário
exports.createUsers = async (req, res) => {
    const validation = userSchema.safeParse(req.body)

    if (!validation.success) {
        return res.status(404).json({
            error: validation.error.errors
        })
    }
    const { nome, email, senha } = validation.data

    try {
        const hashedPassword = await bcrypt.hash(senha, 10)

        const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)'

        db.query(sql, [nome, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Erro ao criar usuário' })
            }
            res.status(201).json({
                mensagem: 'Usuário criado com sucesso',
                userId: result.insertId
            })
        })
    } catch (error) {
        console.error(err)
        res.status(500).json({ error: 'Erro ao criptografar senha' })
    }
}
//listar usuarios
exports.getUsers = (req, res) => {
    const sql = 'SELECT id, nome, email, created_at FROM users'

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao buscar usuário' })
        }
        res.status(200).json(results)
    }

    )
}
//pegar usuário pelo id
exports.getUserById = (req, res) => {
    const { id } = req.params

    const sql = 'SELECT id, nome, email, created_at FROM users WHERE id = ?'

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao buscar usuário' })
        }
        if (results.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }
        res.status(200).json(results[0])
    })
}
//atualizar/editar usuário
exports.updateUser = async (req, res) => {
    const { id } = req.params
    const { nome, email, senha } = req.body

    try {
        const fields = []
        const values = []

        if (nome) {
            fields.push('nome = ?')
            values.push(nome)
        }

        if (email) {
            fields.push('email = ?')
            values.push(email)
        }

        if (senha) {
            const hashedPassword = await bcrypt.hash(senha, 10)
            fields.push('senha = ?')
            values.push(hashedPassword)
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'Nenhum dado para atualizar' })
        }


        const sql = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = ?
    `
        values.push(id)

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Erro ao atualizar usuário' })
            }
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: 'Usuário não encontrato' })
            }
            res.status(200).json({ message: 'Usuário atualizado com secuesso' })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao atualizar senha' })
    }

}
//deletar usuario
exports.deleteUser = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM users WHERE id = ?'

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao deletar usuário' })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }
        res.status(200).json({ mensagem: 'Usuário deletado com sucesso' })
    })
}

exports.login = (req, res) => {
    const { email, senha } = req.body

    const sql = 'SELECT * FROM users WHERE email = ?'

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro no servidor' })
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        const user = results[0]

        const isMatch = await bcrypt.compare(senha, user.senha)

        if (!isMatch) {
            return res.status(401).json({ message: 'Senha inválida' })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.json({
            message: 'Login realizado com sucesso!',
            token
        })
    })
}