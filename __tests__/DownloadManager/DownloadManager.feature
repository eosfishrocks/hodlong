Feature: Create a new DownloadManager Instance
  Scenario: Adding a magnet to the manager
    Given a download manager
    When I add a magnet id to the manager
    Then a promise is returned
    And the promise contains the current download status

  Scenario: Adding more than tweleve magnets to the manager
    Given a download manager
    When I add more than twelve magnet ids to the manager
    Then the download manager keeps twelve active connections

  Scenario: Moving a download to the background
    Given a download manager
    When I add a magnet id to the manager
    Then the download finishes and gets added to the background
    And a separate client requests the same id
    Then the download is added back to the active connections

  Scenario: When connecting to the hodl network, grab the default config infoHash
    Given a connection to the eos contract
    When I request the configInfoHash
    Then the configInfoHash is returned
    And the download manager starts while downloading the default config.
