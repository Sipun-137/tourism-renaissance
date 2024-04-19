import Blogs from "@/components/Blog/Blogs";
import { GetAllBlog } from "@/services/Blog";

export default async function Blog() {
  const blogs=await GetAllBlog();
  const blogdata=blogs.data
  console.log(blogdata)
  return (
    <>
      <Blogs data={blogdata}/>
    </>
  );
}
