import { useForm } from 'react-hook-form';
import NavBar from '../../components/navbar/navbar'
import './home.css'
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';

export default function HomePage() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    const [todos, setTodos] = useState(getLocalStorageData());
    const [completeTodo, setCompleteTodo] = useState([]);
    const [deletedTodo, setDeletedTodo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

    const onSubmit = (data) => {
        if (isEditing) {
            const updatedTodos = [...todos];
            updatedTodos[currentTodoIndex] = {
                todoTitle: data.todoTitle,
                todoDescription: data.todoDescription,
            };
            setTodos(updatedTodos);
            setIsEditing(false);
            setCurrentTodoIndex(null);
        } else {
            // setTodos([...todos, data]);
            setTodos([...todos, { ...data, completed: false }]);
        }
        reset();
    };



    // Feteching data from local Storage 
    function getLocalStorageData() {
        const rawTodos = localStorage.getItem('allTodos')
        if (!rawTodos) {
            return [];
        }
        return JSON.parse(rawTodos);
    }

    //Adding data to local storge
    useEffect(() => {
        localStorage.setItem('allTodos', JSON.stringify(todos));
    }, [todos])

    //deleting todos
    function deleteTodos(index) {
        const updatedTodos = todos.filter((todo, i) => i !== index);
        setTodos(updatedTodos);

        setDeletedTodo([...deletedTodo, todos[index]]);

        //adding data in form of array
        const getData = JSON.parse(localStorage.getItem("deletedTodos") || "[]");
        let arr = [...getData];
        arr.push(...deletedTodo, todos[index]);
        localStorage.setItem("deletedTodos", JSON.stringify(arr));
    }

    //completed todos
    // function completedTodos(index) {
    //     setCompleteTodo([...completeTodo, todos[index]]);
    //     //adding data in form of array
    //     const getData = JSON.parse(localStorage.getItem("completedTodos") || "[]");
    //     let arr = [...getData];
    //     arr.push(...completeTodo, todos[index]);
    //     localStorage.setItem("completedTodos", JSON.stringify(arr));
    //     alert("Added to Complete Task ..")
    // }

    function completedTodos(index) {
        const updatedTodos = [...todos];
        updatedTodos[index] = {
            ...updatedTodos[index],
            completed: true, 
        };
        setTodos(updatedTodos);
    
    
        const getData = JSON.parse(localStorage.getItem("completedTodos") || "[]");
        let arr = [...getData];
        arr.push(...completeTodo, todos[index]);
        localStorage.setItem("completedTodos", JSON.stringify(arr));
    
        alert("Added to Complete Task ..");
    }

    // edit todos
    const editTodos = (index) => {
        const editTodo = todos[index];
        setValue('todoTitle', editTodo.todoTitle); 
        setValue('todoDescription', editTodo.todoDescription);
        setCurrentTodoIndex(index);
        setIsEditing(true);
    };

    return (
        <div className='topLevelContainer'>
            <NavBar />
            <div className='wrapper'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='todoTitle'>
                        <label for="todoTitle">Title</label>
                        <input
                            {...register('todoTitle', {
                                required: "Title is required",
                                minLength: {
                                    value: 4,
                                    message: "Title shouldnt exceed 15 letters"
                                },
                            })}
                            type='text'
                            id='todoTitle'
                            placeholder='Enter title ...'

                        />{errors.todoTitle && (<p className='errorP'>{errors.todoTitle.message}</p>)}

                    </div>
                    <div className='todoDescription'>
                        <label for="todoDescription">Description</label>
                        <input
                            {...register('todoDescription', {
                                required: "Title is required",
                                minLength: {
                                    value: 10,
                                    message: "Desc. should be more then 10 lettters"
                                },
                            })}
                            type='text'
                            id='todoDescription'
                            placeholder='Enter description'
                        />
                        {errors.todoDescription && (<p className='errorP'>{errors.todoDescription.message}</p>)}
                    </div>
                    <div className="submitBtn">
                        <button type='submit' >
                            Submit
                        </button>
                    </div>
                </form>

                <ol className='todoListContainer'>

                    {
                        todos.map((todo, index) =>
                            <li className={`todoList ${todo.completed ? 'completed' : ''}`} key={index}>



                                <div className='title-desc'>
                                    <div className='title'>
                                        <b>{todo.todoTitle} :</b>
                                    </div>
                                    <div className='description'>
                                        {todo.todoDescription}
                                    </div>
                                </div>

                                <div className="Btn">
                                    <div className="deleteBtn">
                                        <button onClick={() => deleteTodos(index)}><MdDelete /></button>
                                    </div>
                                    <div className="completedBtn">
                                        <button onClick={() => completedTodos(index)}><FaCheckCircle /></button>
                                    </div>
                                    <div className="editBtn">
                                        <button onClick={() => editTodos(index)}><FaEdit /></button>
                                    </div>
                                </div>

                            </li>
                        )
                    }

                </ol>

            </div>
        </div>
    )
}
