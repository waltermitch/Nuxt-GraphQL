export default function ({ redirect, route }) {
  route.meta.forEach((meta) => {
    if (meta.redirectTo) {
      redirect(meta.redirectTo)
    }
  })
}
