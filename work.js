const handleSubmit = (values) => {
    console.log(values);
    let description = values.description;
    let name = values.name;
    let royalties = values.royalties;
    let charity = values.charity;
    let royaltyWalletAddress = values.royaltyWalletAddress;
    // let charityWallet = values.charityWallet;
    // let price = values.price;
    let charityWallet = charityWalletAddress;
    let price = priceInstance;
    
    let imageFormObj = new FormData();
    imageFormObj.append("image", file);

    const metadata = {
      name: name,
      description: description,
      image: imageFormObj.get("image"),
      creator: account,
      properties: {},
    };
    try {
      console.log(royalties,"<===== royalties", charity,"<===== charity", charityWallet,"<===== charityWallet", royaltyWalletAddress,"<===== royaltyWalletAddress");
      if (active) {
        setLoading(true);
        uploadOnIpfs(metadata).then(async (uri) => {
          console.log(uri);
          const data = await downloadJSONOnIpfs(uri);
       
            
            mintNFT(
              uri,
              collectionAddress,
              royaltyWalletAddress,
              royalties,
              charityWallet,
              charity
            )
              .then(async (res) => {
                console.log(res);
                let metadata = await downloadJSONOnIpfs(uri);
                createItem({
                  variables: {
                    collectionAddress: ChainsInfo[chainId].NFT_ADDRESS,
                    tokenId: res.events.TokensMinted.returnValues.tokenIdMinted,
                    metadata: JSON.stringify(metadata),
                    blockchain: ChainsInfo[chainId].CHAIN_NAME.toLowerCase(),
                    name: name,
                  },
                })
                  .then((res) => {
                    setLoading(false);
                    Swal.fire("Success", "NFT Minted Successfully", "success");
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
        });
      } else {
        Swal.fire("Error", "Please Connect Wallet", "error");
      }
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };