// Get All Todo Item From Todos Table
const fetchTodos = async () => {
  const response = await fetch("/api/todos");
  const data = response.json();

  return data;
};

// Add One Item of Todo To Todos Table
const addTodos = async (task: string) => {
  if (!task) {
    alert("Please Type Something Todo");
    return;
  }

  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
};

export { fetchTodos, addTodos };
