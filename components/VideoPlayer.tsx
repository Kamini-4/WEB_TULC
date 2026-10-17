import React, { useState } from 'react';

interface VideoPlayerProps {
  videoId?: string;
  videoUrl?: string;
  aspectRatio?: 'video' | 'portrait';
  title?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoId,
  videoUrl,
  aspectRatio = 'video', 
  title = 'Video Player',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract Drive ID if present
  const getDriveId = (url: string) => {
    const match = url.match(/(?:id=|\/d\/|file\/d\/)([\w-]{25,})/);
    return match ? match[1] : null;
  };

  const driveId = videoUrl ? getDriveId(videoUrl) : null;
  const aspectClass = aspectRatio === 'portrait' ? 'aspect-[9/16] min-h-[400px] sm:min-h-0' : 'aspect-video';

  const renderActiveVideo = () => {
    // Handle Google Drive specifically
    if (driveId) {
      return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <iframe
            src={`https://drive.google.com/file/d/${driveId}/preview?autoplay=1`}
            width="100%"
            height="100%"
            allow="autoplay; encrypted-media"
            className="absolute w-full h-[calc(100%+120px)] -top-[60px] left-0 contrast-[1.02] brightness-[1.02]"
            style={{ 
              imageRendering: '-webkit-optimize-contrast',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              border: 'none'
            }}
          ></iframe>
        </div>
      );
    }

    // Handle YouTube
    if (videoId) {
      return (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&vq=hd1080&iv_load_policy=3&hd=1&autohide=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full contrast-[1.01] brightness-[1.01]"
          style={{ 
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        ></iframe>
      );
    }

    // Fallback direct raw video URL
    if (videoUrl) {
      return (
        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover contrast-[1.01] brightness-[1.01]"
          style={{ 
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />
      );
    }

    return null;
  };

  return (
    <div className={`relative w-full ${aspectClass} bg-zinc-950 shadow-2xl overflow-hidden ${className} transform-gpu`}>
      {isPlaying ? (
        // Play State: Render direct, interactive video/iframe element with zero overlay interference
        <div className="absolute inset-0 z-10">
          {renderActiveVideo()}
        </div>
      ) : (
        // Poster / Standby State: Premium, elegant, high-contrast poster card matching the brand
        <div 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 z-20 flex flex-col justify-between p-6 cursor-pointer bg-[#111111] border border-zinc-800 hover:border-[#b8860b]/50 group transition-all duration-500"
        >
          {/* Subtle noise grid or ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/80 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-radial-gradient from-[#b8860b]/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

          {/* Top Badge Info */}
          <div className="relative z-10 flex justify-between items-center w-full">
            <span className="text-[8px] sm:text-[9px] font-black text-[#b8860b] uppercase bg-black/60 px-2.5 py-1 border border-[#b8860b]/30">
              HIGH FIDELITY BROADCAST
            </span>
            {!videoUrl && (
              <span className="text-[7px] sm:text-[8px] font-mono text-zinc-500 uppercase ">
                STATUS: VALIDATED SECURE
              </span>
            )}
          </div>

          {/* Center Play Circle */}
          <div className="relative z-10 flex flex-col items-center justify-center self-center my-auto transition-transform duration-500 group-hover:scale-105">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#b8860b] text-white rounded-full flex items-center justify-center shadow-2xl border border-white/15 group-hover:bg-[#d49f1c] group-hover:shadow-[#b8860b]/30 transition-all duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-[#b8860b] text-[9px] sm:text-[10px] font-black uppercase mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
              INITIATE SYSTEM BRIEFING
            </span>
          </div>

          {/* Bottom Title Info */}
          <div className="relative z-10 w-full text-left">
            <h4 className="text-white text-base sm:text-lg font-bold font-serif mb-1 group-hover:text-[#b8860b] transition-colors">
              {title}
            </h4>
            <p className="text-zinc-500 text-[8px] sm:text-[9px] font-mono uppercase ">
              THE UNBOUNDED LEADERSHIP CO. • EXECUTIVE SANCTUARY
            </p>
          </div>
        </div>
      )}

      {/* Direct Bypass Access Button */}
      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 z-30 flex items-center gap-2 px-3 py-1.5 bg-black/90 hover:bg-[#b8860b] hover:text-black border border-zinc-800 hover:border-[#b8860b] text-white text-[8px] sm:text-[9px] font-black uppercase transition-all shadow-xl rounded-sm group/btn"
          title="Bypass iframe restriction: Open video directly on Google Drive"
        >
          <span>Direct Broadcast</span>
          <svg 
            className="w-2.5 h-2.5 fill-none stroke-current stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
    </div>
  );
};

export default VideoPlayer;
