#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

namespace hodlong {
    using namespace eosio;
    using std::string;

    class Config : public contract {
        using contract::contract;

    public:

        Config(account_name self) : contract(self) {}

        //@abi action
        void getConfig();

        //@abi action
        void setConfig(account_name admin, string& infoHashID);



    private:

        //@abi table user i64
        struct bid {
            account_name admin;
            string& infoHashId;

            EOSLIB_SERIALIZE(Config, (infoHashId))
        };


        EOSIO_ABI(Users,
        );
    }