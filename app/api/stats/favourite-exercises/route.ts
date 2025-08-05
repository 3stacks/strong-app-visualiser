import data from '@/app/api/db/workouts.json';

export const dynamic = 'force-static'

export async function GET(request: Request) {
  const setsPerformedPerExercise = Object.values(data).reduce((acc, workout) => {
    workout.sets.forEach(set => {
        acc[set.name] = (acc[set.name] || 0) + 1;
    })

    return acc;
  }, {});

  const orderedExercises = Object.entries(setsPerformedPerExercise)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return new Response(JSON.stringify({ orderedExercises }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
