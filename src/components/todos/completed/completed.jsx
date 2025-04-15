import React from 'react'
import NavBar from '../../navbar/navbar';
import './completed.css'

export default function CompletedTodos() {

  const completedTask = JSON.parse(localStorage.getItem("completedTodos"));
  console.log("Completed todos are: ", completedTask);

  return (
    <div>
      <NavBar />
      <div className='completedTasks'>
        <div className="completedTitle">
          Completed Todos
        </div>
        <ol className='completedTodoList'>
          {

            completedTask.map((todo, index) =>
              <li  key={index} className='completed-todo-list'>

                <div className="completed-todo-title">
                  <b>{todo.todoTitle}:</b>
                </div>

                <div className="completed-todo-description">
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
