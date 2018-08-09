#include "Users.hpp"

namespace hodlong {
    void Users::add(const account_name account, string &username) {
        require_auth(account);
        userIndex users(_self, _self);

        auto iterator = users.find(account);
        eosio_assert(iterator == users.end(), "Address for account already exists");

        users.emplace(account, [&](auto &user) {
            user.account_name = account;
            user.username = username;

        });

    }

    void Users::addstorage(account_name account, uint64_t storageId) {
        require_auth(account);
        userIndex users(_self, _self);

        auto iterator = users.find(account);
        eosio_assert(iterator != users.end(), "Address for account not found");

        users.modify(iterator, account, [&](auto& user) {
            user.storage_objs.push_back(storageId);
        });
    }
}