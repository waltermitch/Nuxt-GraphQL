import Me from '../graphql/queries/me.query.gql'

export default async function ({ app, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()

  try {
    await app.apolloProvider.defaultClient.query({
      query: Me,
      fetchPolicy: 'no-cache',
    })
  } catch (error) {
    const errorObj = error.graphQLErrors[0]

    if (errorObj != undefined && errorObj.message === 'Unauthenticated.') {
      app.$apolloHelpers.onLogout()
      return redirect('/login')
    }
  }

  if (!hasToken) {
    return redirect('/login')
  }
}
