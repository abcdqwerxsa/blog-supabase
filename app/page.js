// app/page.js

// 1. 导入正确的、为服务器组件设计的 createClient 函数
// 这个路径是 Next.js Supabase 模板默认生成的
import { createClient } from '@/utils/supabase/server' 
import Link from 'next/link' // 我们需要 Link 来做导航

// 2. 告诉 Next.js 这个页面需要动态渲染，每次访问都获取最新数据
// 这对于部署到 Vercel 后能看到实时更新至关重要
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  
  // 3. 在函数内部创建 Supabase 客户端实例
  // 这是在服务器组件中的标准做法
  const supabase = createClient()
  
  // 4. 数据获取逻辑完全正确！
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*') // 在列表页，通常只需要 id 和 title: .select('id, title')
    .order('created_at', { ascending: false });

  if (error) {
    // 更好的错误处理
    console.error('Error fetching posts:', error);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-red-500">Error loading posts. Please try again later.</p>
      </main>
    );
  }

  // 渲染文章列表
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
        
        {/* 检查是否有文章 */}
        {!posts || posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found yet. Start writing!</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id}>
                {/* 5. 把标题变成一个链接，指向文章详情页 */}
                <Link href={`/posts/${post.id}`} className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h2 className="text-2xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
                  {/* 可以显示创建时间 */}
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
