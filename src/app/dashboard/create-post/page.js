'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../firebase.js';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const router = useRouter();

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    try {
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData({ ...formData, image: downloadURL });
          setImageUploadProgress(null);
          setImageUploadError(null);
        }
      );
    } catch (err) {
      setImageUploadError('Upload failed');
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userMongoId: user.publicMetadata.userMongoId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || 'Failed to publish');
        return;
      }

      setPublishError(null);
      router.push(`/post/${data.slug}`);
    } catch (err) {
      setPublishError('Something went wrong');
    }
  };

  if (!isLoaded) return null;

  if (!isSignedIn || !user.publicMetadata.isAdmin) {
    return (
      <h1 className="text-center text-3xl font-semibold mt-10 text-red-600">
        You are not authorized to view this page
      </h1>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-8">Create a Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Title"
            required
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <select
            className="flex-1 px-4 py-2 border rounded-md"
            defaultValue="uncategorized"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized" disabled>
              Select a category
            </option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-dashed border-teal-400 p-4 rounded-md">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="flex-1"
          />

          <button
            type="button"
            onClick={handleUploadImage}
            disabled={!!imageUploadProgress}
            className="px-4 py-2 border border-purple-500 text-purple-600 rounded-md hover:bg-purple-50 disabled:opacity-50"
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>

        {imageUploadError && (
          <p className="text-red-600 text-sm">{imageUploadError}</p>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded"
            className="w-full h-72 object-cover rounded-md"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write your post content..."
          className="h-72 mb-4"
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
        />

        {publishError && (
          <p className="text-red-600 text-sm text-center">{publishError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-md hover:opacity-90 transition duration-200 font-semibold"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
