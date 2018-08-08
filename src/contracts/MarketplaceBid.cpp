#pragma once
#include <eosiolib/asset.hpp>
#include <eosiolib/multi_index.hpp>

namespace hodlong {
    using namespace eosio;
    using std::string;



    struct bid {
        uint64_t bid_id;
        uint64_t quantity;
        uint64_t price;

        uint64_t primary_key() const { return bid_id; }

        EOSLIB_SERIALIZE(bid, (bid_id)(quantity)(price));
    };

    typedef multi_index<N(bid), bid> bidIndex;

    typedef multi_index<N(bids), bid> bids;


}