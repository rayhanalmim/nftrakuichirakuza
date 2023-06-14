import React, { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { AboutSection } from "./components/AboutSection";
import NFTSection from "./components/NFTSection";
import CreatorSection from "./components/CreatorSection";
import FeaturedSection from "./components/FeaturedSection";
import { HeroSection } from "./components/HeroSection";
import { NetworkSection } from "./components/NetworkSection";
import CollectionSection from "./CollectionSection";
import HomeCollection from "./HomeCollection";
import PageLoading from "../../components/PageLoading/PageLoading";
import { allUsersData } from "../../graphql/queries/getAllUsers";
import { useQuery } from "@apollo/client";
import { t } from "i18next";
import { Row, Col } from 'antd';

const HomePage = () => {
  useDocumentTitle("Home || JapanNFT");
  const { data, loading, error } = useQuery(allUsersData);

  const userData = !loading && !error && data && data?.getAllUsers;
  const [loadingData, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise((r) => setTimeout(r, 2000));

      // Toggle loading state
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);

  if (loadingData && loading) {
    return (
      <div>
        <PageLoading />
      </div>
    );
  }
  return (
    <div>
      
      <HeroSection heading="" />
      <NetworkSection />
      {/* <CollectionSection /> */}
      <HomeCollection/>
      <AboutSection
        heading={t("Anime: the pride of Japan,a cultural asset to the world.")}
      />
      {/* <NFTSection heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit." /> */}
      {/* <FeaturedSection heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit." /> */}
      <CreatorSection userData={userData} />
    </div>
  );
};

export default HomePage;
