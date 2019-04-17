import * as React from 'react';
import Recipes from '../recipes/Recipes';
import MainModal from '../common/MainModal';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Recipes />
        <MainModal />
      </div>
    )
  }
}

export default App;