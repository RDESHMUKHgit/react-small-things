/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiX, FiMusic, FiPlay, FiPause } from 'react-icons/fi';

import WaveSurfer from 'wavesurfer.js';

// DND
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DragDropAudio = () => {
  const [files, setFiles] = useState([]);
  const [activeAudio, setActiveAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  //   const audioRefs = useRef({});
  const waveRefs = useRef({});
  const waveContainerRefs = useRef({});

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,

    onDropAccepted: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  //Initializing the WaveSurfer
  useEffect(() => {
    files.forEach((file) => {
      if (waveRefs.current[file.name] || !waveContainerRefs.current[file.name])
        return;

      const wave = WaveSurfer.create({
        container: waveContainerRefs.current[file.name],
        waveColor: '#e9d5ff',
        progressColor: '#9333ea',
        cursorColor: '#9333ea',
        height: 40,
        barWidth: 2,
        barRadius: 2,
        responsive: true,
      });

      wave.load(file.preview);

      wave.on('play', () =>
        setIsPlaying((prev) => ({ ...prev, [file.name]: true }))
      );

      wave.on('pause', () =>
        setIsPlaying((prev) => ({ ...prev, [file.name]: false }))
      );

      waveRefs.current[file.name] = wave;
    });

    return () => {
      Object.values(waveRefs.current).forEach((wave) => wave.destroy());
      waveRefs.current = {};
    };
  }, [files]);

  //   const togglePlay = (name) => {
  //     const audio = audioRefs.current[name];
  //     if (!audio) return;

  //     if (audio.paused) {
  //       audio.play();
  //       setIsPlaying({ [name]: true });
  //     } else {
  //       audio.pause();
  //       setIsPlaying({ [name]: false });
  //     }
  //   };
  return (
    <section className="max-w-4xl mx-auto mt-10">
      {/* ================= Drop Area ================= */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition
        ${
          isDragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />

        <FiUploadCloud className="text-5xl mx-auto text-purple-500 mb-4" />

        <p className="font-medium text-gray-700">
          Drag & drop audio files here
        </p>
        <p className="text-sm text-gray-500">MP3, WAV, OGG, M4A • Max 10MB</p>
      </div>

      {/* ================= Audio Cards ================= */}
      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              onClick={() => setActiveAudio(file)}
              className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition"
            >
              <FiMusic className="text-purple-500 text-xl mb-2" />

              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              {/* Controls */}
              <div className="flex items-center gap-3 mt-3">
                {/* Play / Pause */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    waveRefs.current[file.name]?.playPause();
                  }}
                  className="p-2 rounded-full bg-purple-100 text-purple-600"
                >
                  {isPlaying[file.name] ? <FiPause /> : <FiPlay />}
                </button>

                {/* Waveform */}
                <div
                  ref={(el) => {
                    if (el) waveContainerRefs.current[file.name] = el;
                  }}
                  className="flex-1 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= Modal ================= */}
      {activeAudio && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
            {/* Close */}
            <button
              onClick={() => setActiveAudio(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FiX />
            </button>

            <h3 className="font-semibold text-gray-800 mb-4 truncate flex justify-between pr-5">
              {activeAudio.name} {'  '}
              <span
                className="
  inline-flex items-center gap-1
  rounded-full
  bg-blue-100 text-blue-700
  px-2.5 py-0.5
  text-xs font-semibold
  ring-1 ring-blue-200
"
              >
                {(activeAudio.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </h3>

            {/* <audio src={activeAudio.preview} controls className="w-full mb-4" /> */}

            {/* Playback Speed */}
            <label className="block text-sm font-medium mb-1">
              Playback Speed
            </label>
            <select
              className="w-full border rounded-lg p-2"
              defaultValue="1"
              onChange={(e) =>
                // (audioRefs.current[activeAudio.name].playbackRate =
                //   e.target.value)
                waveRefs.current[activeAudio.name].setPlaybackRate(
                  e.target.value
                )
              }
            >
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>

            {/* Volume */}
            <label className="block text-sm font-medium mt-4 mb-1">
              Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="1"
              onChange={(e) =>
                // (audioRefs.current[activeAudio.name].volume = e.target.value)
                waveRefs.current[activeAudio.name].setVolume(e.target.value)
              }
              className="w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DragDropAudio;
