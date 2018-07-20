#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

namespace hodlong {
    using namespace eosio;
    using std::string;

    class Users : public contract {
        using contract::contract;

    public:

        Users(account_name self) : contract(self) {}

        void add(account_name account, string& username);

        void getuser(const account_name account);

        void addstorage(const account_name account, string& storageIds);

    private:

        //@abi table user i64
        struct user {
            uint64_t account_name;
            string username;
            vector<string> storageIds;

            uint64_t primary_key() const { return account_name; }
            EOSLIB_SERIALIZE(user, (account_name)(username))
        };

        typedef multi_index<N(user), user> userIndex;
    };

    EOSIO_ABI(Users, (add)(update)(getuser)(storageIds));
}