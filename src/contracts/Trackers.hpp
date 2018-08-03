#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>
#include <vector>

namespace hodlong {
    using namespace eosio;
    using std::string;

    class Trackers : public contract {
        using contract::contract;

    public:

        Trackers(account_name self) : contract(self) {}

        //@abi action
        void add(account_name account, string& url)

        //@abi action
        void remove(account_name account, string& url)

        //@abi action
        void update(account_name account, string& url)

    private:

        //@abi table tracker i64
        struct tracker {
            uint64_t tracker_id;
            string url;
            account_name <string> account_name;

            uint64_t primary_key() const { return account_name; }

            EOSLIB_SERIALIZE(user, (tracker_id)(url)(account_name)
            );
        };

        typedef multi_index<N(tracker), tracker> trackerIndex;
    };

    EOSIO_ABI(Trackers, (add)(remove)(update));
}