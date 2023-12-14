import { useQuery, gql } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { Container, Box } from '@mui/material';
import AppHeader from './components/app-header';
import TodoList from './components/todo-list';
import type { Todo } from '../apollo/type-defs';

const TodosQuery = gql`
  query TodosQuery {
    todos {
      id
      name
      completed
    }
  }
`

export default function Home() {
  const { data: { todos }, } = useQuery<{ todos: Todo[] }>(TodosQuery)

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
    query: TodosQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}
