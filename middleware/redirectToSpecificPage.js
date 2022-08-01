export default function ({ redirect, route, store }) {
  console.log(store.state);
  route.meta.forEach((meta) => {
    if (meta.redirectTo) {
      redirect(meta.redirectTo)
    }
  })
}
