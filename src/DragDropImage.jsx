/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiX } from 'react-icons/fi';

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

// Sortable Item component
const SortableImage = ({ file, removeFile }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group rounded-xl overflow-hidden shadow-sm cursor-grab"
    >
      <img
        src={file.preview}
        alt={file.name}
        title={file.name}
        className="w-full h-52 object-cover"
      />

      {/* File Info */}
      <div className="p-2 text-xs bg-white">
        <p className="font-medium text-gray-800 truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeFile(file.name);
        }}
        className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
        title="Remove the file"
      >
        <FiX size={14} />
      </button>
    </div>
  );
};

const DragDropImage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: true,
    maxFiles: 4,
    onDropAccepted: (acceptedFiles) => {
      setError('');
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    onDropRejected: (rejectedFiles) => {
      const reason = rejectedFiles[0].errors[0].code;
      if (reason === 'file-too-large') setError('File size exceeds 2MB limit.');
      else if (reason === 'file-invalid-type')
        setError('Only image files are allowed.');
      else if (reason === 'too-many-files')
        setError('Only 4 files are allowed');
      else setError('File upload failed.');
    },
  });

  // Cleanup previews
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) =>
    setFiles((prev) => prev.filter((file) => file.name !== name));

  // DnD Kit Sensors
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.name === active.id);
      const newIndex = files.findIndex((f) => f.name === over.id);
      setFiles((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <section className="max-w-4xl mx-auto mt-10">
      {/* Drop Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="text-5xl mx-auto text-blue-500 mb-4" />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the images here...</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium">Drag & drop images here</p>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG, WEBP • Max 2MB
            </p>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>
      )}

      {/* Image Grid with Drag & Drop */}
      {files.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={files.map((f) => f.name)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {files.map((file) => (
                <SortableImage
                  key={file.name}
                  file={file}
                  removeFile={removeFile}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </section>
  );
};

export default DragDropImage;
