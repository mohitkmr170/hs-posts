import { Button } from "@/components/ui/button";

export default function Header(props) {
  return (
    <header className="w-full bg-background border-b px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">HS-POSTS</h1>
        <nav className="flex space-x-2">
          <Button
            variant={!props.likedPosts ? "default" : "secondary"}
            onClick={() => props.onTabClick(false)}
          >
            All Posts
          </Button>
          <Button
            variant={!props.likedPosts ? "secondary" : "default"}
            onClick={() => props.onTabClick(true)}
          >
            Liked Posts
          </Button>
        </nav>
      </div>
    </header>
  );
}
