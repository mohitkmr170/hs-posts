import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Header(props) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);
  return (
    <header className="w-full bg-background border-b px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hi, {user?.fullName}</h1>
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
        <SignOutButton>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </header>
  );
}
