import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full h-[400px] sm:w-[430px] border border-teal-500 hover:border-2 overflow-hidden rounded-lg transition-all">
      <Link href={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full object-cover transition-all duration-300 group-hover:h-[200px]"
        />
      </Link>

      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm text-gray-600">{post.category}</span>
      </div>

      <Link
        href={`/post/${post.slug}`}
        className="absolute bottom-[-200px] left-0 right-0 z-10 m-2 rounded-md !rounded-tl-none border border-teal-500 bg-white text-center text-teal-500 transition-all duration-300 py-2 group-hover:bottom-0 hover:bg-teal-500 hover:text-white"
      >
        Read article
      </Link>
    </div>
  );
}
