/* eslint-disable */
import React from 'react';
import { render, cleanup, wait, fireEvent } from 'react-testing-library';
import regeneratorRuntime, { async } from 'regenerator-runtime'; /* eslint-disable-line */
import TwitchVideos from './displayClips';
import BroadCasterInfo from './broadcasterInfo';
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

describe('<TwitchVideos /> component (parent of <BroadCasterInfo />)', () => {
    console.error = jest.fn(); /* eslint-disable-line */
    /* Using this until there is a simpler work-around for testing async/await
      without triggering the new `act` warning */
    it('Passes data to the <BroadCasterInfo /> componet', async () => {
        const { getByTestId } = RenderComponent();
        await wait(() => {
            const aboutBroadcaster = getByTestId('aboutBroadcaster');
            expect(aboutBroadcaster.textContent).toContain('Broadcaster 1');
        });
    });
    it('When the New Clip button (in <TwitchVideos />) is pressed the <BroadCasterInfo /> component receives new data', async () => {
        const { getByTestId } = RenderComponent();
        await wait(() => {
            const aboutBroadcaster = getByTestId('aboutBroadcaster');
            const newClipButton = getByTestId('newClipButton');
            expect(aboutBroadcaster.textContent).toContain('Broadcaster 1');
            fireEvent.click(newClipButton);
            expect(aboutBroadcaster.textContent).toContain('Broadcaster 2');
        });
    });
    test('BroadCasterInfo /> component displays api data', async () => {
        const { getByTestId } = RenderComponent();
        await wait(() => {
            const broadcasterInfoSec = getByTestId('broadcasterInfoSec');
            expect(broadcasterInfoSec.textContent).toContain('partner');
            expect(broadcasterInfoSec.textContent).toContain('description 1');
        });
    });
});
