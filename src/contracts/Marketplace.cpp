#include "Marketplace.hpp"

namespace hodlong {
    void Marketplace::buy(account_name buyer, uint64_t bidId) {
        bidIndex bids(_self, _self);

        auto iterator = bids.find(bidId);
        eosio_assert(iterator != bids.end(), "The bid not found");

        auto bid = bids.get(bidId);
        eosio_assert(bid.quantity > 0, "The bid is out of stock");

        asset bidPrice = asset(bid.price, string_to_symbol(4, "OAS"));

        action(vector<permission_level>(), N(anorak), N(transfer),
               make_tuple(buyer, _self, bidPrice, string(""))).send();

        action(vector<permission_level>(), N(anorak), N(additem), make_tuple(buyer,
                                                                             bid.bid_id,
                                                                             bid.quantity,
                                                                             bid.price

        )).send();

        update(buyer, bid.bid_id, -1);
    }

    void Marketplace::getbyid(uint64_t bidId) {
        bidIndex bids(_self, _self);

        auto iterator = bids.find(bidId);
        eosio_assert(iterator != bids.end(), "bid not found");

        auto bid = bids.get(bidId);
    }

    void Marketplace::add(account_name account, bid newbid) {
        require_auth(account);

        bidIndex bids(_self, _self);

        auto iterator = bids.find(newbid.bid_id);
        eosio_assert(iterator == bids.end(), "bid for this ID already exists");

        bids.emplace(account, [&](auto &bid) {
            bid.bid_id = newbid.bid_id;
            bid.quanity = newbid.quantity;
            bid.price = newbid.price;
        });
    }

    void Marketplace::update(account_name account, uint64_t bid_id, uint64_t quantity) {
        require_auth(account);

        bidIndex bids(_self, _self);

        auto iterator = bids.find(bid_id);
        eosio_assert(iterator != bids.end(), "bid not found");

        bids.modify(iterator, account, [&](auto &bid) {
            bid.quantity += quantity;
        });
    }

    void Marketplace::remove(account_name account, uint64_t bidId) {
        require_auth(account);

        bidIndex bids(_self, _self);

        auto iterator = bids.find(bidId);
        eosio_assert(iterator != bids.end(), "bid not found");

        bids.erase(iterator);
    }
}