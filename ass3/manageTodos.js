export const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
  });
  
  export const getAllTodos = async (limit) => {
    try {
      const res = await axiosInstance.get(`/todos?_limit=${limit}`);
      return res.data || [];
    } catch (error) {
      console.error(error.message);
    }
  };
  
  export const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      return "Task Deleted Successfully";
    } catch (error) {
      console.error(error.message);
    }
  };
  
  export const addTodo = async (task) => {
    try {
      const res = await axiosInstance.post(`/todos`, { title: task });
      return `Task: ${task} added to your ToDo List`;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  export const updateTodo = async (id, oldTask, newTask) => {
    try {
      const res = await axiosInstance.patch(`/todos/${id}`, { title: newTask });
      return `${oldTask} is changed to ${newTask} in your ToDo List`;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  export const deleteAllTodos = async (todos) => {
    try {
      for (const todo of todos) {
        await axiosInstance.delete(`/todos/${todo.id}`);
      }
      return "Your ToDo List is Cleared Successfully";
    } catch (error) {
      console.error(error.message);
    }
  };
  