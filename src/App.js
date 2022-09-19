import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Weblayout from './component/Weblayout/Weblayout';
import Category from './container/Category';
import Products from './container/Products/Products';
import { configureStore } from './Redux/Store';

function App() {

  const store = configureStore();

  return (
    <div className="App">
      <Provider store={store}>
        <Weblayout>
          <Switch>
            <Route path='/products' exact component={Products} />
            <Route path='/category' exact component={Category} />
          </Switch>
        </Weblayout>
      </Provider>
    </div>
  );
}

export default App;
