import { getServerAuthSession } from '../auth';

export async function unauthorized() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return {
      status: 401,
      body: {
        message: 'Unauthorized',
      },
    };
  }
}
