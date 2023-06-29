import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

type Todo = {
    id: string,
    name: string
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [name, setName] = useState("")

    useEffect(() => {
        axios.get("/api/todos")
            .then((response) => {
                    setTodos(response.data)
                }
            )
    })

    const addTodo = () => {
        axios.post("/api/todos", {name: name})
            .then(response => {
                setTodos(prevState => [...prevState, response.data])
            })
    }

    return (
        <>
            {todos.map(todo => <div>
                <p>{todo.id}</p>
                <p>{todo.name}</p>
            </div>)}

            <input value={name} onChange={event => setName(event.target.value)}/>
            <button onClick={addTodo}>Save</button>
        </>
    )
}

export default App
