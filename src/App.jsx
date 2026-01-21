import React from 'react';
import { ChatProvider } from './context';
import ChatInterface from './components/ChatInterface';
import './styles/index.css';

function App() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}

export default App;
