#include "Users.hpp"

namespace hodlong {
    void Users::add(account_name account, string &username) {

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
        users.emplace(account, [&](auto &user) {
            user.account_name = account;
            user.username = username;

        });

    }

    void Users::getuser(const account_name account) {
        print("Username: ", currentPlayer.username.c_str());

        if (currentPlayer.storageIds.size() > 0) {
            print(" StorageIds: ");

            for (uint32_t i = 0; i < currentPlayer.abilities.size(); i++) {
                print(currentPlayer.abilities.at(i).c_str(), " ");
            }
        } else {
            print(" No StorageUsed");
        }
    }
    void Users::addstorageId(const accountName, string& storageId){
        require_auth(account);

        userIndex users(_self, _self);
        auto iterator = users.find(account);
        eosio_assert(iterator != users.end(), "Address for account not found");

        users.modify(iterator, account, [&](auto& user)) {
            users.storageIds.push_back(storageId);
        }
    }
}