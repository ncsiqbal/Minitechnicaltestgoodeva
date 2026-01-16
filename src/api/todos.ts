export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const headers = {
  'Content-Type': 'application/json',
  'x-user-id': 'demo-user',
};

export async function fetchTodos(search?: string): Promise<Todo[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${BASE_URL}/api/todos${query}`, { headers });
  if (!res.ok) throw new Error('Fetch failed');
  return res.json();
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/api/todos`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function toggleTodo(id: number): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: 'PATCH',
    headers,
  });
  if (!res.ok) throw new Error('Toggle failed');
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error('Delete failed');
}


