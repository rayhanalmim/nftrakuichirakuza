import { useNavigate } from "react-router-dom";

export const Button = ({ title, linkURL }) => {
  const navigate = useNavigate();
  console.log(linkURL);
  return (
    <>
      <button
        type={title == "Submit" ? "submit" : null}
        className=" bg-[url('/assets/buttonbg.png')] bg-no-repeat rounded-lg  text-white text-md px-5 py-2 capitalize  justify-center items-center z-[100]"
        onClick={linkURL ? () => navigate(linkURL) : null}
      >
        {title}
      </button>
    </>
  );
};
