"use client";
import { useEffect, useState } from "react";
import { ITodo } from "./src/types/todos.type";
import { addTodos, fetchTodos } from "./src/service/todos.service";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>();
  const [task, setTask] = useState("");

  const storeTodoList = async () => {
    const fetchedData = await fetchTodos();
    setTodos(fetchedData);
  };

  useEffect(() => {
    storeTodoList();
  }, []);

  console.log(todos);

  return (
    <div className="w-3/4 h-screen flex flex-col justify-center items-center">
      {/* Task Type Box */}
      <div className="w-full h-[150px] flex flex-col gap-10 justify-center items-center border-2 rounded">
        {/* Task Type Input */}
        <input
          type="text"
          className="w-1/2 min-w-[500px] h-[40px] font-bold text-lg text-black rounded px-2 outline-none bg-gray-600 focus:bg-white transition duration-300 ease-in-out"
          onChange={(event) => {
            setTask(event.currentTarget.value);
          }}
        />
        {/* Task POST Button */}
        <button
          type="button"
          onClick={() => {
            addTodos(task);
            storeTodoList();
          }}
          className="w-1/3 h-[40px] border-2 rounded hover:bg-gray-600 transition ease-in-out"
        >
          POST TODOS
        </button>
      </div>

      <h2 className="text-2xl font-bold">List Table</h2>
      {/* TodoList Table Box */}
      <div className="p-10 flex justify-center items-center border-2 border-gray-600 rounded-lg">
        <table className="table-auto">
          <thead>
            <tr className="border">
              <th className="border-r">Task</th>
              <th className="border-r">Completed</th>
              <th>Success?</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((el) => {
              return (
                <tr key={el.id} className="border">
                  <td className="border-r">{el.task}</td>
                  <td className="border-r">
                    {!el.completed ? "No" : "Success"}
                  </td>
                  <td>
                    <button>Yes</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
