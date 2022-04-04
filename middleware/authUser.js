export default function ({ redirect, store }) {
  console.log('auth user')
  const role = store.getters['auth/getRole']

  if (role !== 'user') {
    redirect('/login')
  }
}
