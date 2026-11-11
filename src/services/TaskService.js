/**
 * TaskService.js — Сервіс роботи з даними задач та сховищем LocalStorage
 * Практична робота №5 (Розробка MVP «TaskFlow»)
 */

const STORAGE_KEY = 'taskflow_mvp_tasks_v1';

export const COLUMNS = [
  { id: 'todo', title: 'До виконання (To Do)' },
  { id: 'in_progress', title: 'В роботі (In Progress)' },
  { id: 'done', title: 'Виконано (Done)' },
];

export const INITIAL_TASKS = [
  {
    id: 'task-101',
    title: 'Скласти специфікацію вимог PRD для MVP',
    description: 'Описати цільову аудиторію, функціональні вимоги FR-1..FR-8 та User Stories.',
    status: 'done',
    priority: 'high',
    assignee: 'Костров Микита (Lead / Core)',
    tag: 'Документація',
    dueDate: '2026-04-10',
    createdAt: '2026-04-01T09:00:00.000Z',
  },
  {
    id: 'task-102',
    title: 'Реалізувати компоненти KanbanBoard та TaskCard',
    description: 'Створити адаптивну сітку з 3 колонок та картки з бейджами пріоритетів.',
    status: 'done',
    priority: 'high',
    assignee: 'Костров Микита (UI / React)',
    tag: 'UI / React',
    dueDate: '2026-04-12',
    createdAt: '2026-04-02T11:30:00.000Z',
  },
  {
    id: 'task-103',
    title: 'Інтегрувати TaskService з LocalStorage та фільтрами',
    description: 'Забезпечити збереження стану між сесіями та пошук за назвою і пріоритетом.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Костров Микита (Storage / QA)',
    tag: 'Архітектура',
    dueDate: '2026-04-14',
    createdAt: '2026-04-03T14:15:00.000Z',
  },
  {
    id: 'task-104',
    title: 'Додати панель аналітики прогресу StatsPanel',
    description: 'Розрахунок відсотка завершених задач та візуальна шкала прогресу спринту.',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Костров Микита (Storage / QA)',
    tag: 'Аналітика',
    dueDate: '2026-04-15',
    createdAt: '2026-04-04T10:00:00.000Z',
  },
  {
    id: 'task-105',
    title: 'Провести перехресне QA-тестування та підготувати демо',
    description: 'Перевірити всі User Stories, виправити знайдені баги валідації форми.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Костров Микита (Lead / Core)',
    tag: 'QA Тестування',
    dueDate: '2026-04-18',
    createdAt: '2026-04-05T16:00:00.000Z',
  },
];

export const TaskService = {
  loadTasks() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.saveTasks(INITIAL_TASKS);
        return INITIAL_TASKS;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TASKS;
    } catch (error) {
      console.error('Помилка читання LocalStorage:', error);
      return INITIAL_TASKS;
    }
  },

  saveTasks(tasks) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Помилка запису в LocalStorage:', error);
    }
  },

  createTask(tasks, payload) {
    const newTask = {
      id: `task-${Date.now()}`,
      title: payload.title.trim(),
      description: payload.description.trim(),
      status: payload.status || 'todo',
      priority: payload.priority || 'medium',
      assignee: payload.assignee || 'Не призначено',
      tag: payload.tag?.trim() || 'Загальне',
      dueDate: payload.dueDate || '2026-04-20',
      createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    this.saveTasks(updated);
    return updated;
  },

  updateTask(tasks, taskId, changes) {
    const updated = tasks.map((item) =>
      item.id === taskId ? { ...item, ...changes } : item
    );
    this.saveTasks(updated);
    return updated;
  },

  deleteTask(tasks, taskId) {
    const updated = tasks.filter((item) => item.id !== taskId);
    this.saveTasks(updated);
    return updated;
  },

  resetToDemo() {
    this.saveTasks(INITIAL_TASKS);
    return INITIAL_TASKS;
  },
};
