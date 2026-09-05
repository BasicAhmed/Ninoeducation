import { SchoolForm } from "@/components/SchoolForm";

export default function NewSchoolPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">إضافة مدرسة طيران</h1>
      <div className="mt-8 max-w-2xl">
        <SchoolForm />
      </div>
    </div>
  );
}
