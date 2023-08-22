import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function TermsConditions() {

  const { t } = useTranslation();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="max-w-[1200px] mx-auto m-2">
      <h1 className="text-3xl font-bold pt-2 text-center m-3">
        {" "}
        {t("Rakuichi Rakuza Terms of Use")}
      </h1>
    
      
      <b>1. {t("The Purpose")}</b>
        
      <p style={{marginLeft:"20px"}}>1.	{t(`These terms of use (hereinafter referred to as the 'Terms') are governed by the NFT marketplace ' Rakuichi Rakuza ' ( hereinafter referred to as the 'Service') operated by Aqua Co., Ltd. ( hereinafter referred to as the 'Company'). Applies to users ( as defined in Article 2 ) who use The user shall use this service after agreeing to this agreement.`)}</p>

      <p style={{marginLeft:"20px"}}>2.	{t(`This agreement sets forth the terms of use for this service. All users who have registered for this service shall be able to use this service according to the conditions set forth in this agreement according to the conditions such as age and usage environment in accordance with this agreement.`)}</p>

      <p style={{marginLeft:"20px"}}>3.	{t(`By agreeing to the Terms of Use, the Agreement (as defined in Article 2) will be established between the User and the Company.`)}</p>



      <br/>
      <b>1. {t("Defination")}</b>

<p>{t("The following terms used in these Terms have the meanings set forth in the following items.")}</p>
      <p style={{marginLeft:"20px"}}>1.{t('Agreement: Refers to the contract for the use of the Service, which is concluded between the Company and the User on the terms of this Agreement.')}</p>
      <p style={{marginLeft:"20px"}}>2.{t('Target Data: Refers to data (excluding crypto assets) that can be recorded and issued as NFT in this service and that the user has the right to own, use, etc. In addition, the standards, etc. of the target data that can be used on this service shall be specified separately by the Company, and shall include, but not be limited to, data such as illustrations, videos, music, and 3D models.')}</p>
      <p style={{marginLeft:"20px"}}>3.{t('Refers to a non-substitutable digital token (Non-Fungible-Token) to which unique information is assigned among those recorded and issued on the blockchain for part or all of the target data .')}</p>
      <p style={{marginLeft:"20px"}}>4.{t('User: Any person who uses the Service.')}</p>
      <p style={{marginLeft:"20px"}}>5.{t('Seller: Refers to a user who sells NFTs on this service.')}</p>
      <p style={{marginLeft:"20px"}}>6.{t('Primary distribution exhibitor: Refers to a user who has created and exhibited an NFT based on the provisions of Article 10, Paragraph 1 on this service .')}</p>
      <p style={{marginLeft:"20px"}}>7.{t('Secondary distribution exhibitor: Refers to a user who exhibits NFT purchased within this service based on the provisions of Article 10, Paragraph 1 .')}</p>
      <p style={{marginLeft:"20px"}}>8.{t('Refers to a user who purchases NFT on this service .')}</p>
      <p style={{marginLeft:"20px"}}>9.{t('Communication Device: refers to a smartphone, tablet device or computer device.')}</p>
      <p style={{marginLeft:"20px"}}>10.{t('External NFT Marketplace: Refers to OpenSea ( https://opensea.io/ja ), Rarible ( https://rarible.com/ ), and other NFT marketplaces separately designated by the Company .')}</p>



      <br/>
      <b>1. {t("Changes to these Terms")}</b>
      <p>{t('If any of the following items apply, the Company may change these Terms at any time based on the provisions of Article 548-4 of the Civil Code. The revised Terms shall apply to this Agreement after the Terms have been revised.')}</p>
  <p>{t('the change of this agreement conforms to the general interests of users')}</p>
  <p>{t('When the change of this agreement does not contradict the purpose of the contract and is reasonable in light of the necessity of the change, the appropriateness of the content after the change, the content and other circumstances related to the change')}</p>
  <p>{t('In the event that the Terms are amended, the Company shall determine the effective date of the amended Terms and notify the User of the content of the amended Terms and the effective date at least two weeks prior to the effective date. , display on the website of this service, or other methods designated by our company .')}</p>
  <p>{t('Notwithstanding the provisions of the preceding two paragraphs, if the user uses this service after the notification of the change of this agreement in the preceding paragraph, or if the user does not take the procedure for cancellation within the period specified by our company, the user You agree to the changes to these Terms.')}</p>





  <br/>
      <b>1. {t("Handling of personal information")}</b>
  <p>{t(`shall be handled in accordance with the " Privacy Policy " [ link  ] separately established by the Company .`)}</p>




  <br/>
      <b>1. {t("Contents of this service")}</b>
  <p>{t('Users can use the following functions on this service.')}</p>
  <ol>
    <li>{t('create and list NFTs by the method specified by our company')}</li>
    <li>{t('Platform functions related to NFT trading between users')}</li>
    <li>{t('Other functions incidental to the preceding items')}</li>
  </ol>



  <br/>
      <b>1. {t("User registration, etc.")}</b>
  <p>{t('this agreement , the user shall enter the user information specified by the Company (hereinafter referred to as "user information") and register an account for the Service in accordance with the procedures stipulated by the Company. .')}</p>
  <p>{t('The user shall register all true and accurate information regarding his/her own user information, and in the event of any change in the registered user information based on the preceding paragraph, the user shall be obliged to immediately carry out procedures for changing the user information. shall be')}</p>
  <p>{t('We may refuse user registration at our discretion.')}</p>
  <p>{t('Users shall not be allowed to use, lend, transfer, sell or pledge accounts on this service to third parties .')}</p>
  <p>{t('The user shall manage the content registered in this service at the user\'s own responsibility to prevent unauthorized use by a third party. The Company shall not be held responsible for any damage caused to the User due to the use of the information registered under Paragraph 1 by a third party.')}</p>
  <p>{t('If this service is used based on the information registered in the account based on paragraph 1, we will treat it as if the person identified by the account has used this service. The person identified by the account that caused the use shall be responsible for the consequences of such use.')}</p>
  <p>{t('When using this service, it may be necessary to use an external NFT marketplace , a smart contract system designated by us, a digital asset , and a storage function for cryptocurrencies (hereinafter collectively referred to as "external services"). Thank you . In addition, since the external service is provided by a business operator other than the Company, the user must agree to the terms of use and privacy policy, etc. (hereinafter collectively referred to as the "terms of use of the external service, etc.") related to the external service. In addition, you must use this service in accordance with the provisions of the external service terms of use. In addition, users shall use external services at their own responsibility and shall not be responsible for any damage caused to users in connection with the use of external services  .')}</p>




  <br/>
  <b>1.{t('network fee')}</b>
  <ol>
    <li>{t('When using this service , a fee separately specified by the Company will be incurred. In addition, if Ethereum or other network fees occur in connection with the use of this service , the user shall bear them. Upon purchase, the purchaser is responsible for network fees .')}</li>
    <li>{t('We are not responsible for any increase in network fees, transaction delays or transaction failures.')}</li>
  </ol>




  <br/>
  <b>1.{t('service fee')}</b>
  <p>{t('the purchaser purchases an NFT exhibited pursuant to the provisions of Article 10, the purchaser shall be obligated to pay the service fee for this service separately determined by the Company to the  Company . In addition, the fees incurred when using external services shall be confirmed in the terms of use of external services  .')}</p>



  <br/>
  <b>1.{t('royalty')}</b>
  <p>1. {t("when exhibiting NFTs pursuant to the provisions of Article 10, the primary distribution exhibitor can set the royalty rate within the range separately specified by the Company.")}</p>
      <p>2. {t("The royalty stipulated in the preceding paragraph shall be incurred each time the exhibited NFT is resold, and the secondary distribution exhibitor who resells the NFT shall be obliged to pay the royalty.")}</p>
      <p>3. {t("The royalty payment stipulated in paragraph 1 is calculated based on the royalty rate set in paragraph 1 for the resale value of the NFT each time the NFT is resold, and the primary distribution is performed by the method designated by the Company. shall be paid to the seller.")}</p>




    

      <br/>
  <b>1.{t('Issuance and Listing of NFTs')}</b>
      <p>1. {t("Users can create and hold NFTs on this service by the method specified by our company. In addition, the GAS fee for NFT creation shall be borne by the user.")}</p>
      <p>2. {t("Users can exhibit NFTs created based on target data on this service and NFTs purchased within this service by the method specified by our company.")}</p>
      <p>3. {t("When exhibiting NFTs stipulated in the preceding paragraph, the exhibitor shall provide the selling price, the purchase currency separately designated by the Company, the information of the target data (including but not limited to name, URL, description, etc.), wallet Including address, royalty rate, selection of simultaneous listing to sales method (this service or this service and external NFT marketplace). Other transaction information specified by the Company must be set.")}</p>
      <p>4. {t("When exhibiting NFTs, the exhibitor shall not perform any of the acts specified in the following items.")}</p>
      <ul>
        <li>{t("(1) Selling NFTs generated by falsification of data, use of unauthorized tools, or other inappropriate methods")}</li>
        <li>{t("(2) Registering false information in the transaction information specified in the preceding paragraph")}</li>
        <li>{t("(3) Selling NFTs for the purpose of trading only with specific users")}</li>
        <li>{t("(4) Selling NFTs in a manner that violates the rules of these Terms, laws and regulations, guidelines, and other public order and morals.")}</li>
      </ul>
      <p>5. {t("The exhibitor guarantees that the NFT that exhibits on this service is not a crypto asset, prepaid payment instrument specified in Article 2, Paragraph 5 of the Fund Settlement Act, or electronic record transfer right specified in Article 2, Paragraph 3 of the Financial Instruments and Exchange Act.")}</p>
      <p>6. {t("If the Company determines that the NFT exhibited by the Seller on the Service does not satisfy the Terms and the standards stipulated by the Company, the Company may refuse to exhibit the NFT without notifying the Seller in advance. In addition, even if the exhibitor suffers damage due to the refusal by the Company, the Company shall not be obligated to compensate the exhibitor for the damage.")}</p>
      <p>7. {t("The exhibitor shall pay crypto assets equivalent to the selling price (hereinafter referred to as 'sales price') of NFTs exhibited in this service or in this service and external NFT marketplaces through this service (hereinafter referred to as 'listed NFTs'). The sales price will be received by the Company or the External NFT Marketplace on behalf of the Seller from the purchaser or the person who purchased the Exhibited NFT at the External NFT Marketplace.")}</p>
      <p>8. {t("The Company will purchase the Exhibited NFT in this service or an external NFT marketplace, and the purchaser or the person who purchased the Exhibited NFT in the external NFT marketplace will pay the sales price and the service fee or sales price separately determined by the Company and the external NFT marketplace. In the event that a separately specified fee is paid, the following crypto assets shall be paid to the exhibitor on the separately specified payment date.")}</p>
      <ul>
        <li>{t("(1) If the listed NFT is purchased on this service\nSales price")}</li>
        <li>{t("(2) If the listing NFT is purchased on an external NFT marketplace\nQuantity equivalent to the amount after deducting the fee separately determined by the external NFT marketplace from the sales price")}</li>
      </ul>





      <br/>
  <b>1.{t('Purchase NFT')}</b>
      <p>{t("In this service, the purchaser will use the method specified by the Company to pay the sales price and the amount of crypto assets equivalent to the service fee separately specified by the Company (however, both are limited to the crypto assets specified by the exhibitor when listing the NFT.) from your own wallet, you can purchase the listed NFT.")}</p>
      <p>{t("The purchaser agrees to this agreement, confirms and fully understands the content of this service and the terms and conditions set forth in Article 10, paragraph 10 of the NFT, and then purchases the NFT 3２.")}</p>
      <p>{t("When purchasing NFT, the purchaser shall not perform the acts specified in the following items.")}</p>
      <ul>
        <li>{t("(1) Purchasing NFTs for the purpose of trading only with specific users")}</li>
        <li>{t("(2) Purchasing an NFT that you have exhibited")}</li>
      </ul>











      <br/>
  <b>1.{t('NFT sales contract')}</b>

      <p>{t("the Exhibited NFT shall be concluded when the procedure specified by the Company is completed between the exhibitor and the purchaser in this service, and the Company shall not be a party to the contract. In addition, if the procedure specified by the Company is not completed normally due to system failure of this service or external service, etc., the sales contract may not be concluded, and the user agrees in advance shall be")}</p>
      <p>{t("The exhibitor shall promptly transfer the exhibit NFT to the purchaser's wallet after the sales contract for the exhibit NFT is concluded. In addition, the GAS fee for the transfer of the exhibition NFT will be borne by the [exhibitor /buyer].")}</p>
      <p>{t("After the sales contract for the Exhibit NFT is concluded, the purchaser shall be able to use the NFT within the scope specified in the following items, and the exhibitor shall grant the purchaser permission for such use.")}</p>
      <ul>
        <li>{t("(1) The copyright of the Listed NFT and the Target Data shall belong to the Seller or the licensor to which the Seller is licensed, and shall not belong to the Purchaser.")}</li>
        <li>{t("(2) The purchaser will publish the fact of acquisition, comment on the work, resell it, and display it online, including this service, regarding the exhibited NFT (including automatic public transmission specified in Article 2, Paragraph 1, 9-4 of the Copyright Act). We shall be able to perform acts similar to these.")}</li>
        <li>{t("(3) Purchasers may not modify the Listed NFT, use it for commercial purposes, or use it in any other inappropriate way.")}</li>
        <li>{t("(4) If the Exhibited NFT is resold and the Exhibited NFT is newly owned by a third party (hereinafter referred to as the 'Third Party Purchaser'), the purchaser shall use it as specified in this section. shall not be able to do so. In addition, the third party purchaser shall be able to use within the scope stipulated in this section when the sales contract for the NFT is concluded, and the same shall apply each time resale is performed thereafter.")}</li>
      </ul>
      <p>{t("The Company does not guarantee the transfer of the copyright, ownership, or any other legal rights and obligations regarding the NFT and the target data from the exhibitor to the purchaser in the sales contract of the exhibited NFT.")}</p>






     


      <br/>
  <b>1.{t('Affiliate program')}</b>
      <p>{t("Users can participate in the affiliate program of this service (hereinafter referred to as 'this affiliate program') by the method specified in each item below.")}</p>
      <ol>
        <li>{t("(1) Users will obtain a unique invitation link on the dashboard page within the Service.")}</li>
        <li>{t("(2) The user shares the invitation link with friends, family members, and others who have not registered for the service (hereinafter referred to as 'invitees').")}</li>
        <li>{t("(3) If the inviter uses the invitation link to register an account for this service and put up an NFT, a sales contract for the NFT is concluded, and the purchase price is paid (conclusion of a sales contract on an external NFT marketplace and payment.), the introducer will be granted a bonus separately determined by the Company.")}</li>
      </ol>
      <p>{t("Notwithstanding the provisions of the preceding paragraph, in the cases set forth in the following items, it is not possible to participate in this affiliate program.")}</p>
      <ul>
        <li>{t("(1) If you change the invite link")}</li>
        <li>{t("(2) If the Company deems the act to be fraudulent or fraudulent")}</li>
        <li>{t("(3) For commercial use")}</li>
        <li>{t("(4) When the invitation link is published or distributed on Twitter, Facebook, or any other place accessible by an unspecified number of people")}</li>
        <li>{t("(5) Other cases deemed inappropriate by the Company")}</li>
      </ul>

      <br/>
      <b>{t("Management of User Information and Communication Devices")}</b>
      <ol>
        <li>{t("1. The user shall be responsible for the management of user information and communication equipment, and the Company shall not assume any responsibility.")}</li>
        <li>{t("2. Users shall be responsible for damages caused by inadequate management of user information and communication equipment, errors in use, use by third parties, etc., and the Company shall not assume any responsibility.")}</li>
        <li>{t("3. If there is a risk that a third party will use the user information or communication device, the user shall immediately notify the Company to that effect and follow the Company's instructions, if any.")}</li>
      </ol>


<br/>
      <h2>{t("Conditions for providing this service")}</h2>
      <ol>
        <li>{t("1. The Company may suspend or change the Service for maintenance, etc., without notifying the User.")}</li>
        <li>{t("2. Equipment, communication means, etc. necessary to receive the provision of this service shall be provided at the user's expense and responsibility.")}</li>
      </ol>




      <br/>
      <b>{t("Intellectual property rights, etc.")}</b>
      <ol>
        <li>{t("Regardless of the method or form, the user may use all information and content provided by the Company in this service (hereinafter collectively referred to as 'our content') for private use as stipulated in the Copyright Act. You may not reproduce or use it beyond the scope of.")}</li>
        <li>{t("Copyrights, patent rights, utility model rights, trademark rights, design rights, and any other intellectual property rights related to our content, and the right to receive registration of these rights (hereinafter collectively referred to as 'intellectual property rights'). belongs to us or our licensors, and not to you. In addition, regardless of the existence or nonexistence of intellectual property rights, users shall not copy, distribute, reprint, transfer, publicly transmit, modify, adapt or otherwise use the content of the Company for secondary purposes.")}</li>
        <li>{t("the user violating the provisions of this article , the user shall solve the problem at his/her own expense and responsibility, and shall take appropriate measures not to cause any disadvantage, burden or damage to the Company. shall take action.")}</li>
        <li>{t("the user posts information about NFT on this service (including, but not limited to, transaction information such as explanatory items), regardless of whether or not it is copyrighted, part of the posted content You agree to transfer all copyrights (including the rights stipulated in Articles 27 and 28 of the Copyright Law) that may arise in part or in whole to our company free of charge. In addition, the user agrees that the Company shall have the right to use the content posted by the user without limitation regardless of the purpose.")}</li>
        <li>{t("The user may impose moral rights (publication rights, including the right to display name and the right to maintain identity.) shall not be exercised.")}</li>
      </ol>








<br/>
      <b>{t("Prohibited matter")}</b>
      <ol>
        <li>{t("The Company prohibits the acts specified in the following items when using this service by the user.")}</li>
        <ol type="a" style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
          <li>{t("Acts that violate these Terms")}</li>
          <li>{t("Infringement of property or personal rights such as intellectual property rights, patent rights, utility model rights, design rights, trademark rights, copyrights, portrait rights, etc. of the Company, licensors licensed by the Company, or other third parties Acts to do or acts that may infringe these")}</li>
          <li>{t("Acts that cause or may cause disadvantage or damage to the Company or a third party")}</li>
          <li>{t("Acts that unfairly damage the honor, rights, or credibility of others, or acts that are likely to do so")}</li>
          <li>{t("Acts that violate laws, ordinances, etc.")}</li>
          <li>{t("Acts that violate public order and morals, or acts that may violate public order and morals, or acts that provide information that may violate public order and morals to other users or third parties")}</li>
          <li>{t("Criminal acts, acts that lead to or encourage criminal acts, or acts that are likely to do so")}</li>
          <li>{t("Acts of providing information that is contrary to the facts or information that may be contrary to the facts")}</li>
          <li>{t("Unauthorized access to the Company's system, falsification of program code, intentional falsification of location information, cheating using communication device specifications and other applications, distribution of computer viruses and other acts that interfere with the normal operation of this service. or acts that may")}</li>
          <li>{t("Acts of using functions and tools that automate macros and operations")}</li>
          <li>{t("Acts that damage the credibility of this service, or acts that are likely to do so")}</li>
          <li>{t("Acts that may adversely affect the mental and physical health of young people and their healthy development")}</li>
          <li>{t("Acts of impersonating a third party and using this service by using another user's account or other methods")}</li>
          <li>{t("Posts that involve differences in personal thoughts such as politics and religion, or acts related to them")}</li>
          <li>{t("Business activities other than those permitted by the Company for this service, regardless of whether it is a corporation or an individual")}</li>
          <li>{t("Posting of information equivalent to obscenity, child pornography, or child abuse, or acts related thereto")}</li>
          <li>{t("Acts that lead to or may lead to crimes such as fraud, illegal trading of bank accounts and mobile phones")}</li>
          <li>{t("Acts of causing illegal gambling or gambling, or soliciting participation in illegal gambling or gambling")}</li>
          <li>{t("Acts related to money laundering, criminal proceeds, acts related to terrorist financing or acts suspected thereof")}</li>
          <li>{t("Acts that infringe on intellectual property rights related to NFTs issued by the Company")}</li>
          <li>{t("Other acts that the Company deems inappropriate")}</li>
        </ol>
        <li>{t("Judgment of whether or not it falls under the prohibited acts in the preceding paragraph shall be made at the discretion of the Company, and the Company shall not be held accountable for the judgment criteria.")}</li>
        <li>{t("If the Company determines that the user's conduct falls under any of the items in Paragraph 1, the Company may take any or all of the following measures without prior notice.")}</li>
        <ol type="a" style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
          <li>{t("Restrictions on use of this service")}</li>
          <li>{t("Withdrawal due to cancellation of this contract")}</li>
          <li>{t("Other acts that the Company deems necessary")}</li>
        </ol>
        <li>{t("The Company shall not be held responsible for any damage caused to the User by the measures in the preceding paragraph.")}</li>
      </ol>



      <br/>
      <b>{t("lift")}</b>

  <ol>
      <li>{t("If the user falls under any of the following items, our company shall be able to cancel this agreement and withdraw without any notice.")}</li>
    <li>{t("(1) If the user information contains false information")}</li>
    <li>{t("(2) If you have been withdrawn from our company in the past")}</li>
    <li>{t("(3) When the user's heir, etc. informs us that the user has died, or when we can confirm the fact of the user's death")}</li>
    <li>{t("(4) If a minor uses this service without the consent of a legal representative")}</li>
    <li>{t("(5) When an adult ward, person under curatorship, or person under assistance uses this service without the consent of the adult guardian, curator, or assistant, etc.")}</li>
    <li>{t("(6) Anti-social forces, etc. (organized gangs, gang members, those who have not been a gang member for less than 5 years, quasi-members, gang-affiliated companies, corporate racketeers, social movement trolls, political activity trolls, special intelligence If the Company determines that the User belongs to a violent group, etc. or a person equivalent thereto)")}</li>
    <li>{t("(7) If you do not respond in good faith to our request")}</li>
    <li>{t("(8) Other cases that the Company deems inappropriate")}</li>
  </ol>




  <br/>
      <b>{t("Confidentiality")}</b>

  <p>{t("The User shall not disclose or leak confidential information disclosed by the Company to a third party in connection with the provision of the Service. Confidential information refers to our technical information disclosed in connection with the introduction of this service, regardless of whether it is in writing, electromagnetic data, oral or any other form, or whether there is a confidential indication or explicit indication, or whether the scope is specified. , refers to business or management information.")}</p>
  <p>{t("The information in each of the following items shall not fall under Confidential Information.")}</p>
  <ol>
    <li>{t("(1) Information already in your possession at the time of disclosure")}</li>
    <li>{t("(2) Information that was already publicly known at the time of disclosure or information that subsequently became publicly known due to reasons not attributable to the user")}</li>
    <li>{t("(3) Information lawfully obtained from a third party after disclosure")}</li>
    <li>{t("(4) Information independently developed or created without relying on disclosed confidential information")}</li>
    <li>{t("(5) Information requested to be disclosed by law or court order")}</li>
  </ol>
  <p>{t("In the event of termination of this Agreement due to the termination of this Service, cancellation of this Agreement, or other reasons, the User shall promptly return or dispose of the Confidential Information in accordance with the Company's instructions. In addition, when disposing of confidential information, a method that cannot be reused shall be adopted.")}</p>









  <br/>
      <b>{t("Disclaimer")}</b>


  <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
  <li>{t("We do not guarantee the completeness, accuracy, effectiveness, etc. of the contents of this service .")}</li>
  <li>{t("When the user uses this service, the user may transition from this service to an affiliated company or external service related to this service. In that case, the user shall use this service and the external service after agreeing to the terms of use of the external service at his/her own responsibility. In addition, we do not guarantee the completeness, accuracy, effectiveness, etc. of the content of the external service.")}</li>
  <li>{t("Even if the user suffers damage due to the user not changing the user information, the company shall not take any responsibility.")}</li>
  <li>{t("Users are requested to use this service within the scope of laws and regulations. The Company shall not be held responsible for any violations of Japanese or foreign laws by the User in connection with the use of the Service.")}</li>
  <li>{t("The Company does not guarantee that the Service will not be interrupted, discontinued or otherwise damaged. In addition, in the cases set forth in the following items , the Company may suspend or change the Service without notifying the User, but in this case the Company shall not assume any responsibility, and the User may object . shall not be stated .")}</li>
  <p>{t("(1) the Company conducts maintenance, security measures, version management, updates, etc., for the Service;")}</p>
  <p>{t("(2) When the Company reasonably determines that it is difficult for the Company to provide the Service safely due to unauthorized access to the system necessary for the provision of the Service;")}</p>
  <p>{t("(3) Earthquakes, tsunamis, typhoons, heavy rains, heavy snowfalls and other natural disasters, wars, terrorism, civil strife, riots, public health emergencies such as infectious diseases, acts of the government or government agencies, labor disputes, power outages, interruption or suspension of telecommunications , if the Company reasonably determines that it has become difficult to provide the Service due to failure or malfunction of telecommunications equipment, transportation accidents, or other force majeure.")}</p>
  <li>{t("All equipment, communication means, and other environments necessary for receiving the provision of this service shall be provided at the user's expense and responsibility. In addition, all communication costs necessary for using this service shall be borne by the user.")}</li>
  <li>{t("Even if the user information is stolen due to unexpected unauthorized access, etc., the Company shall not be held responsible for any damages to the user caused by it.")}</li>
  <li>{t("The Company shall not be liable for any failure to comply with all or part of this Agreement due to acts of God, natural disasters, fires, strikes, embargoes, wars, civil strife, epidemics of infectious diseases, or other force majeure.")}</li>
  <li>{t("The Company shall not be liable for any increase in network fees stipulated in Article 7 or any other delays or failures of transactions in this blockchain or external services.")}</li>
  <li>{t("In addition to the provisions of the preceding paragraphs, the Company shall not be liable for any damages suffered by the User unless there is intentional or gross negligence on the part of the Company.")}</li>
  <li>{t("In the event that a user has trouble with another user (whether inside or outside the service) regarding the use of this service, our company shall not be held responsible for any troubles between users. shall be resolved by the user at their own expense and burden.")}</li>
</ol>



<br/>
      <b>{t("Liability for damages")}</b>

<p>1. {t("the User causes damage to the Company in connection with the violation of these Terms or the use of the Service, the User will compensate the Company for the damage (including lost profits and attorney's fees).")}</p>
<p>2. {t("Notwithstanding the provisions of these Terms except for the following paragraph, if the Company causes damage to the user due to reasons attributable to the Company, the Company shall be responsible for compensating for the damage only within the scope set forth in each of the following items.")}</p>
<ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
  <li>{t("(1) In case of willful misconduct or gross negligence of our company: full amount of the damage")}</li>
  <li>{t("(2) In the case of slight negligence on the part of the Company: within the scope of actual and direct ordinary damages (excluding special damages, lost profits, indirect damages, and attorneys' fees), with an upper limit of 10,000 yen.")}</li>
</ol>
<p>{t("Notwithstanding the preceding paragraph, if the user is a corporation or if an individual uses this service as a business or for the purpose of business, unless there is intentional or gross negligence on the part of the company, We are not responsible for any damages incurred. In addition, when the Company compensates for damage, the maximum amount received as the service usage fee of the user in the most recent one year from the date of occurrence of the damage will be the upper limit.")}</p>




<br/>
<b>{t("Abolition of this service")}</b>
<p>1. {t("The Company may terminate the provision of the Service at any time for the convenience of the Company.")}</p>
<p>2. {t("In the case of the preceding paragraph, unless there is intentional or gross negligence on the part of the Company, the Company shall not assume any responsibility.")}</p>


<br/>
<b>{t("Responding to inquiries")}</b>
<p>1. {t("We will endeavor to respond to inquiries from users regarding this service, but we will not be obligated to respond unless we are obligated or responsible under the law or this agreement.")}</p>
<p>2. {t("The Company shall not be obligated to disclose the criteria for whether or not to respond to inquiries from users.")}</p>


<br/>
<b>{t("Survival Clause")}</b>
<p>{t("The term of validity of this agreement shall be from the time this agreement is established until the user withdraws from this service.")}</p>
<p>{t("In addition, even after the termination of this agreement, the The provisions of Article 16, Article 17, Clause 4, Article 18, Clauses 3 and 4, and Articles 20 to 30 shall remain in effect, and the provisions of Article 19 shall terminate this Agreement. shall remain in force for the next five years.")}</p>


<br/>
<b>{t("Separability")}</b>
<p>{t("Even if some of the provisions of these Terms are deemed invalid based on laws and regulations, other provisions of these Terms will remain valid.")}</p>
<p>{t("Even if a part of the provisions of this agreement is invalid or canceled in relation to a user, this agreement will be valid in relation to other users.")}</p>


<br/>
<b>{t("How to deal with violations")}</b>
<p>{t("If the User finds any act that violates these Terms, please contact the Company.")}</p>
<p>{t("The User shall not be able to file an objection regarding the Company's handling of acts that violate these Terms.")}</p>


<br/>
<b>{t("Transfer of Status, etc.")}</b>
<p>{t("The User may, without prior written or electronic consent of the Company, assign, transfer, set collateral, or No other disposal is possible.")}</p>


<br/>
<b>{t("Governing law")}</b>
<p>{t("All laws and ordinances of Japan shall apply to the governing law concerning these Terms.")}</p>


<br/>
<b>{t("Jurisdiction")}</b>
<p>{t("All lawsuits between the user and the Company shall be subject to the exclusive jurisdiction of the Tokyo District Court or the Tokyo Summary Court as the court of first instance, depending on the amount in dispute.")}</p>



<br/>
<b>{t("others")}</b>
<p>{t("The user shall comply with any matters not stipulated in this Agreement, if the Company separately stipulates the details, etc. In this case, the details, etc. shall be integrated with these Terms.")}</p>
<p>{t("The details, etc. shall take effect from the time they are posted in the places designated by the Company.")}</p>
<p>{t("If there is a conflict between the details, etc. and the contents of this agreement, this agreement shall take precedence.")}</p>



<b>{t("Supplementary provision")}</b><br/>
<b>{t("2023 years Established and enforced")}</b>
{/* 
      <p>
        Article 1 Application
        <br />
        The purpose of these Terms of Use is to define the conditions of
        provision of the Service and the relationship of rights and obligations
        between the Company and the user with respect to use of the Service, and
        shall apply to all relationships between the user and the Company with
        respect to use of the Service.
        <br />
        Rules, etc. regarding use of the Service posted on the Company's website
        by the Company shall constitute a part of this Agreement.
        <br />
        In the event of any discrepancy between the contents of this Agreement
        and the rules and other explanations of the Service outside of this
        Agreement, the provisions of this Agreement shall take precedence.
        <br />
        The User shall use the Service upon agreeing to the terms of this
        Agreement.
        <br />
        Article 2.
        <br />
        The User may use the Services to purchase works of art, such as
        celluloid pictures (hereinafter referred to as &quot;Works, etc.&quot;).
        (hereinafter referred to as &quot;NFT&quot;) that certifies that the
        user is the owner of the work, etc., issued based on the ownership of
        the work, etc. (hereinafter referred to as &quot;Work, etc.&quot;).
        (hereinafter referred to as &quot;the Company&quot;), which certifies
        that the Company is the owner of the relevant work, etc. (hereinafter
        referred to as &quot;the Work, etc.&quot;). The NFTs handled by the
        Company do not fall under the category of &quot;cryptographic
        assets&quot; under the Act on the Settlement of Funds.
        <br />
        In addition to selling NFTs on the Service to users, the Company may
        earn commissions determined separately by the Company according to the
        transaction status of NFTs displayed and purchased by users.
        <br />
        Users may purchase NFTs from the Company on the Service, and may list or
        purchase NFTs among registered users.
        <br />
        The Company shall manage and store the original works, etc. owned by the
        User based on the NFT purchased by the User on the Service.
        <br />
        When a user withdraws from the Service, the user may request the
        delivery of the original works, etc. owned based on NFTs held by the
        user at the time of withdrawal from the Service. Upon completion of the
        prescribed procedures, such as deactivation of the NFT, etc., the
        Company shall deliver the original of the relevant work, etc. to the
        user.
        <br />
        After a user purchases an NFT offered by us or another user on the
        Service, and payment for the purchase is completed on the Service, the
        NFT will be reflected in the user's account. At this point, the user who
        purchased such NFTs shall obtain the right to use them within the scope
        specified for each NFT.
        <br />
        The rights included in the NFTs sold through the Service shall be the
        rights specified in the Service, and all other rights shall belong to
        the original creator or other right holders as separately specified.
        <br />
        The User may use the images displayed based on the NFT only within the
        scope of private use. The User may not, without the express permission
        of the original creator, copy, download, stream, capture, archive,
        upload, publish, republish, distribute, sell, resell, modify, create
        derivative works from, distribute, sell, or otherwise use the image data
        or framed pictures or other benefits beyond personal use, including but
        not limited to commercial use. The User may not use the Service for any
        purpose other than personal use.
        <br />
        The User may not possess or claim delivery of the original work owned
        under the purchased NFT while using the Service.
        <br />
        (3) While using the Service, users may not sell, transfer, pledge,
        assign, or pledge the originals of works, etc. owned based on purchased
        NFTs to third parties outside the Service.
        <br />
        Users are solely responsible for their own actions in connection with
        the sale or purchase of items among themselves. Except in cases where we
        list an item for sale, we do not conduct the exchange ourselves, are not
        entrusted to conduct the exchange, and are not involved in any way in
        the execution of the exchange.
        <br />
        In the event that any fraudulent act related to payment or any other
        violation of the terms and conditions of this service or the usage
        method, etc. is discovered after the payment for the NFT purchase is
        completed and the NFT has been sent, the Company may, without prior
        notice or demand, collect or revoke the NFT sent to you and invalidate
        your ownership of the NFT.
        <br />
        Article 3 Registration
        <br />
        Any person who wishes to use the Service (hereinafter referred to as
        &quot;Applicant&quot;) (hereinafter referred to as the
        &quot;Applicant&quot;) agrees to abide by these Terms of Use and
        provides certain information as determined by the Company (hereinafter
        referred to as the &quot;Registration Items&quot;) to the Company in the
        manner prescribed by the Company. The Company will determine the
        registration method and the registration items in accordance with the
        Company's standards.
        <br />
        (2) The Company shall determine whether or not to register the applicant
        who has applied for registration in accordance with the Company's
        standards in accordance with Paragraph 1 (hereinafter referred to as the
        &quot;Registration Applicant&quot;). If the Company approves the
        registration, the Company will notify the Applicant of such approval or
        disapproval. The registration of the applicant as a user shall be deemed
        to have been completed when the Company has given the notice in this
        section.
        <br />
        Upon completion of the registration as stipulated in the preceding
        paragraph, a service use contract will be established between the
        registered user and the Company, and the user will be able to use the
        Service in accordance with these Terms.
        <br />
        The Company may refuse registration and re-registration if any of the
        following items applies to the applicant for registration, and the
        Company shall not be obligated to disclose any reason for such refusal.
        <br />
        01&#65306;When all or part of the registration information provided to
        the Company is false, erroneous, or omitted.
        <br />
        02&#65306;When the applicant is a minor, an adult ward, a person under
        curatorship, or a person under assistance, and has not obtained the
        consent of his/her legal representative, guardian, curator, or
        assistant.
        <br />
        03: If you are an anti-social force, etc. (meaning a crime syndicate, a
        member of a crime syndicate, a right-wing organization, an anti-social
        force, or any other person equivalent thereto. The same shall apply
        hereinafter) or is involved in any interaction or involvement with
        antisocial forces, etc., such as cooperating or being involved in the
        maintenance, operation, or management of antisocial forces, etc.,
        through funding or other means.
        <br />
        04&#65306;When the Company determines that the applicant has violated a
        contract with the Company in the past or is related to such violators.
        <br />
        05&#65306;If you have been subjected to any of the measures stipulated
        in Article 10 (Cancellation of Registration, etc.)
        <br />
        06&#65306;When we deem that the registration is not appropriate for any
        other reason.
        <br />
        Article 4 Changes in Registered Information
        <br />
        In the event of any change in the registered information, the user shall
        notify the Company of such change without delay in a manner determined
        by the Company.
      </p>
      <p>
        Article 5 Management of User ID and Password
        <br />
        User shall, at its own responsibility, properly manage and store its
        user ID and password for the Service, and shall not allow any third
        party to use it, or lend, transfer, transfer, change the name of, sell,
        or otherwise deal with it.
        <br />
        The User shall be responsible for any damages caused by inadequate
        management of the user ID and password, etc., errors in use, or use by a
        third party.
        <br />
        Article 6 Use of Service
        <br />
        The User may use the Service only during the period of valid
        registration as a User, within the scope of the purpose of this
        Agreement and without violating this Agreement, and in accordance with
        the method prescribed by the Company.
        <br />
        The preparation (including installation of necessary applications) and
        maintenance of computers, software and other equipment,
        telecommunication lines and other telecommunication environment, etc.
        necessary for the provision of the Service shall be at the expense and
        responsibility of the User. The User shall be responsible for the
        preparation (including installation of necessary applications) and
        maintenance of the computer, software and other equipment,
        telecommunication lines and other telecommunication environment, etc.
        necessary to receive the Service at the User's expense and
        responsibility.
        <br />
        User shall, at User's expense and responsibility, take security measures
        to prevent computer virus infection, unauthorized access, and
        information leakage, etc., in accordance with User's environment for
        using the Service.
        <br />
        User shall indemnify and hold Company harmless from any damages caused
        by User's violation of these Terms of Use or in connection with User's
        use of the Service.
        <br />
        Article 7 Exhibits and Purchases
        <br />
        Users who list their NFTs on the Service (hereinafter referred to as
        &quot;Sellers&quot;) (hereinafter referred to as the
        &quot;Exhibitor&quot;) who lists NFTs in his/her possession on the
        Service may cancel the listing until an exchange contract is concluded.
        Once an exchange contract has been concluded, such contract may not be
        cancelled.
        <br />
        Purchases may be made by exchanging the item for cryptographic assets
        designated by the Seller and the Company.
        <br />
        A user who purchases an NFT listed on the Service (hereinafter referred
        to as &quot;purchaser&quot;) The exchange contract between the Company
        or the seller and the purchaser for the NFTs and the cryptographic
        assets designated by the Company will be established when the purchase
        button is clicked by the user who purchases the NFTs listed on the
        Service (hereinafter referred to as the &quot;Purchaser&quot;). The
        purchaser may not cancel the exchange contract after it has been
        concluded, and may not claim the invalidity or cancellation of the
        concluded transaction for any reason.
        <br />
        When an exchange agreement is concluded, the purchaser shall exchange
        the cryptographic assets designated by the Company or the Seller for the
        product, and the balance of the cryptographic assets in the purchaser's
        cryptographic assets trading account shall be reduced at the time the
        exchange agreement is concluded.
        <br />
        At the time of reflection on the NFT account, the purchaser shall
        acquire the goods pertaining to such exchange agreement and the seller
        shall acquire the cryptographic assets less the sales commission for
        such exchange agreement, and the balance of NFT in the purchaser's NFT
        account and the balance of cryptographic assets in the seller's
        cryptographic assets trading account shall be increased.
        <br />
        In the event that an exhibitor violates these Terms and Conditions, or
        in the event that the Company deems that an exhibitor has made an
        exhibit that does not truly intend to enter into an exchange agreement,
        or in the event that the Company deems that an exhibit is otherwise
        inappropriate, the Company may void the exhibit without prior notice to
        the exhibitor. In the event that an auction becomes invalid, the Company
        may invalidate the purchase of the relevant auction.
        <br />
        The Company does not guarantee the conclusion of an exchange contract
        between users.
        <br />
        Article 8. Commission
        <br />
        The seller shall pay to the Company a commission calculated by
        multiplying the NFT exchange price by a rate determined separately by
        the Company, in the cryptographic assets designated by the Company at
        the time the exchange contract is concluded.
      </p>
      <p>
        Article 9 Prohibited Matters
        <br />
        In using the Service, the User shall not engage in any of the following
        acts or acts that the Company deems to fall under any of the following
        items.
        <br />
        01: Actions that violate laws and regulations or are related to criminal
        acts
        <br />
        02: Fraudulent or threatening acts against the Company, other users of
        the Service, or other third parties
        <br />
        03: Acts that offend public order and morals
        <br />
        04: Acts that infringe on the intellectual property rights, portrait
        rights, privacy rights, honor, or other rights or interests of the
        Company, other users of the Service, or other third parties.
        <br />
        05: Any act of using dishonest means, plans, or techniques, or making
        false or misleading representations with respect to important matters in
        connection with the exchange of NFTs, etc.
        <br />
        06: An act that constitutes or attempts to constitute a double transfer
        of NFTs.
        <br />
        07: An act of exhibiting or purchasing without truly intending to
        conclude an exchange contract.
        <br />
        08: The following acts committed for the purpose of fluctuating the
        price of NFTs
        <br />
        Dissemination to an unspecified number of persons of facts without
        reasonable grounds that the actor does not have direct experience of or
        is not aware of
        <br />
        (iii) To commit a fraudulent act by means of which another person is led
        into a false impression Engaging in words or deeds that gratuitously
        stir up the gambling spirit of others
        <br />
        Using assault or threats.
        <br />
        09: Selling, buying, selling, transferring, pledging, or pledging works,
        etc. to a third party, etc. outside of this service.
        <br />
        10: To place an excessive load on the Service's network or system, etc.
        <br />
        11: Reverse engineering or other analysis of software or other systems
        provided by the Company
        <br />
        12: Acts that may interfere with the operation of this service
        <br />
        13: Unauthorized access to the Company's network or systems, etc.
        <br />
        14: Impersonation of a third party
        <br />
        15: Use of IDs or passwords of other users of the Service
        <br />
        16: Advertisement, advertising, solicitation, or sales activities on the
        Service that are not authorized in advance by the Company
        <br />
        17: Collection of information of other users of the Service
        <br />
        18: Acts that cause disadvantage, damage, or discomfort to the Company,
        other users of the Service, or other third parties.
        <br />
        19: Actions that violate the rules regarding the use of the Service
        posted on the Company's website.
        <br />
        20&#65306;Profiteering to antisocial forces, etc.
        <br />
        21: Other acts that the Company deems inappropriate.
        <br />
        In the event that the Company deems that a user of the Service falls
        under or is likely to fall under any of the items of the preceding
        paragraph, the Company may, at its discretion and without prior notice
        to the user, take measures such as deletion or suspension of the user's
        NFT account.
      </p> */}
    </div>
  );
}
