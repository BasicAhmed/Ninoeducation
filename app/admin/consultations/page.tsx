import { db } from "@/db/client";
import { consultationBookings } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ConsultationBookingsList } from "@/components/ConsultationBookingsList";

export default async function AdminConsultationsPage() {
  const rows = await db.select().from(consultationBookings).orderBy(desc(consultationBookings.createdAt));
  return <ConsultationBookingsList bookings={rows} />;
}
