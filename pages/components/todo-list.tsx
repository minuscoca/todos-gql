import { CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Radio, Typography } from '@mui/material';
import type { Todo } from '../../db/schema/todos';
import { gql, useMutation } from '@apollo/client';
import { GET_TODOS } from '..';

const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: Int!, $isCompleted: Boolean!) {
    completeTodo(id: $id, isCompleted: $isCompleted) {
      id
      title
      isCompleted
      createdAt
      updatedAt
    }
  }
`

function TodoItem({ data }: { data: Todo }) {
  const [completeTodo, { loading }] = useMutation(
    COMPLETE_TODO, {
    variables: { id: data.id, isCompleted: !data.isCompleted },
    refetchQueries: [GET_TODOS],
    optimisticResponse: {
      completeTodo: {
        __typename: "Todo",
        ...data,
        isCompleted: !data.isCompleted,
      }
    }
  })

  return (
    <ListItem disablePadding>
      <ListItemButton
        role={undefined}
        dense
        disabled={loading}
        onClick={() => completeTodo()}
      >
        <ListItemIcon>
          <Radio
            edge='start'
            checked={data.isCompleted}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': `todo-item-${data.id}-label` }}
          />
        </ListItemIcon>
        <ListItemText>
          {data.title}
        </ListItemText>
        <ListItemSecondaryAction>
          {loading && <CircularProgress size={20} />}
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  )
}

export default function TodoList({ data }: { data?: Todo[] }) {
  if (!data) return <Typography>All done</Typography>
  return (
    <List>
      {data.map(todo => <TodoItem key={todo.id} data={todo} />)}
    </List>
  )
}