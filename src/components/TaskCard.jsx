import React from 'react';
import styles from '../styles/TaskFlow.module.css';

const PRIORITY_LABELS = {
  high: 'Високий',
  medium: 'Середній',
  low: 'Низький',
};

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const priorityClass =
    task.priority === 'high'
      ? styles.badgeHigh
      : task.priority === 'medium'
      ? styles.badgeMedium
      : styles.badgeLow;

  return (
    <article className={styles.taskCard}>
      <div className={styles.cardTopRow}>
        <span className={`${styles.priorityBadge} ${priorityClass}`}>
          {PRIORITY_LABELS[task.priority] || 'Середній'}
        </span>
        <span className={styles.tagBadge}>{task.tag}</span>
      </div>

      <h3 className={styles.taskTitle}>{task.title}</h3>
      {task.description && (
        <p className={styles.taskDescription}>{task.description}</p>
      )}

      <div className={styles.taskMeta}>
        <span>👤 {task.assignee}</span>
        <span>📅 до {task.dueDate}</span>
      </div>

      <div className={styles.cardActions}>
        <select
          className={styles.statusSelect}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          aria-label="Змінити статус задачі"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onEdit}
            title="Редагувати"
          >
            ✏️
          </button>
          <button
            type="button"
            className={styles.iconBtnDanger}
            onClick={onDelete}
            title="Видалити"
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
}
