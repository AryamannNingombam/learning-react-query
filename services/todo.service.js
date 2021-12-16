import axios from 'axios'

export const GetAllTodos = async ({ pageParam = 0 }) => {
  const response = await axios.get('/api/todo?page=' + pageParam)
  return response.data
}

export const PostTodo = async (body) => {
  const response = await axios.post('/api/todo', body)
  return response.data
}

export const UpdateTodo = async (body) => {
  const response = await axios.put('/api/todo', body)
  return response.data
}
export const DeleteTodo = async (_id) => {
  const response = await axios.delete('/api/todo', {
    headers: {
      _id,
    },
  })
  return response.data
}
