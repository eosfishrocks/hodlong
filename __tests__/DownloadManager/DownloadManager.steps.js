import { defineFeature, loadFeature } from 'jest-cucumber';
import DownloadManger from '../../src/DownloadManager';
import { config } from '../../src/config';

const feature = loadFeature('./__tests__/DownloadManager/DownloadManager.feature');

defineFeature(feature, test => {
    test('Adding a magnet to the manager', ({ given, when, then, and }) => {
            let dm;
            let response;
            config.CLIENT_PEER_ID="TEST_CLIENT";
        given('a download manager', () => {
            dm = new DownloadManger();
        });

        when('I fetch an item that has not yet downloaded', () => {
           response = dm.getItem("");
        });

        then('a promise is returned', () => {
            expect(response).toBeTruthy();
        });

        and('the promise contains the current download status', () => {
            expect(dm.then('test', () => {
                
            }
            ));
        });
    });
});