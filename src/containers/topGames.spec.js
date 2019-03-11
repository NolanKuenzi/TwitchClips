import React from 'react';
import { render, cleanup, wait, fireEvent } from 'react-testing-library';
import regeneratorRuntime, { async } from 'regenerator-runtime'; /* eslint-disable-line */
import TwitchGames from './topGames';
import { Provider } from '../store/index';

jest.mock('axios');

afterEach(cleanup);

function RenderComponent() {
  return render(
    <Provider>
      <TwitchGames />
    </Provider>,
  );
}

describe('<TwitchGames /> component', () => {
  console.error = jest.fn(); /* eslint-disable-line */
  /* Using this until there is a simpler work-around for testing async/await
     without triggering the new `act` warning */
  it('Displays the api data', async () => {
    const { getByTestId } = RenderComponent();
    await wait(() => {
      const dropDownWrapper = getByTestId('dropDownWrapper');
      fireEvent.click(dropDownWrapper);
      const gameList = getByTestId('gameList');
      expect(gameList.textContent).toContain('Apex Legends');
    });
  });
  it('Typing into the input box filters the api data', async () => {
    const { getByTestId } = RenderComponent();
    await wait(() => {
      const dropDownWrapper = getByTestId('dropDownWrapper');
      fireEvent.click(dropDownWrapper);
      const gameList = getByTestId('gameList');
      const inputBox = getByTestId('inputBox');
      expect(gameList.textContent).toContain('Apex Legends');
      fireEvent.change(inputBox, { target: { value: 'Fortnite' } });
      expect(gameList.textContent).not.toContain('Apex Legends');
      fireEvent.change(inputBox, { target: { value: '' } });
      expect(gameList.textContent).toContain('Apex Legends');
      fireEvent.change(inputBox, { target: { value: 'Dota 2' } });
      expect(gameList.textContent).not.toContain('Apex Legends');
      expect(gameList.textContent).not.toContain('Fortnite');
    });
  });
});
