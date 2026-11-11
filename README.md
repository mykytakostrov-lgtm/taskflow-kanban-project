# TaskFlow — Веб-застосунок для керування навчальними та командними проєктами

**TaskFlow** — це сучасний клієнтський веб-застосунок (SPA) у форматі Kanban-дошки та трекера завдань, розроблений у межах курсу «Web-технології та Web-дизайн» (Практичні роботи №4 та №5).

## 1. Обраний технологічний стек
- **Фреймворк:** React 18.3 (Функціональні компоненти, Hooks API, React Router DOM v6)
- **Інструмент збірки (Bundler):** Vite 5.4 (ESBuild + Rollup, миттєвий HMR)
- **Стилізація:** CSS Modules (`*.module.css`) + CSS Custom Properties (змінні)
- **Контроль якості коду (Лінтери та форматери):**
  - **ESLint 9 (Flat Config)** — статичний аналіз JavaScript та JSX коду
  - **Stylelint 16** — перевірка стандартів каскадних таблиць стилів CSS
  - **Prettier 3** — автоматичне форматування коду за єдиним стандартом команди

## 2. Архітектура директорій проєкту
```text
taskflow-kanban-project/
├── public/                 # Статичні публічні ресурси
├── src/
│   ├── components/         # Перевикористовувані UI-компоненти (KanbanBoard, TaskCard, TaskModal, FilterBar, StatsPanel)
│   ├── services/           # Бізнес-логіка та робота зі сховищем (TaskService.js)
│   ├── styles/             # Глобальні змінні теми та модульні стилі (TaskFlow.module.css)
│   ├── App.jsx             # Головний кореневий компонент
│   └── main.jsx            # Точка входу застосунку
├── .gitignore              # Виключення службових файлів з Git
├── .prettierrc             # Конфігурація форматера Prettier
├── .stylelintrc.json       # Конфігурація лінтера стилів Stylelint
├── eslint.config.js        # Конфігурація лінтера ESLint
├── package.json            # Залежності та скрипти автоматизації
└── README.md               # Документація проєкту
```

## 3. Команди запуску та перевірки
```bash
# Встановлення залежностей
npm install

# Запуск локального сервера розробки (http://localhost:5173)
npm run dev

# Перевірка коду лінтерами ESLint та Stylelint
npm run lint
npm run lint:css

# Автоматичне форматування коду через Prettier
npm run format

# Продакшн-збірка проєкту у директорію dist/
npm run build
```

## 4. Правила командної роботи у Git (Git Workflow)
- `main` — стабільна захищена гілка для релізів та здачі лабораторних робіт.
- `develop` — інтеграційна гілка для злиття протестованого функціоналу.
- `feature/<author>-<task-slug>` — робочі гілки окремих розробників (наприклад, `feature/lead-project-setup`, `feature/dev1-kanban-board`, `feature/dev2-storage-filters`).
- Всі зміни потрапляють у `develop` та `main` виключно через **Pull Request** після успішного проходження `npm run lint`, `npm run lint:css` та самоперевірки (Self-Review; проєкт виконано індивідуально студентом Костровим М. Б., група КС-32).
