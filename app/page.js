// app/page.js

import { supabase } from '../lib/supabaseClient'; // 导入我们创建的 Supabase 客户端

// 将组件定义为 async function
export default async function HomePage() {
  
  // 直接在组件顶部 await 数据获取
  // 这部分代码只会在服务器上运行！
  const { data: posts, error } = await supabase
    .from('posts') // 假设你的表名叫 'posts'
    .select('*')   // 获取所有列
    .order('created_at', { ascending: false }); // 按创建时间降序排序

  // 如果获取数据出错，可以显示错误信息
  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  // 如果没有文章
  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  // 渲染文章列表
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4 p-4 border rounded-lg">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              {/* 如果你还有 content 列，也可以显示 */}
              {/* <p className="mt-2 text-gray-700">{post.content}</p> */}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
