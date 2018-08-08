#pragma once
#include <eosiolib/asset.hpp>
#include <eosiolib/multi_index.hpp>
#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>
#include <vector>

namespace hodlong {
    using namespace eosio;
    using std::string;


    // @abi table user i64
    struct storage {
        account_name account;
        string filename;
        string file_size;
        string path;
        string checksum;
        uint64_t primary_key() const { return account; }

        EOSLIB_SERIALIZE(storage, (account)(filename)(file_size)(path)(checksum)
        );
    };

    typedef multi_index<N(storage), storage> storageIndex;

}