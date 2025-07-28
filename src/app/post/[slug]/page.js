import RecentPosts from '../../../components/RecentPosts';
import Link from 'next/link';

export default async function PostPage({ params }) {
  let post = null;

  try {
    const result = await fetch(process.env.URL + '/api/post/get', {
      method: 'POST',
      body: JSON.stringify({ slug: params.slug }),
      cache: 'no-store',
    });
    const data = await result.json();
    post = data.posts[0];
  } catch (error) {
    post = { title: 'Failed to load post' };
  }

  if (!post || post.title === 'Failed to load post') {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>

      <Link
        href={`/search?category=${post.category}`}
        className="self-center mt-5"
      >
        <span className="inline-block bg-gray-200 text-gray-800 text-xs font-medium px-4 py-1 rounded-full hover:bg-gray-300 transition">
          {post.category}
        </span>
      </Link>

      <img
        src={post.image}
        alt={post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover rounded"
      />

      <div className="flex justify-between p-3 border-b border-gray-400 mx-auto w-full max-w-2xl text-xs text-gray-600">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content prose prose-slate dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>

     

      <div className="mt-10">
        <RecentPosts limit={3} />
      </div>
    </main>
  );
}
