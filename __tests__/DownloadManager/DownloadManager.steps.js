import { defineFeature, loadFeature } from 'jest-cucumber';
import expect from 'expect';
import DownloadManger from '../../src/DownloadManager';

const feature = loadFeature('./__tests__/DownloadManager/DownloadManager.feature');
const sampleMagnetId = "";

defineFeature(feature, test => {
    test('Create a new DownloadManager Instance' => {
        let dm = DownloadManger();
        given('a download manager module')
    });
});

defineFeature(feature, test => {
    test('Adding a magnet to the manager', ({ given, when, then, and }) => {
            let dm;
        given('a download manager', () => {
            dm = new DownloadManger();
        });

        when('I fetch an item that has not yet downloaded', () => {
           dm.getItem("")
        });

        then('a promise is returned', () => {
            expect(rocket.isInSpace).toBe(true);
        });

        and('the promise contains the current download status', () => {
            expect(rocket.boostersLanded).toBe(true);
        });
    });
});