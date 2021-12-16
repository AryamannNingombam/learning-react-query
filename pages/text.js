import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
// import { useDebounce } from 'use-debounce'
import * as methods from '../services/text.service'

function MyApp() {
  const queryClient = useQueryClient()
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text, 2000)

  const textQuery = useQuery('text', methods.GetText)

  const postText = useMutation(methods.PostText, {
    onSuccess: () => {
      console.log('DONE')
      queryClient.invalidateQueries('text')
    },
    onError: () => {
      console.log('ERROR')
    },
  })

  useEffect(() => {
    if (debouncedText) {
      postText.mutate({ text: debouncedText })
    }
  }, [debouncedText])

  return (
    <>
      <h1>{textQuery.data?.text || 'NO TEXT'}</h1>
      <input onChange={(e) => setText(e.target.value)} />
    </>
  )
}

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay], // Only re-call effect if value or delay changes
  )
  return debouncedValue
}

export default MyApp
