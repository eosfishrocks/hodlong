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

        // @abi action
        void buy(account_name buyer, uint64_t bidId);

        // @abi action
        void getbyid(uint64_t bidId);

        // @abi action
        void add(account_name account, bid newBid);

        // @abi action
        void update(account_name account, uint64_t bid_id, uint64_t quantity);

        // @abi action
        void remove(account_name account, uint64_t bidId);


    };

    EOSIO_ABI(Marketplace,(buy)(getbyid)(add)(update)(remove));
}