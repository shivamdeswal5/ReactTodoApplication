import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from './pages/home/home'
import DeletedTodos from './components/todos/deleted/deleted'
import CompletedTodos from './components/todos/completed/completed'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/deleted' element={<DeletedTodos />} />
          <Route path='/completed' element={<CompletedTodos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
