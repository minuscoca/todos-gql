import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Radio, TextField, Typography } from '@mui/material';
import type { Todo } from '../../db/schema/todos';
import { gql, useMutation } from '@apollo/client';
import { GET_TODOS } from '..';
import CloseIcon from "@mui/icons-material/Close";
import { useState } from 'react';

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

const EDIT_TODO = gql`
  mutation EditTodo($id: Int!, $title: String!) {
    editTodo(id: $id, title: $title) {
      id
      title
      isCompleted
      createdAt
      updatedAt
    }
  }
`

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
      title
      isCompleted
      createdAt
      updatedAt
    }
  }
`

function EditTodoDialog({ open, onClose, data }: { open: boolean, onClose: () => void, data: Todo }) {
  const [input, setInput] = useState(data.title)
  const [editTodo, { loading: isEditLoading }] = useMutation(
    EDIT_TODO, {
    variables: { id: data.id, title: input },
    refetchQueries: [GET_TODOS],
    optimisticResponse: {
      editTodo: {
        __typename: "Todo",
        ...data,
        title: input,
        updatedAt: new Date(),
      }
    }
  })
  const [deleteTodo, { loading: isDeleteLoading }] = useMutation(
    DELETE_TODO, {
    variables: { id: data.id },
    refetchQueries: [GET_TODOS]
  })

  const handleSave = async () => {
    await editTodo()
    onClose()
  }

  const handleDelete = async () => {
    await deleteTodo()
    onClose()
  }

  const handleClose = () => {
    if (isDeleteLoading) return
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add todo</DialogTitle>
      <IconButton
        aria-label="close"
        disabled={isDeleteLoading}
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="todo"
          label="Todo"
          type="text"
          fullWidth
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {(isEditLoading || isDeleteLoading)
          ? (
            <Button disabled>
              <CircularProgress size={20} />
            </Button>
          )
          : (
            <>
              <Button
                onClick={handleDelete}
                disabled={isDeleteLoading}
              >
                {isDeleteLoading ? 'Loading' : 'Delete'}
              </Button>
              <Button
                onClick={handleSave}
                disabled={isEditLoading || input === data.title}
              >
                {isEditLoading ? 'Loading' : 'Save'}
              </Button>
            </>
          )
        }
      </DialogActions>
    </Dialog>
  )
}

function TodoItem({ data }: { data: Todo }) {
  const [open, setOpen] = useState(false)
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
    <>
      <ListItem disablePadding>
        <ListItemButton
          role={undefined}
          dense
          disabled={loading}
          onClick={() => setOpen(true)}
        >
          <ListItemIcon>
            <Radio
              edge='start'
              checked={data.isCompleted}
              tabIndex={1}
              disableRipple
              inputProps={{ 'aria-labelledby': `todo-item-${data.id}-label` }}
              onClick={() => completeTodo()}
            />
          </ListItemIcon>
          <ListItemText>
            {data.title}
          </ListItemText>
          <ListItemSecondaryAction tabIndex={1}>
            {loading && <CircularProgress size={20} />}
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>

      <EditTodoDialog
        open={open}
        onClose={() => setOpen(false)}
        data={data}
      />
    </>
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