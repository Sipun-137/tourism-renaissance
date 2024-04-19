"use client";
import BlogView from "@/components/Blog/BlogView";
export default function Blogs(data: any) {
  console.log(data);
  return (
    <>
      <div className="min-h-screen m-8">
        <div className="container mx-auto my-8 px-4">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <p className="uppercase font-sans tracking-[5px]">Blog post</p>
          </div>
        </div>
        <div className="container mx-auto my-8 px-4">
          <div className="flex flex-col gap-y-2">
            {data.data &&
              data.data.map((item: any, index: number) => (
                <BlogView key={index} data={item} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
