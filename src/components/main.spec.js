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
      const newClipButton = getByTestId('newClipButton');
      expect(newClipButton.textContent).toContain('Apex Legends');
      const selectGame1 = getByText('1. Fortnite');
      fireEvent.click(selectGame1);
      expect(newClipButton.textContent).toContain('Fortnite');
      const clipDataTitle = getByTestId('clipDataTitle');
      expect(clipDataTitle.textContent).toContain('Clip 1');
    });
  });
  it('Clicking the save clip button in the <TwitchVideo /> component saves the clip in the <SavedClips /> component', async () => {
    const { getByTestId, getByText } = RenderComponent();
    await wait(() => {
      const saveClipButton = getByTestId('saveClipButton');
      fireEvent.click(saveClipButton);
      const savedClipsWrapper = getByTestId('savedClipsWrapper');
      fireEvent.click(savedClipsWrapper);
      const savedClipsList = getByTestId('savedClipsList');
      expect(savedClipsList.textContent).toContain('Clip 1')
    });
  });
  it('Clicking the play button in the <SavedClips /> component updates the data in the <TwitchVideo /> component', async () => {
    const { getByTestId } = RenderComponent();
    await wait(() => {
      /* Save first clip */
      const saveClipButton = getByTestId('saveClipButton');
      fireEvent.click(saveClipButton);
      /* Switch to second clip */
      const newClipButton = getByTestId('newClipButton');
      fireEvent.click(newClipButton);
      /* Save second clip */
      fireEvent.click(saveClipButton);
      /* Check to see if the clips saved in the <SavedClips /> component */
      const savedClipsWrapper = getByTestId('savedClipsWrapper');
      fireEvent.click(savedClipsWrapper);
      const savedClipsList = getByTestId('savedClipsList');
      expect(savedClipsList.textContent).toContain('Clip 1');
      expect(savedClipsList.textContent).toContain('Clip 2');
      /* Clicking play button, for clip 1, updates <TwitchVideo /> component */
      const playButton0 = getByTestId('playButton0');
      fireEvent.click(playButton0);
      const clipDataTitle = getByTestId('clipDataTitle');
      expect(clipDataTitle.textContent).toContain('Clip 1');
      /* Clicking play button, for clip 2, updates <TwitchVideo /> component */
      const playButton1 = getByTestId('playButton1');
      fireEvent.click(playButton1);
      expect(clipDataTitle.textContent).toContain('Clip 2');
    });
  });
  it('Clicking the delete button in the <SavedClips /> deletes the clip from the same component', async () => {
    const { getByTestId } = RenderComponent();
    await wait(() => {
      /* Click the save clip button for the first two clips & verify that they saved in the <SavedClips /> component */
      const saveClipButton = getByTestId('saveClipButton');
      fireEvent.click(saveClipButton);
      const newClipButton = getByTestId('newClipButton');
      fireEvent.click(newClipButton);
      fireEvent.click(saveClipButton);
      const savedClipsWrapper = getByTestId('savedClipsWrapper');
      fireEvent.click(savedClipsWrapper);
      const savedClipsList = getByTestId('savedClipsList');
      expect(savedClipsList.textContent).toContain('Clip 1');
      expect(savedClipsList.textContent).toContain('Clip 2');
      /* Delete a clip (the second clip) */
      const deleteButton1 = getByTestId('deleteButton1');
      fireEvent.click(deleteButton1);
      expect(savedClipsList.textContent).toContain('Clip 1');
      expect(savedClipsList.textContent).not.toContain('Clip 2');
      /* Delete the first clip, this should make the savedClipsList render null (because it will be empty). 
      Thus, the saveListWrapper will have no textContent. */
      const saveListWrapper = getByTestId('saveListWrapper');
      const deleteButton0 = getByTestId('deleteButton0');
      fireEvent.click(deleteButton0);
      expect(saveListWrapper.textContent).toBe('');
    });
  });
});
