export async function GET(request: Request) {
  console.log(request.json())
  return new Response('Hello, Next.js!')
}
