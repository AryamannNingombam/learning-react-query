import { QueryClient, QueryClientProvider } from 'react-query'
import MyApp from './index'
import TextPage from './text'
const queryClient = new QueryClient()
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <MyApp /> */}
      <TextPage />
    </QueryClientProvider>
  )
}
