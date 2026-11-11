// Standalone entry only. Tokens are imported here and never in mount.js,
// so that when the shell loads this remote its own tokens stay authoritative.
import './styles/tokens.css';
import { mount } from './mount';

mount(document.getElementById('app'));
