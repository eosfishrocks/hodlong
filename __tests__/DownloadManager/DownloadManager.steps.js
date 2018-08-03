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
        const TEST_INFO_HASH_ID='0124567890';
        localstorage.__STORE__ = {}
        given('a download manager', () => {
            dm = new DownloadManger(TEST_INFO_HASH_ID, CLIENT_PEER_ID);
        });

        when('I add a magnet id to the manager', () => {
           response = dm.getItem("");
        });

        then('a promise is returned', () => {
            expect(response).toBeTruthy();
        });

        then('the promise contains the current download status', () => {
            expect(dm.getStatus());
        });
    });

    test('Adding more than tweleve magnets to the manager', ({ given, when, then, pending }) => {
        given('a download manager', () => {
            pending();
        });

        when('I add more than twelve magnet ids to the manager', () => {
            pending();
        });

        then('the download manager keeps twelve active connections', () => {
            pending();
        });
    });

    test('Moving a download to the background', ({ given, when, then, pending }) => {
        given('a download manager', () => {
            pending();
        });

        when('I add a magnet id to the manager', () => {
            pending();
        });

        then('the download finishes and gets added to the background', () => {
            pending();
        });

        then('a separate client requests the same id', () => {
            pending();
        });

        then('the download is added back to the active connections', () => {
            pending();
        });
    });
    test('When connecting to the hodl network, grab the default config infoHash', ({ given, when, then, pending }) => {
        given('a connection to the eos contract', () => {
            pending();
        });

        when('I request the configInfoHash', () => {
            pending();
        });

        then('the configInfoHash is returned', () => {
            pending();
        });

        then('the download manager starts while downloading the default config.', () => {
            pending();
        });
    });
});