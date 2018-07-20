#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

namespace hodlong {
    using namespace eosio;
    using std::string;

    class Storage : public contract {
        using contract::contract;

    public:

        Storage(account_name self) : contract(self) {}

        void add(account_name account, string& filename, string& path, string& checksum, uint64_t gas_limit);

        void update(account_name account, uint64_t gas_limit);

    private:

        //@abi table user i64
        struct storage {
            uint64_t account_name;
            string filename;
            string path;
            string checksum;
            string gas_limit;

            uint64_t primary_key() const { return account_name; }
            EOSLIB_SERIALIZE(storage, (account_name)(filename)(path)(checksum)(gasLimits))
        };

        typedef multi_index<N(user), user> userIndex;
    };

    EOSIO_ABI(Users, (add)(update)(getuser)(storageIds));
}