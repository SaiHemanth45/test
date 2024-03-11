import { useCallback, useEffect, useReducer } from 'react';
import { Auth } from 'aws-amplify';
import { amplifyConfig } from "../Config/index";
import { Hub } from 'aws-amplify';
import { AuthContext } from './AuthContext';
export const paths = {
    index: "/",
    checkout: "/checkout",
    contact: "/contact",
    pricing: "/pricing",
    auth: {
      auth0: {
        callback: "/auth/auth0/callback",
        login: "/auth/auth0/login",
      },
      jwt: {
        login: "/auth/jwt/login",
        register: "/auth/jwt/register",
      },
      firebase: {
        login: "/auth/firebase/login",
        register: "/auth/firebase/register",
      },
      amplify: {
        confirmRegister: "/auth/confirm-register",
        forgotPassword: "/auth/forgot-password",
        login: "/auth/login",
        register: "/auth/register",
        resetPassword: "/auth/reset-password",
      },
    },
    authDemo: {
      forgotPassword: {
        classic: "/auth-demo/forgot-password/classic",
        modern: "/auth-demo/forgot-password/modern",
      },
      login: {
        classic: "/auth-demo/login/classic",
        modern: "/auth-demo/login/modern",
      },
      register: {
        classic: "/auth-demo/register/classic",
        modern: "/auth-demo/register/modern",
      },
      resetPassword: {
        classic: "/auth-demo/reset-password/classic",
        modern: "/auth-demo/reset-password/modern",
      },
      verifyCode: {
        classic: "/auth-demo/verify-code/classic",
        modern: "/auth-demo/verify-code/modern",
      },
    },
    dashboard: {
      index: "/",
      account: {
        index: "/account",
        details: "/account/:id",
      },
      reminders: "/reminders",
      fileManager: {
        index: "/file-manager",
        details: "/file-manager/:folderId",
      },
      fileManagerSearch: {
        index: "/search"
      },
      admin: {
        index: "/admin",
        manageporfolio: "/admin/portfolios",
        manageporfolioinfo: "/admin/portfolios/details/:key",
        createnewporfolio: "/admin/portfolios/create",
        editporfolioinfo: "/admin/portfolios/details/:key/edit",
        editporfolioinfosettings: "/admin/portfolios/details/:key/edit-settings",
        addNewClient: "/admin/portfolios/details/:key/add-client",
        clientInfo: "/admin/portfolios/details/:key/client/:clientKey",
        editClientInfo: "/admin/portfolios/details/:key/client/:clientKey/edit",
        editClientSettings: "/admin/portfolios/details/:key/client/:clientKey/settings",
        groupSettings: "/admin/portfolios/details/:key/client/:clientKey/group-settings/:groupKey",
        addPortfolioDocuments: "/admin/portfolios/details/:key/add-documents",
        addClientDocuments: "/admin/portfolios/details/:key/client/:clientKey/add-documents",
        contactplan: {
          index: "/admin/contactplan",
          createnewcontactplan: "/admin/contactplan/create",
          contactplaninfo: "/admin/contactplan/details",
          editplaninfo: "/admin/contactplan/details/edit",
          addstep: "/admin/contactplan/details/planschedule/addstep",
          editstep: "/admin/contactplan/details/planschedule/editstep"
        }
  
      },
      emailEventInitiator: {
        index: "/email-event-initiator",
      },
      supervisor: {
        index: '/approval-requests'
      }
    },
    components: {
      index: "/components",
      dataDisplay: {
        detailLists: "/components/data-display/detail-lists",
        tables: "/components/data-display/tables",
        quickStats: "/components/data-display/quick-stats",
      },
      lists: {
        groupedLists: "/components/lists/grouped-lists",
        gridLists: "/components/lists/grid-lists",
      },
      forms: "/components/forms",
      modals: "/components/modals",
      charts: "/components/charts",
      buttons: "/components/buttons",
      typography: "/components/typography",
      colors: "/components/colors",
      inputs: "/components/inputs",
    },
    docs: "https://material-kit-pro-react-docs.devias.io",
    401: "/401",
    404: "/404",
    500: "/500",
  };
  
export const AuthProvider = (props) => {
    Auth.configure({
        userPoolId: amplifyConfig.aws_user_pools_id,
        userPoolWebClientId: amplifyConfig.aws_user_pools_web_client_id,
        region: amplifyConfig.aws_cognito_region
      });
    const handlers = {
        INITIALIZE: (state, action) => {
          const { isAuthenticated, user } = action.payload;
      
          return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
          };
        },
        SIGN_IN: (state, action) => {
          const { user } = action.payload;
      
          return {
            ...state,
            isAuthenticated: true,
            user
          };
        },
        SIGN_OUT: (state) => ({
          ...state,
          isAuthenticated: false,
          user: null
        })
      };
      var ActionType;
(function (ActionType) {
  ActionType['INITIALIZE'] = 'INITIALIZE';
  ActionType['SIGN_IN'] = 'SIGN_IN';
  ActionType['SIGN_OUT'] = 'SIGN_OUT';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};
    const reducer = (state, action) => (handlers[action.type]
        ? handlers[action.type](state, action)
        : state);
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const initialize = useCallback(async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({
          bypassCache: true
        });
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user: {
              id: user.attributes.sub,
              avatar: '/assets/avatars/avatar-anika-visser.png',
              email: user.attributes.email,
              name: user.attributes.given_name,
              role: user.attributes["custom:role"]
            }
          }
        });
      } catch (error) {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    }, [dispatch]);
  
    useEffect(() => {
      initialize();
    },
      // eslint-disable-next-line
      []);
  
    const signOut = useCallback(async () => {
      // try {
      //   const response = await deleteO(`/telephonyservice/v1/api/telephony`, null, null)
      // } catch (e) {
      //   console.error(e)
      // }
      await Auth.signOut();
      dispatch({
        type: ActionType.SIGN_OUT
      });
    }, [dispatch]);
  
    const signIn = useCallback(async (email, password) => {
      const user = await Auth.signIn(email, password);
  
      if (user.challengeName) {
        console.error(`Unable to login, because challenge "${user.challengeName}" is mandated and we did not handle this case.`);
        return;
      }
  
      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: {
            id: user.attributes.sub,
            avatar: '/assets/avatars/avatar-anika-visser.png',
            email: user.attributes.email,
            name: user.attributes.given_name,
            role: user.attributes["custom:role"]
  
          }
        }
      });
    }, [dispatch]);
  
    const signUp = useCallback(async (firstName, lastName, phoneNumber, email, password, role) => {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          'given_name': firstName,
          'family_name': lastName,
          'phone_number': '+91' + phoneNumber,
          email,
          'custom:role': role.toString()
        },
        autoSignIn: {
          enabled: true,
        }
      });
    }, []);
  
    const confirmSignUp = useCallback(async (username, code) => {
      await Auth.confirmSignUp(username, code);
      listenToAutoSignInEvent();
    }, []);
  
    const resendSignUp = useCallback(async (username) => {
      await Auth.resendSignUp(username);
    }, []);
  
    const forgotPassword = useCallback(async (username) => {
      await Auth.forgotPassword(username);
    }, []);
  
    const forgotPasswordSubmit = useCallback(async (username, code, newPassword) => {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
    }, []);
  
    const listenToAutoSignInEvent = useCallback(() => {
      Hub.listen('auth', ({ payload }) => {
        const { event } = payload;
        if (event === 'autoSignIn') {
          const user = payload.data;
          dispatch({
            type: ActionType.SIGN_IN,
            payload: {
              user: {
                id: user.attributes.sub,
                avatar: '/assets/avatars/avatar-anika-visser.png',
                email: user.attributes.email,
                name: user.attributes.given_name,
                role: user.attributes["custom:role"]
              }
            }
          });
          window.location.href = paths.dashboard.index;
          // assign user
        } else if (event === 'autoSignIn_failure') {
          window.location.href = paths.auth.amplify.login;
        }
      })
    }, [dispatch]);
  
    return (
      <AuthContext.Provider
        value={{
          ...state,
        //   issuer: Issuer.Amplify,
          issuer: "Amplify",
          signIn,
          signUp,
          confirmSignUp,
          resendSignUp,
          forgotPassword,
          forgotPasswordSubmit,
          signOut
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };