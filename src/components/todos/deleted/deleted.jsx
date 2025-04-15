import React from 'react'
import NavBar from '../../navbar/navbar';
import './deleted.css'

export default function DeletedTodos() {

  const deletedTask = JSON.parse(localStorage.getItem("deletedTodos"));
  console.log("deleted todos are: ", deletedTask);

  return (
    <div>
      <NavBar />
      <div className='deletedTasks'>
        <div className='deletedTitle'>
          Deleted Todos
        </div>
        <ol className='deletedTodoList'>
          {

            deletedTask.map((todo, index) =>
              <li key={index} className='deleted-todo-list'>

                <div className="deleted-todo-title">
                  <b>{todo.todoTitle}:</b>
                </div>

                <div className="deleted-todo-description">
                  {todo.todoDescription}
                </div>

              </li>
            )

          }
        </ol>
      </div>

    </div>
  )
}
