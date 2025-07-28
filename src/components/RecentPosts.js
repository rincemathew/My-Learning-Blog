import PostCard from './PostCard';

export default async function RecentPosts({ limit }) {
  let posts = null;

  try {
    const result = await fetch(process.env.URL + '/api/post/get', {
      method: 'POST',
      body: JSON.stringify({ limit: limit, order: 'desc' }),
      cache: 'no-store',
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.error('Error getting post:', error);
  }

  return (
    <section className="w-full px-4 mb-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800">
          Recent Articles
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
