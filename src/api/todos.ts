export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/api/todos`, {
    headers: {
      'x-user-id': 'demo-user',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }

  return res.json();
}

export async function toggleTodo(id: number): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'x-user-id': 'demo-user',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to toggle todo');
  }

  return res.json();
}