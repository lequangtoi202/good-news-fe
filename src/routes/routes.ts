//Pages
import SidebarLayout from '../admin/layouts/SidebarLayout';
import {
  AddArticle,
  AddCategory,
  AddPermission,
  AddTag,
  ArticleManagement,
  AuthorsManagement,
  BookmarkManagement,
  CategoriesManagement,
  CrawlData,
  Messenger,
  NotificationManagement,
  Overview,
  PermissionManagement,
  TagsManagement,
  UpdateArticle,
  UpdateAuthor,
  UpdateCategory,
  UpdatePermission,
  UpdateTag,
  UpdateUser,
  UserProfile,
  UserSettings,
  UsersManagement,
} from '../admin/router';
import config from '../config';
import DefaultLayout from '../layout/DefaultLayout/DefaultLayout';
import ArticleComp from '../pages/Article/ArticleComp';
import AuthorRequest from '../pages/Author/AuthorRequest';
import BookmarkComp from '../pages/BookmarkComp/BookmarkComp';
import CategoryComp from '../pages/Category/Category';
import CategoryDetail from '../pages/CategoryDetail/CategoryDetail';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Home from '../pages/Home/Home';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Tag from '../pages/Tag/Tag';
//Public routes
const publicRoutes: any = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.article, component: ArticleComp, layout: DefaultLayout },
  { path: config.routes.category, component: CategoryComp, layout: DefaultLayout },
  { path: config.routes.categoryDetail, component: CategoryDetail, layout: DefaultLayout },
  { path: config.routes.bookmark, component: BookmarkComp, layout: DefaultLayout },
  { path: config.routes.requestAuthor, component: AuthorRequest, layout: DefaultLayout },
  { path: config.routes.tagDetail, component: Tag, layout: DefaultLayout },
  { path: config.routes.forgotPassword, component: ForgotPassword, layout: DefaultLayout },
  { path: config.routes.resetPassword, component: ResetPassword, layout: DefaultLayout },
];

const privateRoutes = [
  { path: config.routes.dashboard, component: Overview, layout: SidebarLayout },
  { path: config.routes.messenger, component: Messenger, layout: SidebarLayout },
  { path: config.routes.managementArticles, component: ArticleManagement, layout: SidebarLayout },
  { path: config.routes.addArticle, component: AddArticle, layout: SidebarLayout },
  { path: config.routes.updateArticle, component: UpdateArticle, layout: SidebarLayout },
  { path: config.routes.crawlData, component: CrawlData, layout: SidebarLayout },
  { path: config.routes.managementUsers, component: UsersManagement, layout: SidebarLayout },
  { path: config.routes.updateUser, component: UpdateUser, layout: SidebarLayout },
  { path: config.routes.managementAuthors, component: AuthorsManagement, layout: SidebarLayout },
  { path: config.routes.updateAuthor, component: UpdateAuthor, layout: SidebarLayout },
  { path: config.routes.managementCategories, component: CategoriesManagement, layout: SidebarLayout },
  { path: config.routes.addCategory, component: AddCategory, layout: SidebarLayout },
  { path: config.routes.updateCategory, component: UpdateCategory, layout: SidebarLayout },
  { path: config.routes.managementTags, component: TagsManagement, layout: SidebarLayout },
  { path: config.routes.addTag, component: AddTag, layout: SidebarLayout },
  { path: config.routes.updateTag, component: UpdateTag, layout: SidebarLayout },
  { path: config.routes.managementPermissions, component: PermissionManagement, layout: SidebarLayout },
  { path: config.routes.addPermission, component: AddPermission, layout: SidebarLayout },
  { path: config.routes.updatePermission, component: UpdatePermission, layout: SidebarLayout },
  { path: config.routes.managementBookmarks, component: BookmarkManagement, layout: SidebarLayout },
  { path: config.routes.managementNotification, component: NotificationManagement, layout: SidebarLayout },
  { path: config.routes.profileDetails, component: UserProfile, layout: SidebarLayout },
  { path: config.routes.profileSettings, component: UserSettings, layout: SidebarLayout },
];

export { privateRoutes, publicRoutes };
