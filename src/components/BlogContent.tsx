import { getBlogs } from "@/api/blogApi"
import { useEffect } from "react"

const BlogContent = () => {
    useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await getBlogs();
        console.log("En UseEffect");
        console.log(blogs);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
    }, [])

  return (
    <div>
      <h1>Blog</h1>
    </div>
  )
}

export default BlogContent;

