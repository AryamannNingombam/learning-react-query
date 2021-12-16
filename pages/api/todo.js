const todos = [
  {
    title: 'HEllo',
    id: 1,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 2,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 3,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 4,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 5,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 6,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 7,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 8,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 9,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 10,
    description: 'Hopping on the radar',
  },
  {
    title: 'HEllo',
    id: 11,
    description: 'Hopping on the radar',
  },
]

const Index = (req, res, next) => {
  if (req.method === 'GET') {
    const page = req.query.page
    return res
      .status(200)
      .json({ todos: todos.slice(page * 3, page * 3 + 3), currentPage: page })
  }
  if (req.method === 'POST') {
    const body = req.body
    if (body.id < 0)
      return res.status(500).json({
        success: false,
        message: 'Id not valid!',
      })
    todos.push(body)
    return res.status(200).json({
      success: true,
      todos,
    })
  }
  if (req.method === 'PUT') {
    const body = req.body
    if (body.id < 0)
      return res.status(500).json({
        success: false,
        message: 'Id not valid!',
      })
    const index = todos.findIndex((todo) => todo.id === body.id)
    if (index < 0)
      return res.status(500).json({
        success: false,
        message: 'Id not found!',
      })
    todos[index] = body
    return res.status(200).json({
      success: true,
      todos,
    })
  }

  if (req.method === 'DELETE') {
    const _id = req.headers._id
    if (_id < 0)
      return res.status(500).json({
        success: false,
        message: 'Id not valid!',
      })
    const index = todos.findIndex((todo) => todo.id === _id)
    if (index < 0)
      return res.status(500).json({
        success: false,
        message: 'Id not found!',
      })
    todos.splice(index, 1)
    return res.status(200).json({
      success: true,
      todos,
    })
  }
}

export default Index
