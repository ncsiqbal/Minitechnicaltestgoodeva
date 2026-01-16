import { useEffect, useState } from 'react';
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  createTodo,
} from './api/todos';
import type { Todo } from './api/todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [search, setSearch] = useState('');

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [patchingId, setPatchingId] = useState<number | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onAdd = async () => {
    if (!newTitle.trim()) return;
    const created = await createTodo(newTitle);
    setTodos((prev) => [...prev, created]);
    setNewTitle('');
  };

  const onToggle = async (id: number) => {
  try {
    setPatchingId(id);

    const updated = await toggleTodo(id);

    setTodos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );
  } catch (e: any) {
    alert(e.message || 'Failed to update todo');
  } finally {
    setPatchingId(null);
  }
};

  const onDeleteConfirm = async () => {
    if (selectedId === null) return;
    await deleteTodo(selectedId);
    setTodos((prev) => prev.filter((t) => t.id !== selectedId));
    setShowModal(false);
    setSelectedId(null);
  };

  const filteredTodos = todos.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ textAlign: 'center' }}>Todo List</h1>

        {/* ADD */}
        <div style={styles.row}>
          <input
            placeholder="New todo"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={styles.input}
          />
          <button style={styles.primaryBtn} onClick={onAdd}>
            Add
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search todo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...styles.input, marginBottom: 16 }}
        />

        {/* STATE */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* TABLE */}
        {!loading && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Completed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((t, i) => (
                <tr key={t.id}>
                  <td>{i + 1}</td>
                  <td
                    style={{
                      textDecoration: t.completed ? 'line-through' : 'none',
                    }}
                  >
                    {t.title}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                   <input
                    type="checkbox"
                    checked={t.completed}
                    disabled={patchingId === t.id}
                    onChange={() => onToggle(t.id)}
                  />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => {
                        setSelectedId(t.id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTodos.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    No todos found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Delete Todo?</h3>
            <p>Are you sure?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button style={styles.deleteBtn} onClick={onDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#1e1e1e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 520,
    background: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    color: '#fff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
  },
  row: {
    display: 'flex',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: '1px solid #555',
    background: '#1e1e1e',
    color: '#fff',
  },
  primaryBtn: {
    padding: '8px 14px',
    borderRadius: 8,
    border: 'none',
    background: '#5865f2',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteBtn: {
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: 6,
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    width: 300,
    color: '#fff',
  },
};
