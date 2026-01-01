import React from 'react';
import { Link } from 'react-router-dom';


const AcademicArea = () => {
  const papers = [
    {
      id: 'participatory-consciousness-spectrum',
      title: 'Participatory Consciousness Spectrum',
      subtitle: 'Exploring the Continuum of Conscious Experience',
      description: 'A comprehensive exploration of consciousness as a participatory phenomenon, examining the spectrum from individual to collective awareness.',
      date: 'December 2025',
      readTime: '45 min read',
      tags: ['Consciousness', 'Participatory', 'Spectrum', 'Research'],
      path: '/papers/participatory-consciousness-spectrum'
    },
    {
      id: 'human-coherence-attenuation-practice',
      title: 'Human Coherence Attenuation Practice',
      subtitle: 'A Methodological Framework for Consciousness Research',
      description: 'Detailed methodology for investigating coherence patterns in human consciousness and their attenuation effects on surrounding systems.',
      date: 'December 2025',
      readTime: '30 min read',
      tags: ['Methodology', 'Coherence', 'Attenuation', 'Practice'],
      path: '/papers/human-coherence-attenuation-practice'
    },
    {
      id: 'biological-consciousness',
      title: 'Biological Consciousness',
      subtitle: 'The Emergence of Awareness in Living Systems',
      description: 'An exploration of consciousness emergence in biological systems, examining the relationship between neural complexity and conscious experience.',
      date: 'December 2025',
      readTime: '35 min read',
      tags: ['Biology', 'Neuroscience', 'Emergence', 'Awareness'],
      path: '/papers/biological-consciousness'
    },
    {
      id: 'observer-effect',
      title: 'The Observer Effect in Consciousness Research',
      subtitle: 'Methodological Considerations and Implications',
      description: 'Critical examination of how observation affects consciousness phenomena and the methodological implications for research design.',
      date: 'December 2025',
      readTime: '25 min read',
      tags: ['Methodology', 'Observer Effect', 'Research Design', 'Validation'],
      path: '/papers/observer-effect'
    }
  ];

  return (
    <>
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-purple-400">psychology</span>
              <h1 className="text-xl font-bold glow-text">Consciousness Research</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold border border-white/30 transition-colors"
              >
                <span className="material-symbols-outlined mr-2">home</span>
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        {/* Header Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Academic Area for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Exploratory Papers
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A professional hub for exploratory research that seeks validation and verification
                without claiming definitive answers. Personal research with academic rigor,
                exploring new discoveries at the frontier of consciousness understanding.
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/20">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Exploratory Research
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/20">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Academic Rigor
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/20">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Consciousness Research
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {papers.map((paper, index) => (
              <Link
                key={paper.id}
                to={paper.path}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-lg text-gray-400 mb-4">{paper.subtitle}</p>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {paper.description}
                    </p>
                  </div>
                  <div className="ml-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{paper.date}</div>
                    <div className="text-sm text-gray-500">{paper.readTime}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contribute to the Exploration</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Have exploratory research that seeks validation? We welcome contributions that
                advance our understanding of consciousness through rigorous, open-minded investigation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors">
                  Submit Research
                </button>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold border border-white/30 transition-colors">
                  Research Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicArea;
