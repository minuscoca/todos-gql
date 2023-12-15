import { useQuery, gql } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { Container, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AppHeader from './components/app-header';
import TodoList from './components/todo-list';
import type { Todo } from '../db/schema/todos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMemo } from 'react';

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      isCompleted
      createdAt
      updatedAt
    }
  }
`

export default function Home() {
  const { data: { todos } } = useQuery<{ todos: Todo[] }>(GET_TODOS)
  const grouped = useMemo(() => {
    const data = todos.reduce<Record<'todos' | 'completed', Todo[]>>((acc, curr) => {
      if (curr.isCompleted) {
        acc.completed.push(curr)
      } else {
        acc.todos.push(curr)
      }
      return acc
    }, {
      todos: [],
      completed: [],
    })
    data.completed.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1)
    return data
  }, [todos])

  return (
    <>
      <AppHeader />
      <Container component='main'>
        <Box sx={{ mt: 8 }}>
          <Box sx={{ pl: 2, pr: 2 }}>
            <TodoList data={grouped.todos} />
          </Box>
          {
            grouped.completed.length > 0 && (
              <Accordion>
                <AccordionSummary
                  id="completed-todos-header"
                  aria-controls="completed-todos-content"
                  expandIcon={<ExpandMoreIcon />}
                >
                  Completed
                </AccordionSummary>
                <AccordionDetails>
                  <TodoList data={grouped.completed} />
                </AccordionDetails>
              </Accordion>
            )
          }
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
