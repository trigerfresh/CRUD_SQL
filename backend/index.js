const express = require('express')
const mysql2 = require('mysql2')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000

const user = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

app.post('/create', (req, res) => {
  let data = [req.body.name, req.body.email]
  let sql = 'INSERT INTO users (name, email) VALUES (?, ?)'
  user.query(sql, data, (error, result) => {
    if (error) return res.send(error)
    res.send(result)
  })
})

app.get('/show', (req, res) => {
  user.query('select * from users', (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Error fetching student.' })
    }
    res.status(200).json(result)
  })
})

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params
  console.log('Received ID from URL:', id) // Logs the ID received from the URL
  if (!id) {
    return res.status(400).json({ message: 'ID is missing or invalid.' })
  }

  user.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Error deleting user' })
    } else {
      return res.status(200).json({ message: 'User deleted successfully' })
    }
  })
})

app.get('/show/:id', (req, res) => {
  const { id } = req.params
  const query = 'select * from users where id = ?'

  user.query(query, [id], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Error fetching data' })
    }

    if (result.length > 0) {
      return res.json(result[0])
    } else {
      return res.status(404).json({ message: 'Student not found' })
    }
  })
})

app.put('/update/:id', (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email required' })
  }

  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?'

  user.query(query, [name, email, id], (err, result) => {
    if (err) {
      console.error('Error updating data: ', err)
      return res.status(500).json({ message: 'Error updating data' })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' })
    }

    res.status(200).json({ message: 'Student updated successfully' })
  })
})

user.connect((err) => {
  if (err) throw err
  console.log('Connected to MySQL Database')
})

app.listen(PORT, () => {
  console.log(`Server ready @ ${PORT}`)
})
