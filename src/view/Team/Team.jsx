import React,{ useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Team = () => {

  useEffect(() => {
    // Scroll to the top of the page when this component mounts
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();
  const data = {
    companyName: t("AQUA Co.,Ltd."),
    address: t("6-19 Kandamachi, Gifu-shi, Gifu-ken 500-8833 japan"),
    capitalAmount: t("10,000,000 yen"),
    CEO: t("Saito harutaka"),
    mailAddress: t("info@aqua.sh"),
  };

  return (
    <div className="bg-white shadow-md rounded my-6 max-w-[1300px] mx-auto">
      <table className="text-left w-full border-collapse">
        <thead></thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td className="py-4 px-6 border-b border-grey-light font-bold uppercase">
                {t(key)}
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                {t(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
