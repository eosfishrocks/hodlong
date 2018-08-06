EOSIOCPP = eosiocpp

build : users marketplace

marketplace :
	$(EOSIOCPP) -o ./src/contracts/Marketplace.wast ./src/contracts/Marketplace.cpp && \
		$(EOSIOCPP) -g ./src/contracts/Users.abi ./src/contracts/Users.cpp

users :
	$(EOSIOCPP) -o ./src/contracts/Users.wast ./src/contracts/Users.cpp && \
		$(EOSIOCPP) -g ./src/contracts/Users.abi ./src/contracts/Users.cpp
		
clean :
	-rm -f ./src/contracts/*.abi ./src/contracts/*.wast 