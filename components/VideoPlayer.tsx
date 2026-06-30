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
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Extract Drive ID if present
  const getDriveId = (url: string) => {
    const match = url.match(/(?:id=|\/d\/|file\/d\/)([\w-]{25,})/);
    return match ? match[1] : null;
  };

  const driveId = videoUrl ? getDriveId(videoUrl) : null;

  // Handle video play when isPlaying changes
  React.useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    }
  }, [isPlaying]);
  
  const aspectClass = aspectRatio === 'portrait' ? 'aspect-[9/16] min-h-[400px] sm:min-h-0' : 'aspect-video';

  const renderVideoContent = () => {
    // Handle Google Drive specifically
    if (driveId) {
      if (!useIframeFallback) {
        return (
          <video
            ref={videoRef}
            src={`https://docs.google.com/uc?export=download&id=${driveId}`}
            controls={isPlaying}
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover contrast-[1.01] brightness-[1.01]"
            style={{ 
              imageRendering: '-webkit-optimize-contrast',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            onError={() => {
              console.warn("Direct Google Drive stream failed, falling back to iframe preview.");
              setUseIframeFallback(true);
            }}
          />
        );
      }

      return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src={`https://drive.google.com/file/d/${driveId}/preview`}
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
          {/* Protective overlay to prevent interaction with Drive UI elements if they peek through */}
          {!isPlaying && <div className="absolute inset-0 z-30 bg-transparent" />}
        </div>
      );
    }

    // Handle Raw Video URL
    if (videoUrl) {
      return (
        <video
          ref={videoRef}
          src={videoUrl}
          controls={isPlaying}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover contrast-[1.01] brightness-[1.01]"
          style={{ 
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />
      );
    }

    // Handle YouTube
    if (videoId) {
      return (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&vq=hd1080&iv_load_policy=3&hd=1&autohide=1${isPlaying ? '&autoplay=1' : ''}`}
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

    return null;
  };

  return (
    <div className={`relative w-full ${aspectClass} bg-black shadow-2xl overflow-hidden ${className} transform-gpu`}>
      {/* Video Content Layer - Always visible to act as thumbnail */}
      <div className="absolute inset-0 z-10">
        {renderVideoContent()}
      </div>

      {/* Fallback & Direct-Access Command Container */}
      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-30 flex items-center gap-2 px-3 py-1.5 bg-black/85 hover:bg-[#b8860b] hover:text-black border border-[#b8860b]/40 hover:border-[#b8860b] text-white text-[9px] font-black uppercase tracking-[0.15em] transition-all shadow-xl rounded-sm group/btn"
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

      {/* Play Button Overlay - Hidden when playing */}
      <div 
        className={`absolute inset-0 z-20 group cursor-pointer overflow-hidden transition-all duration-700 ${isPlaying ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'}`}
        onClick={() => setIsPlaying(true)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#b8860b] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default VideoPlayer;
