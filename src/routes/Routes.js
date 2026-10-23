import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import CreateNFT from "../view/CreateNFT/CreateNFT";

import HomePage from "./../view/Home/HomePage";
import Collection from "../view/Collections/Collection";

import Users from "../view/Users/Users";

import NFTPage from "../view/NFT/NFTPage";
import UserPage from "../view/Users/UserPage";
import Setting from "../view/Profile/Setting";

import ExplorePage from "../view/ExplorePage";
import NFT from "../view/NFT/NFT";
import { SearchComponent } from "../components/Header/Header";
import MLMdashboard from "../view/MLMDashboard/MLMdashboard";
import MyNFT from "../view/NFT/MyNFT";

import CollectionModal, { Import } from "../view/Collections/CollectionModal";
import CollectionDetails from "../view/Collections/CollectionDetails";
import ChoosePage from "../view/CreateNFT/ChoosePage";
import CreateCollection from "../view/Collections/CreateCollection";
import Signup from "../view/Signup/Signup";
import Login from "../view/Login/Login";
import ForgotPassword from "../view/Forgot/ForgotPassword";
import CreateMyNFT from "../view/CreateNFT/CreateMyNFT";
import NotFoundPage from "../components/404Page/NotFoundPage";
import PageLoading from "../components/PageLoading/PageLoading";
import About from "../view/About/About";
import Dashboard from "../view/Dashboard/Dashboard";
import EditProfile from "../view/Profile/EditProfile";
import TermsConditions from "../view/AdditionalPages/Terms&Conditions";
import PrivacyPolicy from "../view/AdditionalPages/PrivacyPolicy";
import OurTeam from "../view/AdditionalPages/OurTeam";
import DemoConnect from "../components/Wallet/ConnectWallet";
import UserProfileDetail from "../view/Users/UserProfileDetail";
import { Team } from "../view/Team/Team";
import UserCollection from "../view/Collections/GetUserCollection";

const Routing = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/connect" element={<DemoConnect />} />
          <Route
            path="/collection/collectiondetails/:blockchain/:collectionAddress"
            element={<CollectionDetails />}
          />
          <Route path="/explore" element={<ExplorePage />}>
            <Route index element={<Collection />} />
            <Route path="nft" element={<NFT />} />
            <Route path="collection" element={<Collection />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="/companyinfo" element={<OurTeam />} />
          <Route path="/team" element={<Team />} />
          <Route path="/mycollections" element={<UserCollection />} />
          <Route
            path="/nft/nftpage/:blockchain/:collection/:tokenId"
            element={<NFTPage />}
          />
          <Route path="/users/userpage/:wallet" element={<UserPage />} />

          {/* new url  testing */}
          <Route path="/profile/:identifier" element={<UserProfileDetail />} />
          {loggedIn ? (
            <Route path="/create" element={<ChoosePage />} />
          ) : (
            <>
              <Route path="/login/:url" element={<Login />} />
            </>
          )}
          <Route path="/createpage" element={<CreateNFT />} />
          <Route path="/createmynft" element={<CreateMyNFT />} />
          <Route path="/CreateCollection" element={<CreateCollection />} />
          <Route path="/user_page" element={<UserPage />} />
          <Route path="/edit_page" element={<EditProfile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/mynfts" element={<MyNFT />} />
          <Route path="/mynfts/collections" element={<CollectionModal />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:url" element={<Login />} />
          <Route path="/terms&conditions" element={<TermsConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/import" element={<Import />} />
          <Route path="/import/:address/:chainName" element={<Import />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/mlmdashboard" element={<Dashboard />} />
        </Route>

        {/* <Route
         exact
         path="/users"
         component={
       loading
           ? () =>  <div className="flex-1">
           <SearchComponent placeholder={"users"} />
         </div>
         : () => <SearchComponent />
        }
      /> */}
      </Routes>
    </div>
  );
};

export default Routing;
