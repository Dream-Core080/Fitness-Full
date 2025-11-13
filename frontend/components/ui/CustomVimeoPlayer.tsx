import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/vimeo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop, faRedo } from "@fortawesome/free-solid-svg-icons";

interface Props {
  videoUrl: string;
}

export default function CustomVimeoPlayer({ videoUrl }: Props) {
  const playerRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Toggle play/pause
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  // Stop the video (pause and reset progress)
  const handleStop = () => {
    setPlaying(false);
    setPlayed(0);
    playerRef.current.seekTo(0);
  };

  // Replay the video (start from 0)
  const handleReplay = () => {
    setPlaying(true);
    setPlayed(0);
    playerRef.current.seekTo(0);
  };

  // Update progress as video plays
  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  // Seek to new time when user drags slider
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef.current.seekTo(played);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  return (
    <div 
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Player */}
      <div className="relative w-full h-[39rem]">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="100%"
          playing={playing}
          controls={false} // Hide default Vimeo controls
          onProgress={handleProgress}
        />

        {/* Overlay Controls - Only show when hovered */}
        {showControls && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 transition-opacity duration-300">
            
            {/* Progress Bar */}
            <input
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="w-4/5 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer mb-4"
            />

            {/* Control Buttons */}
            <div className="flex space-x-6">
              {/* Play/Pause */}
              <button onClick={handlePlayPause} className="p-2 w-[2.5em] h-[2.5em] bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition">
                <FontAwesomeIcon icon={playing ? faPause : faPlay} className="text-white text-2xl" />
              </button>

              {/* Stop */}
              <button onClick={handleStop} className="p-2 w-[2.5em] h-[2.5em] bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition">
                <FontAwesomeIcon icon={faStop} className="text-white text-2xl" />
              </button>

              {/* Replay */}
              <button onClick={handleReplay} className="p-2 w-[2.5em] h-[2.5em] bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition">
                <FontAwesomeIcon icon={faRedo} className="text-white text-2xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}