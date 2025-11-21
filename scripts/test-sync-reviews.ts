import { join, delimiter } from 'path';
import Module from 'module';

async function run() {
  process.env.NODE_PATH = [join(__dirname, '../src'), process.env.NODE_PATH ?? '']
    .filter(Boolean)
    .join(delimiter);

  (Module as unknown as { _initPaths: () => void })._initPaths();

  const { GET } = await import('../src/app/api/sync-reviews/route');

  const response = await GET();
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

