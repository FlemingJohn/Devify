
import React from 'react';
import { Send, QrCode } from 'lucide-react';
import { DEVELOPER_INFO } from '../constants';

const ContactPass: React.FC = () => {
    return (
        <div className="max-w-md mx-auto relative group">
            {/* Lanyard Mockup */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-24 bg-[#1DB954] rounded-t-full opacity-20 group-hover:opacity-40 transition-opacity z-0" />

            <div className="relative bg-[#f0f0f0] text-black rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(29,185,84,0.3)] border-t-[12px] border-[#1DB954]">
                {/* Pass Header */}
                <div className="bg-[#1DB954] text-black px-6 py-4 flex justify-between items-center">
                    <span className="font-black italic uppercase tracking-tighter text-xl underline decoration-4">VIP BACKSTAGE</span>
                    <span className="text-[10px] font-black border-2 border-black px-2 py-0.5 rounded">2024 ACCESS</span>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex items-start gap-6">
                        <img src={DEVELOPER_INFO.profileImage} className="w-24 h-24 rounded shadow-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Avatar" />
                        <div className="flex-1">
                            <h3 className="font-black text-2xl leading-none mb-1">{DEVELOPER_INFO.name.toUpperCase()}</h3>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{DEVELOPER_INFO.role}</p>
                            <div className="mt-4 p-2 bg-white rounded border border-gray-200">
                                <QrCode size={40} className="text-black opacity-80" />
                            </div>
                        </div>
                    </div>

                    <form className="space-y-4 pt-4 border-t-2 border-dashed border-gray-300">
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Pass Issued To</label>
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                className="w-full bg-white border-b-2 border-gray-200 py-2 px-1 text-sm font-bold focus:border-[#1DB954] outline-none transition-colors placeholder:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Message Frequency (Query)</label>
                            <textarea
                                rows={3}
                                placeholder="TELL ME SOMETHING..."
                                className="w-full bg-white border-b-2 border-gray-200 py-2 px-1 text-sm font-bold focus:border-[#1DB954] outline-none transition-colors placeholder:text-gray-300 resize-none"
                            />
                        </div>
                        <button className="w-full bg-black text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1DB954] hover:text-black transition-all group/btn">
                            <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            SEND TRANSMISSION
                        </button>
                    </form>
                </div>

                {/* Pass Footer */}
                <div className="bg-[#e0e0e0] px-8 py-3 text-center border-t border-gray-300">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-500 italic">authorized personnel only // devify systems</span>
                </div>
            </div>
        </div>
    );
};

export default ContactPass;
