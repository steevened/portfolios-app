import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateBio } from "@/lib/actions/user.actions";

export default function BioForm() {
  return (
    <form action={updateBio}>
      <div className="grid gap-5">
        <div className="grid gap-1.5">
          <label htmlFor="bio" className=" block text-muted-foreground">
            <h3>Bio</h3>
          </label>
          <Textarea
            id="bio"
            name="bio"
            rows={5}
            placeholder="Tell us about yourself, your experience, interests, hobbies, skills, etc."
            className="w-full"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
