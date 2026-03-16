
import React, { useState, useEffect } from 'react';
import { SovereignDB, LeadEntry, AssessmentEntry, BlogEntry } from '../lib/database.ts';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [data, setData] = useState<{leads: LeadEntry[], assessments: AssessmentEntry[], blog: BlogEntry[]}>({ leads: [], assessments: [], blog: [] });
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'registry'>('leads');
  const [newPost, setNewPost] = useState({ category: '', title: '', excerpt: '', content: '' });

  useEffect(() => {
    const unsubLeads = SovereignDB.subscribeToLeads((leads) => {
      setData(prev => ({ ...prev, leads }));
    });
    const unsubAssessments = SovereignDB.subscribeToAssessments((assessments) => {
      setData(prev => ({ ...prev, assessments }));
    });
    const unsubBlog = SovereignDB.subscribeToBlog((blog) => {
      setData(prev => ({ ...prev, blog }));
    });

    return () => {
      unsubLeads();
      unsubAssessments();
      unsubBlog();
    };
  }, []);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    
    SovereignDB.saveBlogPost({
      category: newPost.category || 'General',
      date: `Q${Math.floor(Math.random() * 4) + 1} ${new Date().getFullYear()}`,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content.split('\n\n')
    });
    
    setNewPost({ category: '', title: '', excerpt: '', content: '' });
    alert("Dispatch successfully archived in the Registry.");
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you certain you wish to purge this dispatch?")) {
      SovereignDB.deleteBlogPost(id);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("ARCHIVE PERMANENTLY: Are you certain you wish to purge the Sovereign Ledger? (This feature is currently restricted for data integrity)")) {
      // SovereignDB.clearAll();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#f5f5f0] overflow-y-auto font-inter">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-zinc-200 px-8 py-6 flex justify-between items-center z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-[#111111]">SOVEREIGN DASHBOARD</span>
            <span className="text-[9px] font-black text-[#b8860b] uppercase tracking-[0.3em]">Institutional Lead Management v1.0</span>
          </div>
          <div className="h-8 w-px bg-zinc-200" />
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 ${activeTab === 'leads' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              Leads
            </button>
            <button 
              onClick={() => setActiveTab('registry')}
              className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 ${activeTab === 'registry' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              Registry
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 ${activeTab === 'analytics' ? 'text-[#b8860b] border-b-2 border-[#b8860b]' : 'text-zinc-400'}`}
            >
              Telemetry
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => SovereignDB.exportToCSV()}
            className="px-6 py-2 border border-zinc-300 text-[10px] font-bold uppercase hover:bg-zinc-100 transition-all tracking-widest"
          >
            Export CSV
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#111111] text-white text-[10px] font-bold uppercase hover:bg-black transition-all tracking-widest"
          >
            Exit Terminal
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {activeTab === 'leads' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Leads" value={data.leads.length.toString()} />
              <StatCard label="Completed Calibrations" value={data.assessments.length.toString()} />
              <StatCard label="System Resonance" value="98.2%" />
            </div>

            <div className="bg-white border border-zinc-200 shadow-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Inquiry Date</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Identity</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Organization</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Yield Target / Message</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Calibration Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {data.leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 italic font-light">
                        No Sovereign Entries Detected.
                      </td>
                    </tr>
                  ) : (
                    data.leads.map((lead) => {
                      const assessment = data.assessments.find(a => a.email.toLowerCase() === lead.email.toLowerCase());
                      return (
                        <tr key={lead.id} className="hover:bg-zinc-50 transition-colors group">
                          <td className="px-6 py-6 text-xs text-zinc-500 font-mono">
                            {new Date(lead.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-[#111111]">{lead.name}</span>
                              <span className="text-[10px] text-zinc-400 font-mono">{lead.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-xs font-bold uppercase tracking-tight text-[#111111]">
                            {lead.organization}
                          </td>
                          <td className="px-6 py-6">
                            <p className="text-xs text-zinc-600 italic line-clamp-2 max-w-xs">{lead.message}</p>
                          </td>
                          <td className="px-6 py-6">
                            {assessment ? (
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-[10px] font-bold text-[#111111] uppercase tracking-widest">{assessment.score}</span>
                              </div>
                            ) : (
                              <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest italic">Pending</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleDeleteAll}
                className="text-[9px] font-black text-red-700 uppercase tracking-widest hover:underline"
              >
                Clear Ledger History
              </button>
            </div>
          </div>
        )}

        {activeTab === 'registry' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white border border-zinc-200 p-8 shadow-xl sticky top-32">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b border-zinc-100 pb-4">New Dispatch</h3>
                <form onSubmit={handleAddPost} className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest block mb-2">Category</label>
                    <input 
                      type="text" 
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b]"
                      placeholder="e.g. Succession Architecture"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest block mb-2">Title</label>
                    <input 
                      type="text" 
                      required
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b]"
                      placeholder="The Future of..."
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest block mb-2">Excerpt</label>
                    <textarea 
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] h-20"
                      placeholder="Brief summary..."
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest block mb-2">Content (Double line break for new paragraph)</label>
                    <textarea 
                      required
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] h-64 font-mono"
                      placeholder="Elaborative content here..."
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                  >
                    Archive Dispatch
                  </button>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">Active Registry Entries</h3>
              {data.blog.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-zinc-200 text-center text-zinc-400 italic">
                  No dispatches found in the registry.
                </div>
              ) : (
                <div className="space-y-4">
                  {data.blog.map((post) => (
                    <div key={post.id} className="bg-white border border-zinc-200 p-6 flex justify-between items-center group">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[8px] font-black text-[#b8860b] uppercase tracking-widest">{post.category}</span>
                          <span className="text-[8px] text-zinc-400 font-mono">{post.id}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#111111]">{post.title}</h4>
                      </div>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 text-zinc-300 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-20 text-center border-2 border-dashed border-zinc-200">
             <h3 className="text-zinc-300 font-black uppercase tracking-[0.5em]">Analytics Engine Idle</h3>
             <p className="text-zinc-400 text-sm italic mt-4">Telemetry requires a minimum of 10 samples for resonance profiling.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-white border border-zinc-200 p-8 shadow-sm">
    <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-[0.3em] block mb-2">{label}</span>
    <span className="text-4xl font-bold text-[#111111]">{value}</span>
  </div>
);

export default AdminDashboard;
