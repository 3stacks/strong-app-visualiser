import data from '../../workouts.json';

export const dynamic = 'force-static'

export async function GET(request: Request) {
  const recentWorkouts = Object.values(data).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  return new Response(JSON.stringify(recentWorkouts), {
    headers: { 'Content-Type': 'application/json' },
  });
}
