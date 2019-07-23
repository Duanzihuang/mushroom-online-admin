export default function ({ store, redirect }) {
  if (!store.getters['user/getToken']) {
    return redirect('/')
  }
}
