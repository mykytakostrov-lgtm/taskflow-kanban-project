import React from 'react';
import styles from '../styles/TaskFlow.module.css';

export default function FilterBar({ filters, assignees, onChange }) {
  const handleField = (field, value) => {
    onChange((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    onChange({ searchQuery: '', priority: 'all', assignee: 'all' });
  };

  return (
    <section className={styles.filterBar} aria-label="Панель пошуку та фільтрації">
      <input
        type="search"
        className={styles.searchInput}
        placeholder="Пошук за назвою, описом або тегом..."
        value={filters.searchQuery}
        onChange={(e) => handleField('searchQuery', e.target.value)}
      />

      <select
        className={styles.filterSelect}
        value={filters.priority}
        onChange={(e) => handleField('priority', e.target.value)}
        aria-label="Фільтр за пріоритетом"
      >
        <option value="all">Усі пріоритети</option>
        <option value="high">Високий (High)</option>
        <option value="medium">Середній (Medium)</option>
        <option value="low">Низький (Low)</option>
      </select>

      <select
        className={styles.filterSelect}
        value={filters.assignee}
        onChange={(e) => handleField('assignee', e.target.value)}
        aria-label="Фільтр за виконавцем"
      >
        <option value="all">Усі виконавці</option>
        {assignees.map((person) => (
          <option key={person} value={person}>
            {person}
          </option>
        ))}
      </select>

      <button type="button" className={styles.resetFilterBtn} onClick={handleReset}>
        Скинути фільтри
      </button>
    </section>
  );
}
