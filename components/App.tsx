import React from 'react';
import { EventHandler } from '../services/event-handler.service';
import Home from './home';

export default function App() {

  EventHandler.getHandler();

  return (
    <Home />
  );
} 