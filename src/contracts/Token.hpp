#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

namespace hodlong {
    using namespace eosio;
    using std::string;

    class Token : public contract {
        using contract::contract;

    public:

        Token(account_name self) : contract(self) {}

        //@abi action
        void mine(account_name buyer, uint64_t bidId);

        //@abi action
        void transfer(account_name sender, account_name receiver, asset quantity, string& memo)
        //@abi action
        void getbyid(uint64_t tokenId);

        //@abi action
        void verify(account_name account, uint64_t hashid);

    private:

        //@abi table user i64
        struct bid {
            uint64_t token_id;
            account_name account;

            uint64_t primary_key() const { return bid_id; }

            EOSLIB_SERIALIZE(bid, (bid_id)(quantity)(price)
            )
        };


        EOSIO_ABI(Users,
        );
    }