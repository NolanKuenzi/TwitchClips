import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';

const App = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('app'),
);
