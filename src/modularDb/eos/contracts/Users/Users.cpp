#include "Users.hpp"

namespace Oasis {
    using namespace eosio;
    using std::string;

    class Users : public contract {
        using contract::contract;

    public:
        Users(account_name self):contract(self) {}

        //@abi action
        void add(const account_name account, string& username) {
            /**
             * We require that only the owner of an account can use this action
             * or somebody with the account authorization
            */
            require_auth(account);

            /**
             * We access the "user" table as creating an object of type "userIndex"
             * As parameters we pass code & scope - _self from the parent contract
            */
            userIndex users(_self, _self);

            /**
             * We must verify that the account doesn't exist yet
             * If the account is not found the iterator variable should be users.end()
            */
            auto iterator = users.find(account);
            eosio_assert(iterator == users.end(), "Address for account already exists");

            /**
             * We add the new user in the table
             * The first argument is the payer of the storage which will store the data
            */
            users.emplace(account, [&](auto& user) {
                user.account_name = account;
                user.username = username;
            });
        }

        //@abi action
        void update(account_name account) {
            require_auth(account);

            userIndex users(_self, _self);

            auto iterator = users.find(account);
            eosio_assert(iterator != users.end(), "Address for account not found");
        }

        //@abi action
        void getuser(const account_name account) {
            userIndex users(_self, _self);

            auto iterator = users.find(account);
            eosio_assert(iterator != users.end(), "Address for account not found");

            /**
             * The "get" function returns a constant reference to the object
             * containing the specified secondary key
            */
            auto currentPlayer = users.get(account);
            print("Username: ", currentPlayer.username.c_str());
        }

    private:

        //@abi table user i64
        struct user {
            uint64_t account_name;
            string username;

            uint64_t primary_key() const { return account_name; }

            EOSLIB_SERIALIZE(user, (account_name)(username))
        };

        typedef multi_index<N(user), user> userIndex;
    };

    EOSIO_ABI(Users, (add)(update)(getuser))
}