import data from '@/app/api/db/workouts.json';

export const dynamic = 'force-static'

export async function GET(request: Request) {
  const workoutDuration = Object.values(data).reduce((acc, workout) => acc + workout.duration, 0);

  return new Response(JSON.stringify({ workoutDuration }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
