import { defineFeature, loadFeature } from 'jest-cucumber';
import DownloadManger from '../../src/DownloadManager';
import { config } from '../../src/config';
import localstorage from '../../__setups__/localstorage';

const feature = loadFeature('./__tests__/DownloadManager/DownloadManager.feature');

defineFeature(feature, test => {
    test('Adding a magnet to the manager', ({ given, when, then }) => {
            let dm;
            let response;
            const CLIENT_PEER_ID="DEV_CLIENT1";
            localstorage.__STORE__ = {};

        given('a download manager', () => {
            dm = new DownloadManger(CLIENT_PEER_ID);
        });

        when('I fetch an item that has not yet downloaded', () => {
           response = dm.getItem("");
        });

        then('a promise is returned', () => {
            expect(response).toBeTruthy();
        });

        then('and the promise contains the current download status', () => {
            expect(dm.then('test', () => {

            }
            ));
        });
    });
});