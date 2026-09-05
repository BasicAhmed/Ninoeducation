import { SocialPostForm } from "@/components/SocialPostForm";

export default function NewSocialPostPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">إضافة منشور</h1>
      <div className="mt-8">
        <SocialPostForm />
      </div>
    </div>
  );
}
