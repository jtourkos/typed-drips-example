import { executeDripsReadMethod } from './drips/drips';

(async () => {
  const cycleSecs = await executeDripsReadMethod({
    functionName: 'cycleSecs',
    args: [],
  });

  console.log('cycleSecs:', cycleSecs);
})();
