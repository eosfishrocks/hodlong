#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/symbol.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/contract.hpp>
#include <string>
#include "MarketplaceBid.cpp"


namespace hodlong {
    using namespace eosio;
    using std::string;

    class Marketplace : public contract {
        using contract::contract;

    public:

        Marketplace(account_name self) : contract(self) {}

        // @abi table user i64
        struct storage {
            uint64_t storage_id;
            account_name account;
            string filename;
            string file_size;
            string checksum;

            uint64_t primary_key() const { return account; }

            EOSLIB_SERIALIZE(storage, (account)(filename)(file_size)(checksum));
        };
        typedef multi_index<N(marketplace), storage> storageIndex;

        // @abi action
        void buy(account_name buyer, uint64_t bidId);

        // @abi action
        void addbid(account_name account, bid newBid);

        // @abi action
        void updatebid(account_name account, uint64_t bid_id, uint64_t quantity);

        // @abi action
        void removebid(account_name account, uint64_t bidId);

        // @abi action
        void createobj(account_name account, storage obj);

    };

    EOSIO_ABI(Marketplace,(buy)(addbid)(updatebid)(removebid)(createobj));
}