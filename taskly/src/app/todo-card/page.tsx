import React from 'react'
import DateComponent from '../dateComponent/page'
import TodoList from '../todo-list/page'

const TodoCard = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-full h-screen md:w-[40%] bg-gradient-to-r from-violet-200 to-pink-200'>
        <div>
            <div>
              <DateComponent />
              <TodoList />
            </div>
        </div>
      </div>
    </div>
  )
}

export default TodoCard