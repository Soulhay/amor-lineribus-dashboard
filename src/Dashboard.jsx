import React from 'react';

/**
 * Learner dashboard. Static prototype data: the platform has no sign-in and
 * stores no progress, so the numbers are prepared in advance.
 */
const STATS = [
  { label: 'Day streak', value: '5', unit: 'days' },
  { label: 'XP earned', value: '1,240', unit: 'XP' },
  { label: 'Lessons done', value: '5', unit: 'of 12' },
  { label: 'Time learned', value: '3.5', unit: 'hours' },
];

const WEEK = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 40 },
  { day: 'Wed', minutes: 0 },
  { day: 'Thu', minutes: 30 },
  { day: 'Fri', minutes: 55 },
  { day: 'Sat', minutes: 15 },
  { day: 'Sun', minutes: 45 },
];

const COURSES = [
  { title: 'Intro to React', framework: 'React', progress: 42 },
  { title: 'Angular fundamentals', framework: 'Angular', progress: 0 },
  { title: 'Vue essentials', framework: 'Vue', progress: 0 },
];

export default function Dashboard() {
  const maxMinutes = Math.max(...WEEK.map((d) => d.minutes));

  return (
    <div className="dash">
      <header className="dash__head">
        <p className="dash__eyebrow">Dashboard</p>
        <h1 className="dash__title">Welcome back</h1>
        <p className="dash__lead">Pick up where you left off.</p>
      </header>

      <section className="dash__stats" aria-label="Your stats">
        {STATS.map((s) => (
          <article className="dstat" key={s.label}>
            <p className="dstat__label">{s.label}</p>
            <p className="dstat__value">
              {s.value} <span className="dstat__unit">{s.unit}</span>
            </p>
          </article>
        ))}
      </section>

      <div className="dash__grid">
        <section className="dpanel dresume">
          <p className="dpanel__label">Continue learning</p>
          <h2 className="dresume__title">Lesson 6: Components &amp; props</h2>
          <p className="dresume__meta">Intro to React · about 15 min</p>
          <div className="progressbar" role="progressbar" aria-valuenow={42} aria-valuemin={0} aria-valuemax={100}>
            <span className="progressbar__fill" style={{ width: '42%' }} />
          </div>
          <p className="dresume__pct">42% of the course complete</p>
        </section>

        <section className="dpanel">
          <p className="dpanel__label">This week</p>
          <div className="dweek" role="img" aria-label="Minutes learned per day this week">
            {WEEK.map((d) => (
              <div className="dweek__col" key={d.day}>
                <span
                  className="dweek__bar"
                  style={{ height: (maxMinutes ? (d.minutes / maxMinutes) * 100 : 0) + '%' }}
                />
                <span className="dweek__day">{d.day}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="dpanel">
        <p className="dpanel__label">Your courses</p>
        <ul className="dcourses">
          {COURSES.map((c) => (
            <li className="dcourse" key={c.title}>
              <span className="dcourse__title">{c.title}</span>
              <span className="dcourse__fw">{c.framework}</span>
              <span className="dcourse__pct">{c.progress}%</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
