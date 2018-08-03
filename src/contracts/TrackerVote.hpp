#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>
#include <vector>
#include "TrackerVote.hpp"
#include "Trackers.hpp"

namespace hodlong {
    using namespace eosio;
    using std::string;

    class TrackerVote : public contract {
        using contract::contract;

    public:

        TrackerVote(account_name self) : contract(self) {}

        //@abi action
        vote(account_name account, Tracker tracker, bool)

    private:

        //@abi table vote i64
        struct tracker {
            Tracker tracker;
            Vector <vote> votes;

            EOSLIB_SERIALIZE(TrackerVote, (tracker)(votes))
        };

        //@abi table vote i64
        struct vote {
            account_name account;
            Tracker
            bool value;
        };

        EOSIO_ABI(TrackerVote,);
    }