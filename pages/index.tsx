import { useQuery, gql } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { Container, Box } from '@mui/material';
import AppHeader from './components/app-header';
import TodoList from './components/todo-list';
import type { Todo } from '../db/schema/todos';

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      isCompleted
    }
  }
`

export default function Home() {
  const { data: { todos } } = useQuery<{ todos: Todo[] }>(GET_TODOS)

  return (
    <>
      <AppHeader />
      <Container component='main'>
        <Box sx={{ mt: 8 }}>
          <TodoList data={todos} />
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_TODOS,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}
