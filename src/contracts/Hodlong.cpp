#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>
#include <vector>
#include "Users.hpp"

// Main contract interface
namespace hodlong {
    using namespace eosio;
    using std::string;

    class Hodlong : public contract {
        using contract::contract;

    public:

        Hodlong(account_name self)
        : contract(self) {},

        // @abi action
        void add_user(const account_name account, string& username);

        // @abi action
        void get_user(const account_name account);

    private:

        // @abi table user i64
        struct user {
            uint64_t account_name;
            string username;
            vector <string> storageIds;

            uint64_t primary_key() const { return account_name; }

            EOSLIB_SERIALIZE(user, (account_name)(username)
            );
        };

        // @abi table user i64
        struct storage {
            uint64_t account_name;
            string filename;
            string filesize;
            string path;
            string checksum;
            string gas_limit;

            uint64_t primary_key() const { return account_name; }

            EOSLIB_SERIALIZE(storage, (account_name)(filename)(filesize)(path)(checksum)(gas_limit)
            )
        };

        typedef multi_index<N(user), user> userIndex;
    };

    EOSIO_ABI(Users, (add)(getuser));
}