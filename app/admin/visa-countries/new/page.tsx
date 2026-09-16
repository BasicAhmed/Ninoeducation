import { VisaCountryForm } from "@/components/VisaCountryForm";

export default function NewVisaCountryPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">إضافة دولة</h1>
      <div className="mt-8">
        <VisaCountryForm />
      </div>
    </div>
  );
}
