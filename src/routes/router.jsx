import { createBrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import MainLayout from '../components/MainLayout/MainLayout';
import MainLayout from '../components/MainLayouts/MainLayouts';
import Home from '../components/Home/Home';
import Campaign from '../components/Campaign/Campaign';
// import Dashboard from '../components/Dashboard/Dashboard';

// import Details from '../components/Details/Details';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
// import Private from '../components/Private/Private';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import AddCampaign from '../components/AddCampaign/AddCampaign';
import Private from '../components/Private/Private';
// import UpdateProfile from '../components/UpdateProfile/UpdateProfile';
// import HowToHelp from '../components/HowToHelp/HowToHelp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Helmet>
              <title>Home || Winter Clothing Donation</title>
            </Helmet>
            <Home />
          </>
        ),
        // loader: async () => {
        //   const campaignsRes = await fetch('/campaign.json');
        //   const campaignsData = await campaignsRes.json();
        //   return { campaignsData };
        // },
      },
      // {
      //   path: '/campaigns',
      //   element: (
      //     <>
      //       <Helmet>
      //         <title>Campaigns || Winter Clothing Donation</title>
      //       </Helmet>
      //       <Campaign />
      //     </>
      //   ),
      //   loader: () => fetch('/campaign.json'),
      // },
      // {
      //   path: '/dashboard',
      //   element: (
      //     <Private>
      //       <>
      //         <Helmet>
      //           <title>Dashboard || Winter Clothing Donation</title>
      //         </Helmet>
      //         <Dashboard />
      //       </>
      //     </Private>
      //   ),
      // },
      // {
      //   path: '/help',
      //   element: (
      //     <>
      //       <Helmet>
      //         <title>help || Winter Clothing Donation</title>
      //       </Helmet>
      //       <HowToHelp />
      //     </>
      //   ),
      // },
      // {
      //   path: '/details/:id',
      //   element: (
      //     <Private>
      //       <>
      //         <Helmet>
      //           <title>Campaign Details || Winter Clothing Donation</title>
      //         </Helmet>
      //         <Details />
      //       </>
      //     </Private>
      //   ),
      //   loader: async ({ params }) => {
      //     const res = await fetch('/campaign.json');
      //     const data = await res.json();
      //     const singleData = data.find(d => d.id == params.id);
      //     return singleData;
      //   },
      // },
      {
        path: '/addCampaign',
        element: (
          <>
            <Private>
              <Helmet>
                <title>Login || Winter Clothing Donation</title>
              </Helmet>
              <AddCampaign />
            </Private>
          </>
        ),
      },
      {
        path: '/login',
        element: (
          <>
            <Helmet>
              <title>Login || Winter Clothing Donation</title>
            </Helmet>
            <Login />
          </>
        ),
      },
      {
        path: '/register',
        element: (
          <>
            <Helmet>
              <title>Register || Winter Clothing Donation</title>
            </Helmet>
            <Register />
          </>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <>
            <Helmet>
              <title>Forgot Password || Winter Clothing Donation</title>
            </Helmet>
            <ForgotPassword />
          </>
        ),
      },
      // {
      //   path: '/update-profile',
      //   element: (
      //     <Private>
      //       <>
      //         <Helmet>
      //           <title>Update Profile || Winter Clothing Donation</title>
      //         </Helmet>
      //         <UpdateProfile />
      //       </>
      //     </Private>
      //   ),
      // },
    ],
  },
]);

export default router;
