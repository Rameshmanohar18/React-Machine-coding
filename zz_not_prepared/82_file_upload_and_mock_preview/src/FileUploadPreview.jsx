import { useState } from 'react';

function FileUploadPreview() {
  const [files, setFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    const newFiles = selectedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending' // pending, uploading, completed
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  // Mock upload simulation
  const handleUpload = (fileId) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId ? { ...f, status: 'uploading' } : f
      )
    );

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      setFiles(prev => 
        prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId ? { ...f, status: 'completed' } : f
          )
        );
      }
    }, 200);
  };

  // Remove file
  const handleRemove = (fileId) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  return (
    <div className="container">
      <h1>File Upload Preview</h1>

      {/* File Input */}
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          id="fileInput"
          className="file-input"
        />
        <label htmlFor="fileInput" className="file-label">
          Choose Images
        </label>
      </div>

      {/* Preview Grid */}
      {files.length > 0 && (
        <div className="preview-grid">
          {files.map(fileData => (
            <div key={fileData.id} className="preview-card">
              {/* Image Preview */}
              <img 
                src={fileData.preview} 
                alt={fileData.file.name}
                className="preview-image"
              />

              {/* File Info */}
              <div className="file-info">
                <p className="file-name">{fileData.file.name}</p>
                <p className="file-size">
                  {(fileData.file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              {/* Progress Bar (show when uploading) */}
              {fileData.status === 'uploading' && (
                <div className="progress-container">
                  <div 
                    className="progress-bar"
                    style={{ width: `${fileData.progress}%` }}
                  />
                  <span className="progress-text">{fileData.progress}%</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="actions">
                {fileData.status === 'pending' && (
                  <button 
                    onClick={() => handleUpload(fileData.id)}
                    className="btn btn-upload"
                  >
                    Upload
                  </button>
                )}
                
                {fileData.status === 'completed' && (
                  <span className="status-completed">✓ Uploaded</span>
                )}

                <button 
                  onClick={() => handleRemove(fileData.id)}
                  className="btn btn-remove"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUploadPreview;