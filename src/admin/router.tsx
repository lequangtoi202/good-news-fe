import { Suspense, lazy } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

export const Crypto = Loader(lazy(() => import('../admin/content/dashboards/Crypto')));

// Applications

export const Messenger = Loader(lazy(() => import('../admin/content/applications/Messenger')));
export const UsersManagement = Loader(lazy(() => import('../admin/content/applications/UserManagement')));
export const AuthorsManagement = Loader(lazy(() => import('../admin/content/applications/AuthorManagement')));
export const UpdateAuthor = Loader(
  lazy(() => import('../admin/content/applications/AuthorManagement/feature/UpdateAuthor')),
);
export const TagsManagement = Loader(lazy(() => import('../admin/content/applications/TagManagement')));
export const AddTag = Loader(lazy(() => import('../admin/content/applications/TagManagement/feature/CreateTag')));
export const UpdateTag = Loader(lazy(() => import('../admin/content/applications/TagManagement/feature/UpdateTag')));
export const CategoriesManagement = Loader(lazy(() => import('../admin/content/applications/CategoryManagement')));
export const AddCategory = Loader(
  lazy(() => import('../admin/content/applications/CategoryManagement/feature/CreateCategory')),
);
export const UpdateCategory = Loader(
  lazy(() => import('../admin/content/applications/CategoryManagement/feature/UpdateCategory')),
);
export const PermissionManagement = Loader(lazy(() => import('../admin/content/applications/PermissionManagement')));
export const AddPermission = Loader(
  lazy(() => import('../admin/content/applications/PermissionManagement/feature/CreatePermission')),
);
export const UpdatePermission = Loader(
  lazy(() => import('../admin/content/applications/PermissionManagement/feature/UpdatePermission')),
);
export const NotificationManagement = Loader(
  lazy(() => import('../admin/content/applications/NotificationManagement')),
);
export const BookmarkManagement = Loader(lazy(() => import('../admin/content/applications/BookmarkManagement')));
export const ArticleManagement = Loader(lazy(() => import('../admin/content/applications/ArticleManagement')));
export const AddArticle = Loader(
  lazy(() => import('../admin/content/applications/ArticleManagement/feature/CreateArticle')),
);
export const UpdateArticle = Loader(
  lazy(() => import('../admin/content/applications/ArticleManagement/feature/UpdateArticle')),
);
export const UserProfile = Loader(lazy(() => import('../admin/content/applications/Users/profile')));
export const UserSettings = Loader(lazy(() => import('../admin/content/applications/Users/settings')));

// Components

export const Buttons = Loader(lazy(() => import('../admin/content/pages/Components/Buttons')));
export const Modals = Loader(lazy(() => import('../admin/content/pages/Components/Modals')));
export const Accordions = Loader(lazy(() => import('../admin/content/pages/Components/Accordions')));
export const Tabs = Loader(lazy(() => import('../admin/content/pages/Components/Tabs')));
export const Badges = Loader(lazy(() => import('../admin/content/pages/Components/Badges')));
export const Tooltips = Loader(lazy(() => import('../admin/content/pages/Components/Tooltips')));
export const Avatars = Loader(lazy(() => import('../admin/content/pages/Components/Avatars')));
export const Cards = Loader(lazy(() => import('../admin/content/pages/Components/Cards')));
export const Forms = Loader(lazy(() => import('../admin/content/pages/Components/Forms')));

// Status

export const Status404 = Loader(lazy(() => import('../admin/content/pages/Status/Status404')));
export const Status500 = Loader(lazy(() => import('../admin/content/pages/Status/Status500')));
export const StatusComingSoon = Loader(lazy(() => import('../admin/content/pages/Status/ComingSoon')));
export const StatusMaintenance = Loader(lazy(() => import('../admin/content/pages/Status/Maintenance')));

// const routes: RouteObject[] = [
//   {
//     path: '',
//     element: <BaseLayout />,
//     children: [
//       {
//         path: '/',
//         element: <Overview />,
//       },
//       {
//         path: 'overview',
//         element: <Navigate to="/" replace />,
//       },
//       {
//         path: 'status',
//         children: [
//           {
//             path: '',
//             element: <Navigate to="404" replace />,
//           },
//           {
//             path: '404',
//             element: <Status404 />,
//           },
//           {
//             path: '500',
//             element: <Status500 />,
//           },
//           {
//             path: 'maintenance',
//             element: <StatusMaintenance />,
//           },
//           {
//             path: 'coming-soon',
//             element: <StatusComingSoon />,
//           },
//         ],
//       },
//       {
//         path: '*',
//         element: <Status404 />,
//       },
//     ],
//   },
//   {
//     path: 'dashboards',
//     element: <SidebarLayout />,
//     children: [
//       {
//         path: '',
//         element: <Navigate to="crypto" replace />,
//       },
//       {
//         path: 'crypto',
//         element: <Crypto />,
//       },
//       {
//         path: 'messenger',
//         element: <Messenger />,
//       },
//     ],
//   },
//   {
//     path: 'management',
//     element: <SidebarLayout />,
//     children: [
//       {
//         path: '',
//         element: <Navigate to="transactions" replace />,
//       },
//       {
//         path: 'transactions',
//         element: <Transactions />,
//       },
//       {
//         path: 'profile',
//         children: [
//           {
//             path: '',
//             element: <Navigate to="details" replace />,
//           },
//           {
//             path: 'details',
//             element: <UserProfile />,
//           },
//           {
//             path: 'settings',
//             element: <UserSettings />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/components',
//     element: <SidebarLayout />,
//     children: [
//       {
//         path: '',
//         element: <Navigate to="buttons" replace />,
//       },
//       {
//         path: 'buttons',
//         element: <Buttons />,
//       },
//       {
//         path: 'modals',
//         element: <Modals />,
//       },
//       {
//         path: 'accordions',
//         element: <Accordions />,
//       },
//       {
//         path: 'tabs',
//         element: <Tabs />,
//       },
//       {
//         path: 'badges',
//         element: <Badges />,
//       },
//       {
//         path: 'tooltips',
//         element: <Tooltips />,
//       },
//       {
//         path: 'avatars',
//         element: <Avatars />,
//       },
//       {
//         path: 'cards',
//         element: <Cards />,
//       },
//       {
//         path: 'forms',
//         element: <Forms />,
//       },
//     ],
//   },
// ];

// export default routes;
