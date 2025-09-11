import { useEffect, useState } from "react";
import "./App.css";
import { getpost, deletepost, addpost, updatepost } from "./axios/API";

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    completed: false
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // ✅ Fetch all todos
  const getpostdata = async () => {
    setLoading(true);
    try {
      const response = await getpost();
      console.log(response.data);
      setData(response.data.slice(0, 10)); // limit for demo
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete todo
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await deletepost(id);
      if (res.status === 200) {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setDeleting(null);
    }
  };

  // ✅ Add or Update todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        // update existing todo
        const res = await updatepost(editingId, formData);
        if (res.status === 200) {
          const updatedData = data.map((item) =>
            item.id === editingId ? res.data : item
          );
          setData(updatedData);
          setEditingId(null);
        }
      } else {
        // add new todo
        const res = await addpost(formData);
        if (res.status === 201) {
          setData([...data, res.data]);
        }
      }

      // reset form
      setFormData({
        title: "",
        completed: false
      });
    } catch (error) {
      console.error("Error submitting todo:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Edit todo
  const handleEdit = (id) => {
    const editdata = data.find((item) => item.id === id);
    setFormData({
      title: editdata.title,
      completed: editdata.completed
    });
    setEditingId(id);
  };

  useEffect(() => {
    getpostdata();
  }, []);

  return (
    <div className="app-container">
      <h1>Todos CRUD with Axios</h1>

      <section>
        <form onSubmit={handleSubmit} className={submitting ? "loading" : ""}>
          <input
            type="text"
            placeholder="Enter todo title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            disabled={submitting}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={formData.completed}
              onChange={(e) =>
                setFormData({ ...formData, completed: e.target.checked })
              }
              disabled={submitting}
            />
            Completed
          </label>
          <button type="submit" disabled={submitting || !formData.title.trim()}>
            {submitting ? (
              <>
                <span className="spinner"></span>
                {editingId ? "UPDATING..." : "ADDING..."}
              </>
            ) : (
              editingId ? "UPDATE" : "ADD"
            )}
          </button>
        </form>
      </section>

      <section className="table-section">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading todos...</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="fade-in">
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    <span className={item.completed ? "status-done" : "status-pending"}>
                      {item.completed ? "✅ Done" : "❌ Pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="action-button edit-button"
                      disabled={submitting || deleting === item.id}
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="action-button delete-button"
                      disabled={submitting || deleting === item.id}
                    >
                      {deleting === item.id ? (
                        <>
                          <span className="spinner"></span>
                          DELETING...
                        </>
                      ) : (
                        "DELETE"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;