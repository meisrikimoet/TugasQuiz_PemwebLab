
import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Mengerjakan Tugas Pemrograman',
      description: 'Menyelesaikan tugas React JS.',
      status: 'Belum Selesai',
      priority: 'Tinggi',
      deadline: '2026-11-15'
    },
    {
      id: 2,
      title: 'Belajar Database',
      description: 'Mempelajari materi SQL dan Subquery.',
      status: 'Selesai',
      priority: 'Sedang',
      deadline: '2026-11-12'
    },
    {
      id: 3,
      title: 'Membaca Buku',
      description: 'Membaca buku selama 30 menit.',
      status: 'Belum Selesai',
      priority: 'Rendah',
      deadline: '2026-11-18'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Belum Selesai',
    priority: 'Sedang',
    deadline: ''
  });

  const formatDate = (date) => {
    if (!date) return '-';

    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      status: 'Belum Selesai',
      priority: 'Sedang',
      deadline: ''
    });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = () => {
    setForm({
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
      priority: selectedTask.priority,
      deadline: selectedTask.deadline
    });

    setEditingId(selectedTask.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingId
          ? { ...task, ...form }
          : task
      );

      setTasks(updatedTasks);
      setSelectedTask({ ...selectedTask, ...form });
    } else {
      const newTask = {
        id: Date.now(),
        ...form
      };

      setTasks([...tasks, newTask]);
    }

    closeModal();
  };

  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm(
      'Apakah kamu yakin ingin menghapus tugas ini?'
    );

    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== id));

      if (selectedTask && selectedTask.id === id) {
        setSelectedTask(null);
      }
    }
  };

  return (
    <div className="app-container">
      {selectedTask ? (
        <>
          <header className="header">
            <div>
              <h1>Detail Todo</h1>
              <p>Informasi lengkap tugas kamu.</p>
            </div>
          </header>

          <main className="main-content">
            <div className="detail-card">
              <h2>{selectedTask.title}</h2>
              <p><strong>Deskripsi:</strong> {selectedTask.description}</p>
              <p><strong>Status:</strong> {selectedTask.status}</p>
              <p><strong>Prioritas:</strong> {selectedTask.priority}</p>
              <p><strong>Deadline:</strong> {formatDate(selectedTask.deadline)}</p>

              <div className="detail-buttons">
                <button
                  className="btn-cancel"
                  onClick={() => setSelectedTask(null)}
                >
                  Kembali
                </button>

                <button
                  className="btn-update"
                  onClick={openEditModal}
                >
                  Update
                </button>
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <header className="header">
            <div>
              <h1>My To-Do List</h1>
              <p>Kelola tugas dan aktivitas harianmu.</p>
            </div>

            <button className="btn-add" onClick={openAddModal}>
              + Tambah Todo
            </button>
          </header>

          <main className="main-content">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Status</th>
                    <th>Prioritas</th>
                    <th>Deadline</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.status}</td>
                        <td>{task.priority}</td>
                        <td>{formatDate(task.deadline)}</td>
                        <td>
                          <button
                            className="btn-detail"
                            onClick={() => setSelectedTask(task)}
                          >
                            Detail
                          </button>

                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center' }}>
                        Belum ada tugas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingId !== null ? 'Update Todo' : 'Tambah Todo'}</h2>

            <form onSubmit={handleSubmit}>
              <label>Judul</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Masukkan judul tugas"
                required
              />

              <label>Deskripsi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi tugas"
                required
              />

              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Belum Selesai</option>
                <option>Selesai</option>
              </select>

              <label>Prioritas</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option>Rendah</option>
                <option>Sedang</option>
                <option>Tinggi</option>
              </select>

              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
              />

              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Batal
                </button>

                <button type="submit" className="btn-submit">
                  {editingId !== null ? 'Update' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
