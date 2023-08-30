const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const user = await prisma.User.findUnique({
    where: {
      id,
    },
  })
  res.send(user)
})

app.get('/', async (req, res) => {
  const users = await prisma.User.findMany()
  res.send(users)
})

app.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.User.create({
    data: {
      name,
      email,
    },
  })
  res.send("Data created successfully!")
})

app.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const user = await prisma.User.update({
    where: {
      id
    },
    data: {
      name,
      email,
    },
  })
  res.send("Data updated successfully!")
})

app.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const user = await prisma.User.delete({
    where: {
      id,
    },
  })
  res.send("Data deleted successfully!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})