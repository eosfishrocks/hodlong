import { defineFeature, loadFeature } from 'jest-cucumber';
import DownloadManger from '../../src/DownloadManager';

const feature = loadFeature('./__tests__/DownloadManager/DownloadManager.feature');
const sampleMagnetId = "";

defineFeature(feature, test => {
    test('Adding a magnet to the manager', ({ given, when, then, and }) => {
            let dm;
            let response;
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
            expect(dm.then('test' => {

            }
            ));
        });
    });
});