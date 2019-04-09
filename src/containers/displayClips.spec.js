/* eslint-disable */
import React from 'react';
import { render, cleanup, wait, fireEvent } from 'react-testing-library';
import regeneratorRuntime, { async } from 'regenerator-runtime'; /* eslint-disable-line */
import TwitchVideos from './displayClips';
import { Provider } from '../store/index';

jest.mock('axios');

afterEach(cleanup);

function RenderComponent() {
  return render(
    <Provider>
      <TwitchVideos />
    </Provider>,
  );
}

describe('<TwitchVideos /> component', () => {
  console.error = jest.fn(); /* eslint-disable-line */
  /* Using this until there is a simpler work-around for testing async/await
  without triggering the new `act` warning */
  it('Displays data from initial state & from axios mock', async () => {
    const { getByTestId } = RenderComponent();
    await wait(() => {
      const newClipButton = getByTestId('newClipButton');
      const clipDataTitle = getByTestId('clipDataTitle');
      const clipDataViews = getByTestId('clipDataViews');
      expect(newClipButton.textContent).toContain('Fortnite');
      expect(clipDataTitle.textContent).toContain('Clip 1');
      expect(clipDataViews.textContent).toBe("Views: 37,058");
    });
  });
  it('Changes clips when NewClipButton is clicked', async () => {
    const { getByTestId } = RenderComponent();
    await wait(() => {
      const newClipButton = getByTestId('newClipButton');
      const clipDataTitle = getByTestId('clipDataTitle');
      expect(clipDataTitle.textContent).toContain('Clip 1');
      const clipDataViews = getByTestId('clipDataViews');
      expect(clipDataViews.textContent).toBe("Views: 37,058");
      fireEvent.click(newClipButton);
      expect(clipDataTitle.textContent).toContain('Clip 2');
      expect(clipDataViews.textContent).toBe("Views: 34,662");
    });
  });
});
