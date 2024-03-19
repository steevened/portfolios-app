import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/user-avatar";
import { createComment } from "@/lib/actions/comments.actions";
import { getUserAuth } from "@/lib/services";

export default async function CreateCommentSection({
  projectId,
}: {
  projectId: string;
}) {
  const user = await getUserAuth();

  if (!user) return null;

  return (
    <div>
      <form
        action={async (formData) => {
          "use server";
          const content = formData.get("content")?.toString().trim();
          if (!content) return;

          await createComment({
            projectId,
            content,
          });
        }}
        className="flex-1 grid gap-2.5"
      >
        <div className="flex gap-1.5 items-center">
          <UserAvatar user={user} />
          <Textarea name="content" className="w-full" placeholder="Reply" />
        </div>
        <div className="text-end">
          <Button>Post your comment</Button>
        </div>
      </form>
    </div>
  );
}
