export function GET() {
  // Frontend process liveness only; not backend/provider readiness.
  return Response.json({ service: 'oneirocycle-frontend', status: 'ok' });
}
