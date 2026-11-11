import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './Dashboard';
import './styles/dashboard.css';

// Same contract as the Vue and Angular remotes: mount(el) / unmount().
let root = null;

export function mount(el) {
  root = createRoot(el);
  root.render(<Dashboard />);
}

export function unmount() {
  root?.unmount();
  root = null;
}
