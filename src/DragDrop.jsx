/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiX } from 'react-icons/fi';

const DragDrop = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: true,
    maxFiles: 4,

    onDropAccepted: (acceptedFiles) => {
      setError('');
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },

    onDropRejected: (rejectedFiles) => {
      const reason = rejectedFiles[0].errors[0].code;
      //       console.log(reason);

      if (reason === 'file-too-large') {
        setError('File size exceeds 2MB limit.');
      } else if (reason === 'file-invalid-type') {
        setError('Only image files are allowed.');
      } else if (reason === 'too-many-files') {
        setError('Only 4 files are allowed');
      } else {
        setError('File upload failed.');
      }
    },
  });

  // Cleanup image previews (important)
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
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
          }
        `}
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

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>
      )}

      {/* Image Preview Grid */}
      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="relative group rounded-xl overflow-hidden shadow-sm"
            >
              <img
                src={file.preview}
                alt={file.name}
                title={file.name}
                className="w-full h-52 object-cover"
              />

              {/* File Info */}
              <div className="p-2 text-xs bg-white">
                <p
                  className="font-medium text-gray-800 truncate"
                  title={file.name}
                >
                  {file.name}
                </p>
                <p className="text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
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
          ))}
        </div>
      )}
    </section>
  );
};

export default DragDrop;
