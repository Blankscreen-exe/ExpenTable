import React, { useState } from "react";
import { useLocalStorage } from "../../customHooks";
import appConstants from "../../appConstants";

function Form() {
  const [tableData, setTableData] = useLocalStorage(
    appConstants.localStorageKey,
    []
  );

  // Ensure tableData is always an array
  const safeTableData = Array.isArray(tableData) ? tableData : [];

  const [newTask, setNewTask] = useState({
    title: "",
    priority: 0,
    done: false,
    days: {},
  });

  const handleDayChange = (day) => {
    setNewTask((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: prev.days[day]
          ? null
          : {
              title: "todo",
              allottedTime: 3,
            },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const taskWithId = {
      ...newTask,
      id: `id${Date.now()}`,
    };

    setTableData((prev) => {
      const prevData = Array.isArray(prev) ? prev : [];
      return [...prevData, taskWithId];
    });

    setNewTask({
      title: "",
      priority: 0,
      done: false,
      days: {},
    });
  };

  const handleDelete = (taskId) => {
    setTableData((prev) => {
      const prevData = Array.isArray(prev) ? prev : [];
      return prevData.filter((task) => task.id !== taskId);
    });
  };

  return (
    <div className="container p-4">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <form onSubmit={handleSubmit} className="box">
            <h2 className="title is-4 mb-4">Add New Task</h2>

            <div className="field">
              <label className="label">Task Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter task title"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Days</label>
              <div className="control">
                <div className="buttons">
                  {appConstants.days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`button ${
                        newTask.days[day] ? "is-primary" : ""
                      }`}
                      onClick={() => handleDayChange(day)}
                    >
                      {day.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button type="submit" className="button is-primary">
                  Add Task
                </button>
              </div>
            </div>
          </form>

          {safeTableData.length > 0 && (
            <div className="box mt-5">
              <h2 className="title is-4 mb-4">Existing Tasks</h2>
              <div className="table-container">
                <table className="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Days</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeTableData.map((task) => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>
                          {Object.keys(task.days).map((day) => (
                            <span key={day} className="tag is-info mr-1">
                              {day}
                            </span>
                          ))}
                        </td>
                        <td>
                          <button
                            className="button is-danger is-small"
                            onClick={() => handleDelete(task.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
