import React from 'react';
import styles from '../styles/TaskFlow.module.css';

export default function StatsPanel({ tasks }) {
  const total = tasks.length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const highPriorityCount = tasks.filter((t) => t.priority === 'high' && t.status !== 'done').length;
  const completionRate = Math.round((doneCount / total) * 100);

  return (
    <section className={styles.statsSection} aria-label="Статистика проєкту">
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Усього задач</span>
          <strong className={styles.statValue}>{total}</strong>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>До виконання</span>
          <strong className={styles.statValue}>{todoCount}</strong>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>В роботі</span>
          <strong className={styles.statValue}>{inProgressCount}</strong>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Виконано</span>
          <strong className={styles.statValue}>{doneCount}</strong>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Критичні (High)</span>
          <strong className={styles.statValueDanger}>{highPriorityCount}</strong>
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <span>Загальний прогрес виконання MVP</span>
          <strong>{completionRate}%</strong>
        </div>
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </section>
  );
}
