import  { useState } from 'react';

import useAxios from '../../hook/useAxios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
const axiosSecure =useAxios()
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
event.target.image
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosSecure.post('/upload', event.target.image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name='image' onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
