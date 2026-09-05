import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Reuses the same cookie check as the rest of /admin — this endpoint
  // must never be callable by a random visitor, both for cost control
  // and because it's an unauthenticated write surface otherwise.
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { name } = await req.json().catch(() => ({ name: "" }));
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "الاسم مطلوب" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "لم يتم إعداد خدمة البحث بعد (ANTHROPIC_API_KEY غير مضبوط في Vercel)" },
      { status: 500 }
    );
  }

  const prompt = `ابحث عن مدرسة تدريب الطيران التالية في جنوب أفريقيا: "${name}".

أعطني النتيجة بصيغة JSON فقط، بدون أي نص قبله أو بعده، وبالضبط بهذا الشكل:
{
  "nameAr": "",
  "nameEn": "",
  "province": "",
  "city": "",
  "airportName": "",
  "airportCode": "",
  "shortDescriptionAr": "",
  "descriptionAr": "",
  "licenses": "",
  "trainingType": "",
  "aircraftFleet": "",
  "websiteUrl": ""
}

تعليمات:
- province و city و airportName بالعربية. مثال province: "غاوتنغ" أو "الكيب الغربية".
- licenses: فقط من هذه القيم مفصولة بفاصلة بدون مسافات: PPL,CPL,IR,ME,ATPL_THEORY
- trainingType: كلمة واحدة فقط: integrated أو modular أو both
- aircraftFleet: أسماء الطائرات بالإنجليزية مفصولة بفاصلة، مثال: Cessna 172,Piper Seneca
- shortDescriptionAr: جملة أو جملتين بأسلوب تسويقي بسيط
- descriptionAr: فقرة إلى فقرتين، معلومات حقيقية فقط
- إذا لم تجد معلومة معينة بثقة، اترك قيمتها فارغة "" — لا تخترع أي حقيقة أو رقم أو رخصة غير مؤكدة
- websiteUrl فارغ إذا لم تجد موقعًا رسميًا واضحًا`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
        tools: [{ type: "web_search_20250305", name: "web_search" }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("lookup-school: Anthropic API error", res.status, text);
      return NextResponse.json({ error: "فشل البحث، حاول مرة أخرى" }, { status: 502 });
    }

    const data = await res.json();
    const textBlocks: string[] = (data.content || [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text);
    const combined = textBlocks.join("\n");

    const match = combined.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({ error: "تعذر فهم نتيجة البحث" }, { status: 502 });
    }

    const parsed = JSON.parse(match[0]);
    return NextResponse.json({ result: parsed });
  } catch (err) {
    console.error("lookup-school failed:", err);
    return NextResponse.json({ error: "حدث خطأ أثناء البحث" }, { status: 500 });
  }
}
