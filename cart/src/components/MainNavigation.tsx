import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import BookList from "../pages/book-listing";
import Category from "../pages/Category";
import EditCategory from "../pages/Category/editCategory";
import EditBook from "../pages/book/editBook";
import Cart from "../pages/cart";
import Users from "../pages/Users";
import UpdateProfile from "../pages/UpdateProfile";
import { RoutePaths } from "../utils/enum";
import PrivateRoute from "./PrivateRoute";

//component lazy loading
const Login = lazy(() => import("../pages/login/index"));
const Register = lazy(() => import("../pages/register/index"));
const Book = lazy(() => import("../pages/book"));

const AppRoutes: React.FC = () => {
	return (
		<Switch>
			<Route exact path={RoutePaths.Login} component={Login} />
			<Route exact path={RoutePaths.Register} component={Register} />
			<Route exact path={RoutePaths.BookListing} component={BookList} />
			<PrivateRoute exact path={RoutePaths.Book} component={Book} />
			<PrivateRoute exact path={RoutePaths.AddBook} component={EditBook} />
			<PrivateRoute exact path={RoutePaths.EditBook} component={EditBook} />
			<PrivateRoute exact path={RoutePaths.Category} component={Category} />
			<PrivateRoute exact path={RoutePaths.AddCategory} component={EditCategory} />
			<PrivateRoute exact path={RoutePaths.EditCategory} component={EditCategory} />
			<PrivateRoute exact path={RoutePaths.Cart} component={Cart} />
			<PrivateRoute exact path={RoutePaths.UpdateProfile} component={UpdateProfile} />
			<PrivateRoute exact path={RoutePaths.User} component={Users} />
		</Switch>
	);
};

export default AppRoutes;
