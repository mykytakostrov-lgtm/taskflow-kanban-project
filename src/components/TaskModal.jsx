import React, { useState } from 'react';
import styles from '../styles/TaskFlow.module.css';

export default function TaskModal({ initialData, onClose, onSubmit }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || 'todo');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [assignee, setAssignee] = useState(
    initialData?.assignee || 'Костров Микита (Lead / Core)'
  );
  const [tag, setTag] = useState(initialData?.tag || 'Розробка');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '2026-04-20');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim().length < 3) {
      setError('Назва задачі повинна містити щонайменше 3 символи.');
      return;
    }
    onSubmit({
      title,
      description,
      status,
      priority,
      assignee,
      tag,
      dueDate,
    });
  };

  return (
    <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
      <div className={styles.modalWindow}>
        <header className={styles.modalHeader}>
          <h2>{initialData ? 'Редагувати задачу' : 'Створити нову задачу'}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {error && <p className={styles.formError}>{error}</p>}

          <label className={styles.formLabel}>
            Назва задачі *
            <input
              type="text"
              className={styles.formInput}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="Наприклад: Інтегрувати модульні стилі..."
              required
            />
          </label>

          <label className={styles.formLabel}>
            Детальний опис
            <textarea
              className={styles.formTextarea}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Критерії виконання або примітки..."
            />
          </label>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Статус
              <select
                className={styles.formInput}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="todo">До виконання (To Do)</option>
                <option value="in_progress">В роботі (In Progress)</option>
                <option value="done">Виконано (Done)</option>
              </select>
            </label>

            <label className={styles.formLabel}>
              Пріоритет
              <select
                className={styles.formInput}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">Високий (High)</option>
                <option value="medium">Середній (Medium)</option>
                <option value="low">Низький (Low)</option>
              </select>
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>
              Виконавець
              <input
                type="text"
                className={styles.formInput}
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
            </label>

            <label className={styles.formLabel}>
              Категорія (Тег)
              <input
                type="text"
                className={styles.formInput}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </label>
          </div>

          <label className={styles.formLabel}>
            Дедлайн
            <input
              type="date"
              className={styles.formInput}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>

          <footer className={styles.modalFooter}>
            <button
              type="button"
              className={styles.modalSecondaryBtn}
              onClick={onClose}
            >
              Скасувати
            </button>
            <button type="submit" className={styles.primaryBtn}>
              {initialData ? 'Зберегти зміни' : 'Створити задачу'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
