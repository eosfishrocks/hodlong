#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

namespace hodlong {
    using namespace eosio;
    using std::string;

    class Marketplace : public contract {
        using contract::contract;

    public:

        Marketplace(account_name self) : contract(self) {}
        //@abi action
        void buy(account_name buyer, uint64_t bidId);

        //@abi action
        void getbyid(uint64_t bidId);

        //@abi action
        void add(account_name account, product bidBid);

        //@abi action
        void update(account_name account, uint64_t bid_id, uint64_t quantity);

        //@abi action
        void remove(account_name account, uint64_t bidId);

    private:

        //@abi table user i64
        struct bid {
            uint64_t bid_id;
            uint64_t quantity;
            uint64_t price;

            uint64_t primary_key() const { return bid_id; }

            EOSLIB_SERIALIZE(bid, (bid_id)(quantity)(price))
        };



    EOSIO_ABI(Users, );
}