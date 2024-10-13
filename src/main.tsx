import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import FullPageScroll from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FullPageScroll />
  </StrictMode>
);
