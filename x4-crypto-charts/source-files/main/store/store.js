import createStore from '~/common/bootstrap/store'


export default function(widgetType, dataContext) {
  let context = getContext()[widgetType]
  let store = createStore(context.store, dataContext, null)

  if (module.hot) {
    let modules = context.modules.map(path => '.' + path.substr(1))

    module.hot.accept(modules, () => {
      let context = getContext()[widgetType]
      store = createStore(context.store, dataContext, store)
    })
  }

  return store
}


function getContext() {
  return X4WP.STORE
}
