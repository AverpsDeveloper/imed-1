import tcWrap from '@/libs/utils/tcWrap';

export const POST = tcWrap(async (req, res) => {
  const blobParams = await (await req.blob()).text();
  console.log(`blobParams`, blobParams);
  const urlParams = new URLSearchParams(blobParams);
  const params = Object.fromEntries(urlParams);
  console.log("params", params);

  return res.json({ message: 'Received' }, { status: 200 })
})