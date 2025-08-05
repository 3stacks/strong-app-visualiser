import data from '@/app/api/db/workouts.json';

export const dynamic = 'force-static'

export async function GET(request: Request) {
  const workoutCount = Object.keys(data).length;

  return new Response(JSON.stringify({ workoutCount }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
