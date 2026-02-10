"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronDown, ChevronUp, SkipBack, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SONG_SRC = "/arun-song.mp3";
const SONG_TITLE = "My Vibe";
const SONG_ARTIST = "Arun Kumar";

function formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    // Audio event handlers
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setDuration(audio.duration);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    // Autoplay on page load (with fallback for browser autoplay policy)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        let cleaned = false;

        const startPlayback = () => {
            if (cleaned) return;
            audio.play().then(() => {
                setIsPlaying(true);
                setIsExpanded(true);
            }).catch(() => { });
            cleanupListeners();
        };

        const cleanupListeners = () => {
            cleaned = true;
            document.removeEventListener('click', startPlayback, true);
            document.removeEventListener('touchstart', startPlayback, true);
            document.removeEventListener('keydown', startPlayback, true);
            document.removeEventListener('scroll', startPlayback, true);
            document.removeEventListener('mousemove', startPlayback, true);
        };

        const addInteractionListeners = () => {
            // capture: true ensures we catch events before any stopPropagation
            document.addEventListener('click', startPlayback, { capture: true, once: false });
            document.addEventListener('touchstart', startPlayback, { capture: true, once: false });
            document.addEventListener('keydown', startPlayback, { capture: true, once: false });
            document.addEventListener('scroll', startPlayback, { capture: true, once: false });
            document.addEventListener('mousemove', startPlayback, { capture: true, once: false });
        };

        const tryAutoplay = () => {
            audio.volume = volume;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                        setIsExpanded(true);
                    })
                    .catch(() => {
                        // Browser blocked autoplay — play on first interaction
                        addInteractionListeners();
                    });
            }
        };

        // Small delay to let the component fully mount
        const timer = setTimeout(tryAutoplay, 800);
        return () => {
            clearTimeout(timer);
            cleanupListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const bar = progressRef.current;
        const audio = audioRef.current;
        if (!bar || !audio) return;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;
        audio.currentTime = ratio * duration;
    }, [duration]);

    const skipForward = useCallback(() => {
        if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }, [duration]);

    const skipBackward = useCallback(() => {
        if (audioRef.current) audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }, []);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <>
            <audio ref={audioRef} src={SONG_SRC} preload="metadata" />

            {/* Floating Music Player */}
            <motion.div
                layout
                className="fixed bottom-6 right-6 z-50"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 1 }}
            >
                <AnimatePresence mode="wait">
                    {isExpanded ? (
                        /* ============ EXPANDED PLAYER ============ */
                        <motion.div
                            key="expanded"
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="w-[340px] rounded-[2rem] overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, rgba(15,12,41,0.95), rgba(48,43,99,0.9), rgba(36,36,62,0.95))",
                                backdropFilter: "blur(24px)",
                                border: "1px solid rgba(99,102,241,0.2)",
                                boxShadow: "0 25px 60px -12px rgba(79,70,229,0.4), 0 0 40px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 pt-5 pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-300/80">
                                        Now Playing
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                                >
                                    <ChevronDown size={18} />
                                </button>
                            </div>

                            {/* Vinyl / Album Art */}
                            <div className="flex justify-center py-6">
                                <div className="relative">
                                    {/* Glow ring */}
                                    <div
                                        className={`absolute inset-0 rounded-full transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                                        style={{
                                            background: "conic-gradient(from 0deg, rgba(99,102,241,0.3), rgba(6,182,212,0.3), rgba(168,85,247,0.3), rgba(99,102,241,0.3))",
                                            filter: "blur(20px)",
                                            transform: "scale(1.15)",
                                        }}
                                    />
                                    {/* Vinyl disc */}
                                    <div
                                        className={`relative w-40 h-40 rounded-full border-2 border-gray-700/50 ${isPlaying ? 'vinyl-spin' : ''}`}
                                        style={{
                                            background: `
                        radial-gradient(circle at center, #1a1a2e 18%, transparent 18.5%),
                        radial-gradient(circle at center, transparent 30%, rgba(99,102,241,0.05) 30.5%, rgba(99,102,241,0.05) 31%, transparent 31.5%),
                        radial-gradient(circle at center, transparent 45%, rgba(99,102,241,0.03) 45.5%, rgba(99,102,241,0.03) 46%, transparent 46.5%),
                        radial-gradient(circle at center, transparent 60%, rgba(99,102,241,0.05) 60.5%, rgba(99,102,241,0.05) 61%, transparent 61.5%),
                        conic-gradient(from 0deg, #111127, #1a1a3e, #0f0f2a, #181838, #111127)
                      `,
                                        }}
                                    >
                                        {/* Center hole */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                                <Music size={18} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Song Info */}
                            <div className="text-center px-6 pb-4">
                                <h3 className="text-lg font-bold text-white tracking-tight">{SONG_TITLE}</h3>
                                <p className="text-sm text-gray-400 mt-0.5">{SONG_ARTIST}</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="px-6 pb-2">
                                <div
                                    ref={progressRef}
                                    onClick={handleProgressClick}
                                    className="group relative h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute left-0 top-0 h-full rounded-full"
                                        style={{
                                            width: `${progress}%`,
                                            background: "linear-gradient(90deg, #6366f1, #06b6d4)",
                                        }}
                                    />
                                    {/* Scrubber thumb */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg shadow-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ left: `calc(${progress}% - 7px)` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-[11px] font-mono text-gray-500">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-5 px-6 pb-6 pt-2">
                                {/* Skip Back */}
                                <button onClick={skipBackward} className="p-2 text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-95">
                                    <SkipBack size={20} />
                                </button>

                                {/* Play/Pause */}
                                <button
                                    onClick={togglePlay}
                                    className="relative p-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                                    style={{
                                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                        boxShadow: isPlaying
                                            ? "0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.2)"
                                            : "0 8px 25px rgba(99,102,241,0.3)",
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        {isPlaying ? (
                                            <motion.div key="pause" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                                                <Pause size={22} className="text-white" fill="white" />
                                            </motion.div>
                                        ) : (
                                            <motion.div key="play" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                                                <Play size={22} className="text-white ml-0.5" fill="white" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>

                                {/* Skip Forward */}
                                <button onClick={skipForward} className="p-2 text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-95">
                                    <SkipForward size={20} />
                                </button>

                                {/* Volume */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        onMouseEnter={() => setShowVolumeSlider(true)}
                                        className="p-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                    </button>

                                    {/* Volume popup */}
                                    <AnimatePresence>
                                        {showVolumeSlider && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                onMouseLeave={() => setShowVolumeSlider(false)}
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-4 rounded-2xl"
                                                style={{
                                                    background: "rgba(15,12,41,0.95)",
                                                    backdropFilter: "blur(16px)",
                                                    border: "1px solid rgba(99,102,241,0.2)",
                                                    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                                                }}
                                            >
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={isMuted ? 0 : volume}
                                                    onChange={(e) => {
                                                        setVolume(parseFloat(e.target.value));
                                                        setIsMuted(false);
                                                    }}
                                                    className="volume-slider"
                                                    style={{
                                                        writingMode: "vertical-lr",
                                                        direction: "rtl",
                                                        width: "6px",
                                                        height: "80px",
                                                        appearance: "none",
                                                        background: "rgba(255,255,255,0.1)",
                                                        borderRadius: "999px",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ============ COLLAPSED MINI PLAYER ============ */
                        <motion.div
                            key="collapsed"
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            onClick={() => setIsExpanded(true)}
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer group hover:scale-105 transition-transform"
                            style={{
                                background: "linear-gradient(135deg, rgba(15,12,41,0.95), rgba(48,43,99,0.9))",
                                backdropFilter: "blur(24px)",
                                border: "1px solid rgba(99,102,241,0.25)",
                                boxShadow: isPlaying
                                    ? "0 12px 40px rgba(79,70,229,0.35), 0 0 20px rgba(99,102,241,0.15)"
                                    : "0 8px 30px rgba(0,0,0,0.3)",
                            }}
                        >
                            {/* Mini vinyl */}
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isPlaying ? 'vinyl-spin' : ''}`}
                                style={{
                                    background: "conic-gradient(from 0deg, #1a1a3e, #2d2b63, #1a1a3e)",
                                    border: "2px solid rgba(99,102,241,0.3)",
                                }}
                            >
                                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <Music size={8} className="text-white" />
                                </div>
                            </div>

                            {/* Song name */}
                            <div className="mr-2">
                                <p className="text-sm font-semibold text-white leading-tight">{SONG_TITLE}</p>
                                <p className="text-[11px] text-gray-400">{SONG_ARTIST}</p>
                            </div>

                            {/* Quick play/pause */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlay();
                                }}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                            >
                                {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} className="ml-0.5" fill="white" />}
                            </button>

                            {/* Expand */}
                            <ChevronUp size={16} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
