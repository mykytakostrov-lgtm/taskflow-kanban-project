import React from 'react';
import TaskCard from './TaskCard';
import styles from '../styles/TaskFlow.module.css';

export default function KanbanBoard({
  columns,
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  return (
    <main className={styles.boardColumns}>
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);
        return (
          <section key={column.id} className={styles.columnCard}>
            <header className={styles.columnHeader}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <span className={styles.columnCount}>{columnTasks.length}</span>
            </header>

            <div className={styles.columnBody}>
              {columnTasks.length === 0 ? (
                <p className={styles.emptyColumnText}>Немає задач у цій колонці</p>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onEdit={() => onEdit(task)}
                    onDelete={() => onDelete(task.id)}
                  />
                ))
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
