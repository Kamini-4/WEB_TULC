import React, { useState } from 'react';
import { Play, ExternalLink, ShieldCheck } from 'lucide-react';

interface VideoPlayerProps {
  videoId?: string;
  videoUrl?: string;
  aspectRatio?: 'video' | 'portrait';
  title?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoId,
  videoUrl,
  aspectRatio = 'video', 
  title = 'Executive Video Briefing',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract Drive ID if present
  const getDriveId = (url: string) => {
    const match = url.match(/(?:id=|\/d\/|file\/d\/)([\w-]{25,})/);
    return match ? match[1] : null;
  };

  const driveId = videoUrl ? getDriveId(videoUrl) : null;
  const aspectClass = aspectRatio === 'portrait' ? 'aspect-[9/16] min-h-[380px] sm:min-h-0' : 'aspect-video';

  const renderActiveVideo = () => {
    // Handle Google Drive embed specifically
    if (driveId) {
      return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <iframe
            src={`https://drive.google.com/file/d/${driveId}/preview?autoplay=1`}
            width="100%"
            height="100%"
            allow="autoplay; encrypted-media"
            className="absolute w-full h-[calc(100%+80px)] -top-[40px] left-0 contrast-[1.02] brightness-[1.02]"
            style={{ border: 'none' }}
            title={title}
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
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
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
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }

    return null;
  };

  return (
    <div className={`relative w-full ${aspectClass} bg-[#141416] rounded-md shadow-xl overflow-hidden ${className}`}>
      {isPlaying ? (
        <div className="absolute inset-0 z-10">
          {renderActiveVideo()}
        </div>
      ) : (
        /* Poster / Standby State — Zero iframe lag upfront for instant page load */
        <div 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-6 cursor-pointer bg-gradient-to-t from-black/90 via-[#141416]/95 to-black/90 border border-[#3e4350] hover:border-[#d4af37] group transition-all duration-300"
        >
          {/* Subtle gold ambient glow */}
          <div className="absolute inset-0 bg-radial-gradient from-[#d4af37]/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between w-full text-xs font-mono">
            <span className="text-[10px] uppercase font-bold text-[#d4af37] bg-[#1c1e24] px-2.5 py-1 rounded-xs border border-[#d4af37]/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
              <span>Executive Briefing Broadcast</span>
            </span>
            <span className="text-[10px] text-stone-400 font-semibold hidden sm:inline">
              Suchita Sancheti
            </span>
          </div>

          {/* Center Play Circle */}
          <div className="relative z-10 flex flex-col items-center justify-center self-center my-auto transition-transform duration-300 group-hover:scale-105">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#d4af37] text-[#141416] rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#e5be48] transition-colors">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
            </div>
            <span className="text-[#d4af37] text-[10px] sm:text-xs font-mono font-bold uppercase mt-3 tracking-wider group-hover:text-white transition-colors">
              Click to Play Briefing
            </span>
          </div>

          {/* Bottom Title Info */}
          <div className="relative z-10 w-full text-left">
            <h4 className="text-white text-sm sm:text-base font-bold font-serif mb-1 group-hover:text-[#d4af37] transition-colors">
              {title}
            </h4>
            <p className="text-stone-400 text-[11px] font-mono">
              The Unbounded Leadership Co. · Sovereign Architecture
            </p>
          </div>
        </div>
      )}

      {/* Direct Bypass Link (e.g. for restricted iframes) */}
      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1 px-2.5 py-1 bg-black/80 hover:bg-[#d4af37] hover:text-[#141416] border border-stone-700 text-stone-200 text-[10px] font-mono uppercase transition-all rounded-xs"
          title="Open video directly in new tab"
        >
          <span>Open Direct</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  );
};

export default VideoPlayer;
