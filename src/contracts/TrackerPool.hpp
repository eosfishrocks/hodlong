#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>
#include <vector>
#include "Trackers.hpp"
#include "TrackerVote.hpp"

namespace hodlong {
    using namespace eosio;
    using std::string;

    class TrackerPool : public contract {
        using contract::contract;

    public:

        TrackerPool(account_name self) : contract(self) {}

        //@abi action
        void addToPending(account_name account, string& url)

        //@abi action
        void removeFromApproved(account_name account, string&)
        
        
    private:

        //@abi table pool i64
        struct pool {
            vector <Trackers> approvedTrackers;
            vector <TrackerVotes> pendingTrackerVotes;


            EOSLIB_SERIALIZE(TrackerPool, (approvedTrackers)(pendingTrackers)
            );
        };

        typedef multi_index<N(pool), pool> poolIndex;
    };

    EOSIO_ABI(TrackerPool, (request)(tracker));
}