import React, { useState, useMemo } from 'react';
import { TaskService, COLUMNS } from './services/TaskService';
import StatsPanel from './components/StatsPanel';
import FilterBar from './components/FilterBar';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import styles from './styles/TaskFlow.module.css';

export default function App() {
  const [tasks, setTasks] = useState(() => TaskService.loadTasks());
  const [filters, setFilters] = useState({
    searchQuery: '',
    priority: 'all',
    assignee: 'all',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const assignees = useMemo(() => {
    const set = new Set(tasks.map((t) => t.assignee).filter(Boolean));
    return Array.from(set);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesQuery =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tag.toLowerCase().includes(query);

      const matchesPriority =
        filters.priority === 'all' || task.priority === filters.priority;

      const matchesAssignee =
        filters.assignee === 'all' || task.assignee === filters.assignee;

      return matchesQuery && matchesPriority && matchesAssignee;
    });
  }, [tasks, filters]);

  const handleCreateOrUpdate = (formData) => {
    if (editingTask) {
      setTasks((prev) => TaskService.updateTask(prev, editingTask.id, formData));
    } else {
      setTasks((prev) => TaskService.createTask(prev, formData));
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleStatusChange = (taskId, nextStatus) => {
    setTasks((prev) => TaskService.updateTask(prev, taskId, { status: nextStatus }));
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => TaskService.deleteTask(prev, taskId));
  };

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleResetDemo = () => {
    setTasks(TaskService.resetToDemo());
  };

  return (
    <div className={styles.pageLayout}>
      <header className={styles.topHeader}>
        <div>
          <h1 className={styles.brandTitle}>TaskFlow Kanban MVP</h1>
          <p className={styles.brandSubtitle}>
            Система керування навчальними та командними ІТ-проєктами
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleResetDemo}
          >
            Скинути демо-дані
          </button>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={handleOpenCreate}
          >
            + Нова задача
          </button>
        </div>
      </header>

      <StatsPanel tasks={tasks} />

      <FilterBar
        filters={filters}
        assignees={assignees}
        onChange={setFilters}
      />

      <KanbanBoard
        columns={COLUMNS}
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteTask}
      />

      {isModalOpen && (
        <TaskModal
          initialData={editingTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleCreateOrUpdate}
        />
      )}
    </div>
  );
}
