import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePostStore } from "@/lib/store/usePostStore";

type PostProps = {
  title: string;
  body: string;
  id: number;
};

export default function Post({ id, title, body }: PostProps) {
  const { isLiked, likePost, unlikePost } = usePostStore();
  const liked = isLiked(id);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <h2 className="text-xl font-semibold">{title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{body}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant={liked ? "secondary" : "default"}
          onClick={() => (liked ? unlikePost(id) : likePost(id))}
        >
          {liked ? "Unlike" : "Like"}
        </Button>
      </CardFooter>
    </Card>
  );
}
