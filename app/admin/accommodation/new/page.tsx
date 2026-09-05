import { AccommodationForm } from "@/components/AccommodationForm";

export default function NewAccommodationPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">إضافة سكن</h1>
      <div className="mt-8 max-w-2xl">
        <AccommodationForm />
      </div>
    </div>
  );
}
