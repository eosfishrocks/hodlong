#include "Users.hpp"

namespace hodlong {
    void Users::add(account_name account, string &username) {

        require_auth(account);

        userIndex users(_self, _self);

        auto iterator = users.find(account);
        eosio_assert(iterator == users.end(), "Address for account already exists");

        users.emplace(account, [&](auto &user) {
            user.account_name = account;
            user.username = username;

        });

    }

    void Users::getuser(const account_name account) {
        playerIndex players(_self, _self);

        auto iterator = players.find(account);
        eosio_assert(iterator != players.end(), "Address for account not found");

        auto currentPlayer = players.get(account);
        print("Username: ", currentPlayer.username.c_str());
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