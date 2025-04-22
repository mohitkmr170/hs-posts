import { useEffect, useState } from "react";
import Head from "next/head";
import Post from "@/components/Post";
import Header from "@/components/Header";
import { usePosts } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { usePostStore } from "@/lib/store/usePostStore";

export default function Posts() {
  const [likedPosts, setLikedPosts] = useState(false);
  const [likedPostList, setLikedPostList] = useState([]);
  const [postCount, setPostCount] = useState(10);
  const { data, isPending, isFetching } = usePosts(postCount);
  const { likedPostIds } = usePostStore();

  useEffect(() => {
    if (!likedPostIds.length) setLikedPostList([]);
    else {
      const tempArr = [];
      likedPostIds.forEach(async (id) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await response.json();
        tempArr.push(data);
        setLikedPostList(tempArr);
      });
    }
  }, [likedPostIds]);

  const onTabClick = (likedPostClicked) => {
    if (likedPostClicked) {
      setLikedPosts(true);
    } else {
      setLikedPosts(false);
    }
  };

  const postList = likedPosts ? likedPostList : data;

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Header
        onTabClick={(likedPostClicked) => onTabClick(likedPostClicked)}
        likedPosts={likedPosts}
      />
      <div className="min-h-screen bg-muted p-6">
        <div className="grid gap-6 max-w-2xl mx-auto">
          {postList &&
            postList.length &&
            postList.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
              />
            ))}
        </div>
        {postCount <= 90 && (
          <div
            className="flex justify-center bg-muted"
            style={{ marginTop: "20px" }}
          >
            <Button
              onClick={() => setPostCount(postCount + 10)}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
