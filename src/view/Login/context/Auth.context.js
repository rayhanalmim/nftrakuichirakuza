import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useSetState } from "react-use";
import Swal from "sweetalert2";
import { signUp } from "../../../graphql/mutations/signUp";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { signIn } from "../../../graphql/queries/signIn";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  debugInfo: null,
};

export const ContextProvider = (props) => {
  const [state, setState] = useSetState(initialState);

  const [signUpUser, { loading: signUpLoading, error: signUpError }] =
    useMutation(signUp);
  const [signInUser, { loading: signInLoading, error: signInError }] =
    useLazyQuery(signIn);

  const { account } = useWeb3React();

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });
  const setDebugInfo = (debugInfo) => setState({ debugInfo });

  const login = async (referral) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    const deviceType =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? "mobile"
        : "desktop";

    setDebugInfo(
      `Starting login with account: ${account} | Device: ${deviceType} | Referral: ${referral}`
    );

    if (!account) {
      const error = new Error("Wallet account not detected.");
      setLoginError(error);
      setLoginPending(false);
      return;
    }

    try {
      const result = await signUpUser({
        variables: {
          wallet: account, // ✅ correct
          referralUrl: referral, //
          device: deviceType,
        },
      });

      console.log("SignUp Mutation Result:", result);

      // Proceed to login

      signInUser({
        variables: { walletAddress: account },
      });

      setLoginSuccess(true);
      setLoginPending(false);
    } catch (err) {
      console.error("SignUp Mutation Error:", err);
      setLoginError(err);
      setLoginPending(false);
    }
  };

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
    setDebugInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// Enhanced login with better error handling
const fetchLogin = (refferal, account, signUpUser, signInUser, callback) => {
  // Display more consistent debugging info
  //test
  let debugInfo = `Attempting login with account: ${account}, referral: ${refferal}`;

  if (!account) {
    debugInfo += " - ERROR: Missing account!";
    return callback(new Error("Wallet not connected properly"), debugInfo);
  }

  if (!refferal) {
    debugInfo += " - ERROR: Missing referral code!";
    return callback(new Error("Input Referral Code"), debugInfo);
  }

  try {
    // First check if user exists - only pass wallet parameter
    signInUser({
      variables: {
        wallet: account,
      },
      fetchPolicy: "network-only", // Force a network request to avoid caching issues
    })
      .then((res) => {
        debugInfo += `\nSignIn API response received: ${
          res.data ? "success" : "failed"
        }`;

        if (!res.data || res.data.signIn == null) {
          debugInfo += "\nUser does not exist, creating new user";
          // User doesn't exist, create new account
          signUpUser({
            variables: {
              wallet: account,
              referralUrl: refferal,
            },
          })
            .then((signUpRes) => {
              debugInfo += "\nSignUp successful";
              return callback(null, debugInfo);
            })
            .catch((err) => {
              debugInfo += `\nSignUp error: ${err.message}`;
              return callback(
                new Error(`Account creation failed: ${err.message}`),
                debugInfo
              );
            });
        } else {
          debugInfo += "\nUser already exists, proceeding with login";
          return callback(null, debugInfo);
        }
      })
      .catch((err) => {
        debugInfo += `\nSignIn API error: ${err.message}`;

        // If the error is a 400, let's try to create the user anyway
        if (err.message.includes("400")) {
          debugInfo += "\nGot a 400 error, attempting to create user anyway";

          signUpUser({
            variables: {
              wallet: account,
              referralUrl: refferal,
            },
          })
            .then((signUpRes) => {
              debugInfo += "\nSignUp successful after 400 error";
              return callback(null, debugInfo);
            })
            .catch((signUpErr) => {
              debugInfo += `\nSignUp after 400 error failed: ${signUpErr.message}`;
              return callback(
                new Error(`Login failed: ${err.message}`),
                debugInfo
              );
            });
        } else {
          return callback(err, debugInfo);
        }
      });
  } catch (e) {
    debugInfo += `\nUnexpected error: ${e.message}`;
    return callback(e, debugInfo);
  }
};
