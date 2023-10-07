//Pages
import config from '../config';
import DefaultLayout from '../layout/DefaultLayout/DefaultLayout';
import ArticleComp from '../pages/Article/ArticleComp';
import CategoryComp from '../pages/Category/Category';
import CategoryDetail from '../pages/CategoryDetail/CategoryDetail';
import Home from '../pages/Home/Home';
import BookmarkComp from '../pages/BookmarkComp/BookmarkComp';
import AuthorRequest from '../pages/Author/AuthorRequest';
import Tag from '../pages/Tag/Tag';
import {
  Accordions,
  AddArticle,
  AddCategory,
  AddPermission,
  AddTag,
  ArticleManagement,
  AuthorsManagement,
  Avatars,
  Badges,
  BookmarkManagement,
  Buttons,
  Cards,
  CategoriesManagement,
  Crypto,
  Forms,
  Messenger,
  Modals,
  NotificationManagement,
  PermissionManagement,
  Tabs,
  TagsManagement,
  Tooltips,
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
import SidebarLayout from '../admin/layouts/SidebarLayout';
//Public routes
const publicRoutes: any = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.article, component: ArticleComp, layout: DefaultLayout },
  { path: config.routes.category, component: CategoryComp, layout: DefaultLayout },
  { path: config.routes.categoryDetail, component: CategoryDetail, layout: DefaultLayout },
  { path: config.routes.bookmark, component: BookmarkComp, layout: DefaultLayout },
  { path: config.routes.requestAuthor, component: AuthorRequest, layout: DefaultLayout },
  { path: config.routes.tagDetail, component: Tag, layout: DefaultLayout },
];

const privateRoutes = [
  { path: config.routes.dashboard, component: Crypto, layout: SidebarLayout },
  { path: config.routes.messenger, component: Messenger, layout: SidebarLayout },
  { path: config.routes.managementArticles, component: ArticleManagement, layout: SidebarLayout },
  { path: config.routes.addArticle, component: AddArticle, layout: SidebarLayout },
  { path: config.routes.updateArticle, component: UpdateArticle, layout: SidebarLayout },
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
  { path: config.routes.componentsButtons, component: Buttons, layout: SidebarLayout },
  { path: config.routes.componentModals, component: Modals, layout: SidebarLayout },
  { path: config.routes.componentAccordions, component: Accordions, layout: SidebarLayout },
  { path: config.routes.componentsTabs, component: Tabs, layout: SidebarLayout },
  { path: config.routes.componentsBadges, component: Badges, layout: SidebarLayout },
  { path: config.routes.componentsTooltips, component: Tooltips, layout: SidebarLayout },
  { path: config.routes.componentsAvatars, component: Avatars, layout: SidebarLayout },
  { path: config.routes.componentsCards, component: Cards, layout: SidebarLayout },
  { path: config.routes.componentsForms, component: Forms, layout: SidebarLayout },
];

export { publicRoutes, privateRoutes };
