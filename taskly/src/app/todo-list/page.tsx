"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, toggleTask } from "../store/taskStore";

const TodoList = () => {
  const [tasks, setTasks] = useState<
    { name: string; id: number; isChecked: boolean }[]
  >([]);
  const [taskName, settaskName] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const newList = [
      ...tasks,
      { name: taskName, id: tasks.length + 1, isChecked: false },
    ];
    setTasks(newList);
    dispatch(
      addTask({
        name: taskName,
        id: (tasks.length + 1).toString(),
        isChecked: false,
      })
    );
    settaskName("");
  };

  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
    dispatch(toggleTask(id));
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <h1 className="text-2xl text-fuchsia-800 font-medium">To Do List</h1>
      </div>
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-md mx-auto my-5"
        >
          <div className="relative">
            <input
              type="text"
              value={taskName}
              onChange={(e) => settaskName(e.target.value)}
              id="default-search"
              className="block ml-3 w-[95%] md:ml-0 md:w-full p-4 ps-5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add Task, Notes..."
              required
            />
            <button
              type="button"
              onClick={handleAddTask}
              className="text-white cursor-pointer absolute end-2.5 bottom-2.5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Task
            </button>
          </div>
        </form>
        <div className="flex flex-col mt-5 ml-[10%] md:mt-10 md:ml-[25%]">
          {tasks?.length > 0 &&
            tasks.map((task) => (
              <div key={task.id}>
                <ul className="w-70 md:w-100 my-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="vue-checkbox"
                        type="checkbox"
                        checked={task.isChecked}
                        onChange={() => handleCheckboxChange(task.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="vue-checkbox"
                        className={`w-full py-3 ms-2 pl-2 text-xl font-medium text-gray-900 dark:text-gray-300 ${
                          task.isChecked ? "line-through" : ""
                        }`}
                      >
                        {task.name}
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
