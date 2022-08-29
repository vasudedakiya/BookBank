import React, { useEffect, useState } from "react";
import { updateAccountStyle } from "./style";
import {
    Breadcrumbs,
    Link,
    Typography,
    List,
    ListItem,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/index";
import authService from "../../service/auth.service";
import { StatusCode } from "../../constant/constant";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Role } from "../../utils/enum";
import RoleModel from "../../models/RoleModel";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import BaseList from "../../models/BaseList";
import userService from "../../service/user.service";
import { AuthContextModel, useAuthContext } from "../../context/auth";
import { AddOrEditUserModel, UpdateProfileModel } from "../../models/UserModel";

const UpdateProfile: React.FC = () => {
    const authContext: AuthContextModel = useAuthContext();
    const classes = updateAccountStyle();
    const materialClasses = materialCommonStyles();
    const history = useHistory();
    const [roleList, setRoleList] = useState<RoleModel[]>([]);
    const initialValues: AddOrEditUserModel = {
        id: 0,
        email: "",
        firstname: "",
        lastname: "",
        roleid: 0,
        password: "",
    };
    const [initialValueState, setInitialValueState] =
        useState<AddOrEditUserModel>(initialValues);

    useEffect(() => {

        getRoles();
        if (authContext.user.id) getUserById();


    }, []);

    const getUserById = (): void => {
        userService.getById(Number(authContext.user.id)).then((res) => {
            setInitialValueState({
                id: res.id,
                email: res.email,
                firstname: res.firstname,
                lastname: res.lastname,
                roleid: res.roleid,
                password: res.password,

            });
        });
    }

    const getRoles = (): void => {
        userService.getAllRoles().then((res: BaseList<RoleModel[]>) => {
            if (res.results.length) {
                setRoleList(
                    res.results.filter((role: RoleModel) => role.id !== Role.Admin)
                );
            }
        });
    };



    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(5, "Password must be 5 characters at minimum")
            .required("Password is required"),
        firstname: Yup.string().required("First name is required"),
        lastname: Yup.string().required("Last name is required"),
        roleid: Yup.number().required("Role is required"),
    });

    const onSubmit = (values: AddOrEditUserModel): void => {
        userService.update(values).then((res) => {
            toast.success("Successfully Updated");
            history.push("/")
        });
    };
    return (
        <div className={classes.updateAccountWrapper}>
            <div className="create-account-page-wrapper">
                <div className="container">
                    <Breadcrumbs
                        separator="›"
                        aria-label="breadcrumb"
                        className="breadcrumb-wrapper"
                    >
                        <Link color="inherit" href="/" title="Home">
                            Home
                        </Link>
                        <Typography color="textPrimary">Update an Account</Typography>
                    </Breadcrumbs>

                    <Typography variant="h1">Update an Account</Typography>
                    <div className="create-account-row">
                        <Formik
                            initialValues={initialValueState}
                            validationSchema={validationSchema}
                            enableReinitialize={true}
                            onSubmit={onSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                setValues,
                                setFieldError,
                                setFieldValue,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-block">
                                        <div className="personal-information">
                                            <Typography variant="h2">Personal Information</Typography>
                                            <div className="form-row-wrapper">
                                                <div className="form-col">
                                                    <TextField
                                                        id="first-name"
                                                        name="firstname"
                                                        label="First Name *"
                                                        variant="outlined"
                                                        value={values.firstname}
                                                        inputProps={{ className: "small" }}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <ValidationErrorMessage
                                                        message={errors.firstname}
                                                        touched={touched.firstname}
                                                    />
                                                </div>
                                                <div className="form-col">
                                                    <TextField
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        id="last-name"
                                                        name="lastname"
                                                        label="Last Name *"
                                                        variant="outlined"
                                                        value={values.lastname}
                                                        inputProps={{ className: "small" }}
                                                    />
                                                    <ValidationErrorMessage
                                                        message={errors.lastname}
                                                        touched={touched.lastname}
                                                    />
                                                </div>
                                                <div className="form-col">
                                                    <TextField
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        id="email"
                                                        name="email"
                                                        label="Email Address *"
                                                        variant="outlined"
                                                        value={values.email}
                                                        inputProps={{ className: "small" }}
                                                    />
                                                    <ValidationErrorMessage
                                                        message={errors.email}
                                                        touched={touched.email}
                                                    />
                                                </div>
                                                <div className="form-col">
                                                    <FormControl
                                                        className="dropdown-wrapper"
                                                        variant="outlined"
                                                    >
                                                        <InputLabel htmlFor="select">Roles</InputLabel>
                                                        <Select
                                                            name="roleid"
                                                            id={"roleId"}
                                                            value={values.roleid}
                                                            inputProps={{ className: "small" }}
                                                            onChange={handleChange}
                                                            className={materialClasses.customSelect}
                                                            MenuProps={{
                                                                classes: {
                                                                    paper: materialClasses.customSelect,
                                                                },
                                                            }}
                                                        >
                                                            {roleList.length > 0 &&
                                                                roleList.map((role: RoleModel) => (
                                                                    <MenuItem
                                                                        value={role.id}
                                                                        key={"name" + role.id}
                                                                    >
                                                                        {role.name}
                                                                    </MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row-wrapper">
                                            <div className="form-col">
                                                <TextField
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    label="Password *"
                                                    variant="outlined"
                                                    value={values.password}
                                                    inputProps={{ className: "small" }}
                                                />
                                                <ValidationErrorMessage
                                                    message={errors.password}
                                                    touched={touched.password}
                                                />
                                            </div>
                                        </div>
                                        <div className="btn-wrapper">
                                            <Button
                                                className="pink-btn btn"
                                                variant="contained"
                                                type="submit"
                                                color="primary"
                                                disableElevation
                                            >
                                                Save
                                            </Button>&nbsp;&nbsp;&nbsp;
                                            {/* <Button
                                                    className="pink-btn btn"
                                                    variant="contained"
                                                    type="button"
                                                    color="primary"
                                                    disableElevation
                                                    onClick={() => {
                                                        history.push("/");
                                                    }}
                                                >
                                                    Cancel
                                                </Button> */}
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
