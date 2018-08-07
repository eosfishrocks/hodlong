#include "Trackers.hpp"

namespace hodlong {
    void Trackers::add(const account_name account, string& tracker_url){
        require_auth(account);

        trackerIndex  trackers(_self, _self);
        auto iterator = trackers.find(account);
        eosio_assert(iterator == trackers.end(), "A tracker is already configured for this account.");

        trackers.emplace(account, [&](auto &tracker){
            tracker.account = account;
            tracker.url = tracker_url;
        });

    }
    void Trackers::remove(const account_name account, string& tracker_url){
        require_auth(account);

        trackerIndex  trackers(_self, _self);
        auto iterator = trackers.find(account);
        eosio_assert(iterator != trackers.end(), "A tracker doesn't exist for this account.");

        trackers.erase(iterator);
    }
    void Trackers::update(const account_name account, string& tracker_url){
        require_auth(account);

        trackerIndex trackers(_self, _self);

        auto iterator = trackers.find(account);
        eosio_assert(iterator != trackers.end(), "A tracker doesn't exist for this account.");

        trackers.modify(iterator, account, [&](auto& trackers) {
            trackers.url = tracker_url;
        });
    }
}