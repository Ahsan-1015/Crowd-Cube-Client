import { createBrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import MainLayout from '../components/MainLayouts/MainLayouts';
import Home from '../components/Home/Home';
import Campaign from '../components/Campaign/Campaign';

import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

import ErrorPage from '../components/ErrorPage/ErrorPage';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import AddCampaign from '../components/AddCampaign/AddCampaign';

import Private from '../components/Private/Private';
import MyDonation from '../components/MyDonation/MyDonation';
import MyCampaign from '../components/myCampaign/myCampaign';
import Details from '../components/Details/Details';
import SuccessRate from '../components/SucessRate/SucessRate';

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
              <title>Home || Crowd Cube</title>
            </Helmet>
            <Home />
          </>
        ),
      },
      {
        path: '/campaigns',
        element: (
          <>
            <Helmet>
              <title>Campaigns || Crowd Cube</title>
            </Helmet>
            <Campaign />
          </>
        ),
        loader: async () => {
          // Fetch user data to pre-fill the form
          const campaignRes = await fetch(
            'https://crowd-cube-server-ruby.vercel.app/campaigns'
          );
          const campaignData = await campaignRes.json();
          return campaignData;
        },
      },

      {
        path: '/campaigns/:id',
        element: (
          <Private>
            <>
              <Helmet>
                <title>Campaign Details || Crowd Cube</title>
              </Helmet>
              <Details />
            </>
          </Private>
        ),
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `https://crowd-cube-server-ruby.vercel.app/campaigns/${params.id}`
            );

            if (!res.ok) {
              if (res.status === 404) {
                throw new Response('Campaign not found', { status: 404 });
              }
              throw new Error('Failed to fetch campaign details');
            }

            const campaign = await res.json();
            return campaign;
          } catch (error) {
            console.error(error);
            throw new Response('An error occurred', { status: 500 });
          }
        },
      },
      {
        path: '/addCampaign',
        element: (
          <>
            <Private>
              <Helmet>
                <title>Add Campaign || Crowd cube</title>
              </Helmet>
              <AddCampaign />
            </Private>
          </>
        ),
      },
      {
        path: '/myCampaign',
        element: (
          <>
            <Private>
              <Helmet>
                <title>My Campaign || Crowd cube</title>
              </Helmet>
              <MyCampaign />
            </Private>
          </>
        ),
      },
      {
        path: '/myDonations',
        element: (
          <>
            <Private>
              <Helmet>
                <title>My Donation || Crowd cube</title>
              </Helmet>
              <MyDonation />
            </Private>
          </>
        ),
      },

      {
        path: '/success-rate',
        element: (
          <>
            <Helmet>
              <title>Success Rate || Crowd cube</title>
            </Helmet>
            <SuccessRate />
          </>
        ),
      },
      {
        path: '/login',
        element: (
          <>
            <Helmet>
              <title>Login || Crowd cube</title>
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
              <title>Register || Crowd cube</title>
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
              <title>Forgot Password || Crowd cube</title>
            </Helmet>
            <ForgotPassword />
          </>
        ),
      },
    ],
  },
]);

export default router;
