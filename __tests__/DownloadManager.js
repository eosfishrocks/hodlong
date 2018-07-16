import DownloadManager from 'DownloadManager';

jest.mock('../src/DownloadManager');

it('Returns an object from the network', () => {
    expect(DownloadManager()).toBe(undefined);
});
