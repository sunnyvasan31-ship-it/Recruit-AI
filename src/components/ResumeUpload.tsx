import { useState, useCallback } from 'react';
import { useDropzone, Accept, FileRejection } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

interface ResumeUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function ResumeUpload({ files, onFilesChange }: ResumeUploadProps) {

          const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesChange([...files, ...acceptedFiles]);
  }, [files, onFilesChange]);

    const accept: Accept = {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
  };

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    }
  } as any); // Using 'as any' to bypass the persistent linting issue

    const removeFile = (fileToRemove: File) => {
    onFilesChange(files.filter(file => file !== fileToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Upload Resumes</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center space-y-2 cursor-pointer transition-colors ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}>
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 mx-auto text-gray-400" />
        <p className="text-gray-500">Drag & drop files here</p>
        <p className="text-xs text-gray-400">or</p>
        <button type="button" className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50">
          Browse Files
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {files.map((file, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
            <div className="flex items-center">
              <FileIcon className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-sm text-gray-700">{file.name}</span>
            </div>
            <button onClick={() => removeFile(file)} className="p-1 rounded-full hover:bg-gray-200">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
