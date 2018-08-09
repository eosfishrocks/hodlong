#include "Marketplace.hpp"

namespace hodlong {
    void Marketplace::buy(account_name buyer, uint64_t bidId) {
        bidIndex bids(_self, _self);

        auto iterator = bids.find(bidId);
        eosio_assert(iterator != bids.end(), "The bid not found");

        auto bid = bids.get(bidId);
        eosio_assert(bid.quantity > 0, "The bid is out of stock");

        asset bidPrice = asset(bid.price, string_to_symbol(4, "HDONG"));

        action(vector<permission_level>(), N(anorak), N(transfer),
               std::make_tuple(buyer, _self, bidPrice, string(""))).send();

        action(vector<permission_level>(), N(anorak), N(additem), std::make_tuple(buyer,
                                                                             bid.bid_id,
                                                                             bid.quantity,
                                                                             bid.price

        )).send();

        updatebid(buyer, bid.bid_id, -1);
    }


    void Marketplace::addbid(account_name account, bid newBid) {
        require_auth(account);

        bidIndex bids(_self, _self);

        auto iterator = bids.find(newBid.bid_id);
        eosio_assert(iterator == bids.end(), "bid for this ID already exists");

        bids.emplace(account, [&](auto &bid) {
            bid.bid_id = newBid.bid_id;
            bid.price = newBid.price;
        });
    }

    void Marketplace::updatebid(account_name account, uint64_t bid_id, uint64_t quantity) {
        require_auth(account);

        bidIndex bids(_self, _self);

        auto iterator = bids.find(bid_id);
        eosio_assert(iterator != bids.end(), "bid not found");

        bids.modify(iterator, account, [&](auto &bid) {
            bid.quantity += quantity;
        });
    }

    void Marketplace::removebid(account_name account, uint64_t bidId) {
        require_auth(account);

        bidIndex bids(_self, _self);

        auto iterator = bids.find(bidId);
        eosio_assert(iterator != bids.end(), "bid not found");

        bids.erase(iterator);
    }

    void Marketplace::createobj(account_name account, hodlong::Marketplace::storage newObj) {
        require_auth(account);

        storageIndex objs(_self, _self);

        auto iterator = objs.find(newObj.storage_id);
        eosio_assert(iterator == objs.end(), "Obj for this ID already exists");

        objs.emplace(account, [&](auto &obj) {
            obj.storage_id = newObj.storage_id;
            obj.account = newObj.account;
            obj.filename = newObj.filename;
            obj.file_size = newObj.file_size;
            obj.checksum = newObj.checksum;
        });
    }

}