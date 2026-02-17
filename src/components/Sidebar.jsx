import React from 'react';
import { FiPlus, FiMessageSquare, FiSettings } from 'react-icons/fi';
import { useChat } from '../context';

const Sidebar = () => {
    const { clearChat } = useChat();

    return (
        <aside className="w-64 h-full hidden md:flex flex-col glass border-r-0 z-10" style={{ borderRight: '1px solid var(--border-subtle)' }}>
            {/* Header */}
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                    style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Lumina
                </h1>
                <p className="text-sm text-gray-400 mt-1" style={{ color: 'var(--text-secondary)' }}>Personal AI Guide</p>
            </div>

            {/* New Chat Button */}
            <div className="px-4 mb-6">
                <button
                    onClick={clearChat}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        background: 'var(--accent-primary)',
                        color: 'white',
                        boxShadow: '0 4px 12px var(--accent-glow)'
                    }}
                >
                    <FiPlus size={20} />
                    <span className="font-medium">New Chat</span>
                </button>
            </div>

            {/* Navigation / History Placeholder */}
            <div className="flex-1 overflow-y-auto px-2">
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Recents
                </div>
                {/* Placeholder for history items */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-1 hover:bg-white/5"
                    style={{ color: 'var(--text-primary)' }}>
                    <FiMessageSquare size={18} style={{ color: 'var(--text-secondary)' }} />
                    <span className="truncate text-sm">Welcome to naresh</span>
                </button>
            </div>

            {/* Footer */}
            <div className="p-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/5 text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}>
                    <FiSettings size={18} />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
