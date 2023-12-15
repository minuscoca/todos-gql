import { gql, useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";;
import { GET_TODOS } from "..";

const ADD_TODO = gql`
  mutation AddTodo($title: String!)  {
    addTodo(title: $title) {  
      id
      title
      isCompleted
      createdAt
      updatedAt
    }
  }
`

function AddTodoDialog({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [input, setInput] = useState('')
  const [addTodo, { loading }] = useMutation(
    ADD_TODO, {
    variables: { title: input },
    refetchQueries: [GET_TODOS],
    optimisticResponse: {
      addTodo: {
        __typename: "Todo",
        id: 99999999,
        title: input,
        isCompleted: false,
        createdAt: new Date(),
      }
    },
    onCompleted: () => setInput(''),
  })

  const handleSave = async () => {
    await addTodo()
    onClose()
  }

  const handleClose = () => {
    if (loading) return
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add todo</DialogTitle>
      <IconButton
        aria-label="close"
        disabled={loading}
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
        <Button
          onClick={handleSave}
          disabled={loading || !input}
        >
          {loading ? 'Loading' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function AppHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box flex={1}>
            <Typography variant="h6" component="div">
              Todos
            </Typography>
          </Box>
          <Tooltip title="Add todo">
            <IconButton
              size="large"
              edge="end"
              color="primary"
              aria-label="add-todo"
              onClick={() => setOpen(true)}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <AddTodoDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}