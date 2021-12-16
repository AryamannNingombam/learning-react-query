import axios from 'axios'

export const GetText = async () => {
  const response = await axios.get('/api/text')
  return response.data
}

export const PostText = async (body) => {
  const response = await axios.post('/api/text', body)
  return response.data
}
