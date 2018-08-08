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

    void Users::getuser(const account_name account) {
        userIndex users(_self, _self);

        auto iterator = users.find(account);
        eosio_assert(iterator != users.end(), "Address for account not found");

        auto currentUser = users.get(account);
        print("Username: ", currentUser.username.c_str());
    }

    void Users::addstorage(account_name account, storage obj) {
        require_auth(account);
        userIndex users(_self, _self);

        auto iterator = users.find(account);
        eosio_assert(iterator != users.end(), "Address for account not found");

        users.modify(iterator, account, [&](auto& user) {
            user.storage_objs.push_back(storage{
                obj.account,
                obj.filename,
                obj.file_size,
                obj.path,
                obj.checksum,
            });
        });

    }
}