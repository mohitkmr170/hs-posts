import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchPosts } from "@/hooks/usePosts";
import { useUser } from "@clerk/clerk-react";
import Posts from "./posts";

export default function AuthLoading() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded)
    return (
      <>
        <Head>
          <title>Authenticating...</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
          <Card className="w-full max-w-sm p-6 rounded-2xl shadow-md text-center">
            <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <h2 className="text-lg font-medium">
                Checking authentication...
              </h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we verify your session.
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  if (!isSignedIn) return null;
  else return <Posts />;
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", 10],
    queryFn: () => fetchPosts(10),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
