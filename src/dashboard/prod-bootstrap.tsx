import React from 'react';
import { createRoot } from 'react-dom/client';
import { Prod } from './Prod';

const root = createRoot(document.getElementById('root')!);
root.render(<Prod />);
