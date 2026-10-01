import { useState } from 'react'
import type { TaskItem, PriorityLevel } from '../../types/controlFlow.ts'
import { Icon } from '../common/Icon.tsx'

interface ControlFlowPlaygroundProps {
  tasks: TaskItem[]
  filteredTasks: TaskItem[]
  filterPriority: PriorityLevel | 'all'
  searchQuery: string
  showCompletedOnly: boolean
  onPriorityChange: (p: PriorityLevel | 'all') => void
  onSearchChange: (q: string) => void
  onToggleCompletedOnly: (val: boolean) => void
  onToggleTask: (id: string) => void
  onAddTask: (title: string, priority: PriorityLevel) => void
  onRemoveTask: (id: string) => void
  onClearAll: () => void
  onResetDefault: () => void
}

const PRIORITIES: { id: PriorityLevel | 'all'; label: string }[] = [
  { id: 'all', label: 'All Priorities' },
  { id: 'critical', label: 'Critical' },
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' },
]

export function ControlFlowPlayground({
  tasks,
  filteredTasks,
  filterPriority,
  searchQuery,
  showCompletedOnly,
  onPriorityChange,
  onSearchChange,
  onToggleCompletedOnly,
  onToggleTask,
  onAddTask,
  onRemoveTask,
  onClearAll,
  onResetDefault,
}: ControlFlowPlaygroundProps) {
  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState<PriorityLevel>('medium')

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    onAddTask(newTitle.trim(), newPriority)
    setNewTitle('')
  }

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="controlflow-playground-card">
      {/* Filter and Search Controls */}
      <div className="controls-bar-row">
        <div className="priority-tabs-group" role="group" aria-label="Filter tasks by priority">
          {PRIORITIES.map((p) => {
            const isActive = filterPriority === p.id
            return (
              <button
                key={p.id}
                type="button"
                className={`tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => onPriorityChange(p.id)}
              >
                {p.label}
              </button>
            )
          })}
        </div>

        <div className="search-filter-inline">
          <input
            type="text"
            className="text-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <label className="checkbox-label-inline">
            <input
              type="checkbox"
              checked={showCompletedOnly}
              onChange={(e) => onToggleCompletedOnly(e.target.checked)}
            />
            <span>Completed only ({completedCount})</span>
          </label>
        </div>
      </div>

      {/* Add Task Input Form */}
      <form onSubmit={handleAddSubmit} className="add-task-form">
        <input
          type="text"
          className="text-input"
          placeholder="Add a new engineering migration task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          aria-label="New task title"
        />
        <select
          className="select-input"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value as PriorityLevel)}
          aria-label="Select priority"
        >
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="counter-btn" disabled={!newTitle.trim()}>
          + Add
        </button>
      </form>

      {/* Control Flow Items List with Iteration Indicators */}
      <div className="tasks-display-container">
        <div className="tasks-meta-header">
          <span className="count-label">
            Displaying <strong>{filteredTasks.length}</strong> of <strong>{tasks.length}</strong> items
          </span>
          <div className="bulk-actions">
            <button type="button" className="action-link-btn" onClick={onClearAll}>
              Clear All (@empty test)
            </button>
            <span className="divider-dot">•</span>
            <button type="button" className="action-link-btn" onClick={onResetDefault}>
              Reset Default
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-tasks-box">
            <Icon name="tray" size={32} color="var(--text)" />
            <h4>No tasks match the active criteria.</h4>
            <p>
              In Angular, this displays via the <code>@empty</code> block inside <code>@for</code>. In React, this evaluates through conditional JSX ternary <code>items.length === 0 ? &lt;Empty /&gt; : items.map(...)</code>.
            </p>
          </div>
        ) : (
          <div className="tasks-list">
            {filteredTasks.map((task, idx) => {
              const isFirst = idx === 0
              const isLast = idx === filteredTasks.length - 1
              const isOdd = idx % 2 !== 0

              return (
                <div
                  key={task.id}
                  className={`task-row-item priority-${task.priority} ${task.completed ? 'task-completed' : ''} ${isOdd ? 'row-odd' : 'row-even'}`}
                >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTask(task.id)}
                      aria-label={`Toggle completion for ${task.title}`}
                    />
                    <span className="checkmark" />
                  </label>

                  <div className="task-content-col">
                    <span className="task-title-text">{task.title}</span>
                    <div className="contextual-variables-row">
                      <span className="var-chip" title="Angular $index / React map index">
                        $index: {idx}
                      </span>
                      <span className="var-chip" title="Angular $count / React length">
                        $count: {filteredTasks.length}
                      </span>
                      {isFirst && <span className="var-chip first-chip">$first: true</span>}
                      {isLast && <span className="var-chip last-chip">$last: true</span>}
                      <span className="priority-pill">{task.priority}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemoveTask(task.id)}
                    title="Delete item"
                    aria-label={`Delete task ${task.title}`}
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
