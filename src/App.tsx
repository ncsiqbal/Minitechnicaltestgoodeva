import { useEffect, useState } from 'react';
import { fetchTodos, toggleTodo } from './api/todos';
import type { Todo } from './api/todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  fetchTodos()
    .then(setTodos)
    .catch((err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    })
    .finally(() => setLoading(false));
}, []);


  const handleToggle = async (id: number) => {
    try {
      const updatedTodo = await toggleTodo(id);

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updatedTodo : t)),
      );
    } catch (e) {
      alert('Failed to toggle todo');
      console.error(e);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Todo List</h1>

      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((t, idx) => (
            <tr key={t.id}>
              <td>{idx + 1}</td>
              <td>{t.title}</td>
              <td>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggle(t.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
