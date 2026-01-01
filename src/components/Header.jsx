import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    // Helper to determine if we are in a tool page
    const isToolPath = location.pathname.includes('/tools/') ||
        ['/subconscious-journal-interpreter', '/subconscious-journal-interpreter2', '/conflict-interpreter', '/decision-clarifier', '/pattern-spotter', '/anxiety-unpacker', '/relationship-conflict-interpreter', '/dream-interpreter'].includes(location.pathname);

    // Function to get tool name from path
    const getToolName = () => {
        const path = location.pathname;
        if (path.includes('RelationshipConflictInterpreter') || path.includes('relationship-conflict-interpreter')) return 'Relationship Conflict Interpreter';
        if (path.includes('ConflictInterpreter') || path.includes('conflict-interpreter')) return 'Conflict Interpreter';
        if (path.includes('PatternSpotter') || path.includes('pattern-spotter')) return 'Pattern Spotter';
        if (path.includes('AnxietyUnpacker') || path.includes('anxiety-unpacker')) return 'Anxiety Unpacker';
        if (path.includes('DecisionClarifier') || path.includes('decision-clarifier')) return 'Decision Clarifier';
        if (path.includes('DreamInterpreter') || path.includes('dream-interpreter')) return 'Dream Interpreter';
        if (path.includes('SubconsciousJournalInterpreter') || path.includes('subconscious-journal-interpreter')) return 'Subconscious Journal Interpreter';
        return '';
    };

    const toolName = getToolName();

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-purple-400">psychology</span>
                            <h1 className="text-xl font-bold glow-text">Noosphere Nexus</h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {toolName && (
                            <div className="text-white/70 text-sm border-r border-white/10 pr-4 mr-2">
                                {toolName}
                            </div>
                        )}

                        <a href="https://acidgreenservers.github.io/Noosphere-Nexus/" target="_blank" rel="noopener noreferrer" className="md-button-orange text-xs">Nexus</a>

                        <Link to="/" className="md-button text-xs">Home</Link>

                        {location.pathname === '/' ? (
                            <a href="#tools" className="md-button text-xs">Tools</a>
                        ) : (
                            <Link to="/#tools" className="md-button text-xs">Tools</Link>
                        )}
                    </div>

                    {/* Mobile Navigation (simplified) */}
                    <div className="md:hidden flex items-center space-x-2">
                        <Link to="/" className="md-button-secondary text-sm px-3">Home</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
