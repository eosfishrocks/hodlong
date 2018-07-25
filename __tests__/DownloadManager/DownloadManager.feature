Feature: Create a new DownloadManager Instance
  Scenario: Insantiating a download manager object
    Given a download manager module
    When I instantiate the module
    Then the manager is initalized

  Scenario:
    Given a download manager
    When I add a magnet id to the manager
    Then a promise is returned
    And the promise contains the current download status

  Scenario:
    Given a download manager
    When I add more than twelve magnet ids to the manager
    Then the download manager keeps twelve active connections

  Scenario:
    Given a download manager
    When I add a magnet id to the manager
    Then the download finishes and gets added to the background
    And a separate client requests the same id
    Then the download is added back to the active connections