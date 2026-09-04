export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
