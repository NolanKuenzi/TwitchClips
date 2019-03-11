/* Integration Testing  */
/* eslint-disable */
import React from 'react';
import { render, cleanup, wait, fireEvent } from 'react-testing-library';
import regeneratorRuntime, { async } from 'regenerator-runtime'; /* eslint-disable-line */
import Main from './main';
import { Provider } from '../store/index';

jest.mock('axios');

afterEach(cleanup);

function RenderComponent() {
  return render(
    <Provider>
      <Main />
    </Provider>,
  );
}

describe('<Main /> component', () => {
  console.error = jest.fn(); /* eslint-disable-line */
  /* Using this until there is a simpler work-around for testing async/await
     without triggering the new `act` warning */
  it('Clicking on a game in the <TwitchGames /> component updates the data in the <TwitchVideo /> component', async () => {
    const { getByTestId, getByText } = RenderComponent();
    await wait(() => {
      const dropDownWrapper = getByTestId('dropDownWrapper');
      fireEvent.click(dropDownWrapper);
      const selectGame0 = getByText('2. Apex Legends');
      fireEvent.click(selectGame0);
      const currentGame = getByTestId('currentGame');
      const newClipButton = getByTestId('newClipButton');
      expect(currentGame.textContent).toContain('Apex Legends');
      expect(newClipButton.textContent).toContain('Apex Legends');
      const selectGame1 = getByText('1. Fortnite');
      fireEvent.click(selectGame1);
      expect(currentGame.textContent).toContain('Fortnite');
      expect(newClipButton.textContent).toContain('Fortnite');
    });
  });
});
