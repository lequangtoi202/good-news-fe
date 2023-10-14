import { Suspense, lazy } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

export const Overview = Loader(lazy(() => import('./content/dashboards/Overview')));

// Applications

export const Messenger = Loader(lazy(() => import('../admin/content/applications/Messenger')));
export const UsersManagement = Loader(lazy(() => import('../admin/content/applications/UserManagement')));
export const UpdateUser = Loader(lazy(() => import('../admin/content/applications/UserManagement/feature/UpdateUser')));

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
export const CrawlData = Loader(
  lazy(() => import('../admin/content/applications/ArticleManagement/feature/CrawlData')),
);
export const UserProfile = Loader(lazy(() => import('../admin/content/applications/Users/profile')));
export const UserSettings = Loader(lazy(() => import('../admin/content/applications/Users/settings')));

// Components
