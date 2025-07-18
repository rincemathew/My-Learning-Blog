"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function CreatePostPage() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn && user.publicMetadata?.isAdmin) {
    return (
      <div className="p-4 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-3xl font-semibold text-center my-6">
          Create a Post
        </h1>

        <form className="flex flex-col gap-6">
          {/* Title + Category */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              id="title"
              placeholder="Title"
              required
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="flex items-center justify-between gap-4 p-4 border-4 border-dotted border-teal-500 rounded-md">
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-600"
            />
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-md hover:opacity-90 transition"
            >
              Upload Image
            </button>
          </div>

          {/* Rich Text Editor */}
          <div className="h-72">
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="h-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto self-end px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Publish
          </button>
        </form>
      </div>
    );
  } else {
    return <div>You are not authorized to create a post.</div>;
  }
}
