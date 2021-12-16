import { useEffect, useState } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'
import * as methods from '../services/todo.service'

function MyApp() {
  const queryClient = useQueryClient()
  const [counter, setCounter] = useState(2)
  const [text, setText] = useState('')

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchPreviousPage,
    status,
  } = useInfiniteQuery('todos', methods.GetAllTodos, {
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage, pages)
      return parseInt(lastPage.currentPage) + 1
    },
  })

  const mutation = useMutation(methods.PostTodo, {
    onSuccess: () => {
      console.log('YES BABY')
      queryClient.invalidateQueries('todos')
      setCounter((s) => s + 1)
    },
    onError: () => {
      console.log('ERROR')
    },
  })

  const updateTodo = useMutation(methods.UpdateTodo, {
    onSuccess: () => {
      console.log('Updated!')
      queryClient.invalidateQueries('todos')
    },
    onError: () => {
      console.log('Error!')
    },
  })
  const OnClickMe = () => {
    mutation.mutate({
      id: counter,
      title: 'Oh yes',
      description: 'Oh yes this is sexy as fuck',
    })
  }

  const onClickMe2 = () => {
    updateTodo.mutate({
      id: 1,
      title: 'Updated',
      description: 'Updated',
    })
  }

  return (
    <>
      <button onClick={OnClickMe}>Click me!</button>
      <button onClick={onClickMe2}>Click me 2!</button>
      {data?.pages.map((d, i) => (
        <div key={i}>
          {d.todos.map((todo) => (
            <div key={todo._id}>
              Id : {todo.id}
              Title : {todo.title}
              Description:{todo.description}
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={() => {
          fetchNextPage()
        }}
      >
        Next Page
      </button>
    </>
  )
}

export default MyApp
