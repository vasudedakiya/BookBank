import React, { useEffect, useState } from "react";
import { editStyle } from "./style";
import * as Yup from "yup";
import {
    Typography,
    TextField,
    Button,
    Input,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import bookService from "../../../service/book.service";
import { Formik } from "formik";
import ValidationErrorMessage from "../../../components/ValidationErrorMessage/index";
import { toast } from "react-toastify";
import { materialCommonStyles } from "../../../utils/materialCommonStyles";
import categoryService from "../../../service/category.service";
import { BookModel } from "../../../models/BookModel";
import { CategoryModel } from "../../../models/CategoryModel";
import Shared from "../../../utils/shared";

const EditCategory: React.FC = () => {
    const materialClasses = materialCommonStyles();
    const classes = editStyle();
    const history = useHistory();
    const initialValues: CategoryModel = {
        name: "",
    };
    const [initialValueState, setInitialValueState] = useState<CategoryModel>(initialValues);
    const { id } = useParams<{ id?: string }>();

    useEffect(() => {
        if (id) getCategoryById();
    }, [id]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Category Name is required"),
    });

    const getCategoryById = (): void => {
        categoryService.getById(Number(id)).then((res) => {
            setInitialValueState({
                id: res.id,
                name: res.name,
            });
        });
    };

    const onSubmit = (values: CategoryModel): void => {
        categoryService.save(values).then((res) => {
            toast.success(
                values.id
                    ? Shared.messages.UPDATED_SUCCESS
                    : "Record created successfully"
            );
            history.push("/category");
        })
            .catch((e) => toast.error(Shared.messages.UPDATED_FAIL));
    };

    return (
        <div className={classes.editWrapper}>
            <div className="container">

                <Typography variant="h1">{id ? "Edit" : "Add"} Category</Typography>
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
                            <div className="form-row-wrapper">
                                <div className="form-col">
                                    <TextField
                                        id="first-name"
                                        name="name"
                                        label="Book Name *"
                                        variant="outlined"
                                        inputProps={{ className: "small" }}
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <ValidationErrorMessage
                                        message={errors.name}
                                        touched={touched.name}
                                    />
                                </div>
                            </div>
                            <div className="btn-wrapper">
                                <Button
                                    className="green-btn btn"
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disableElevation
                                >
                                    Save
                                </Button>
                                <Button
                                    className="pink-btn btn"
                                    variant="contained"
                                    type="button"
                                    color="primary"
                                    disableElevation
                                    onClick={() => {
                                        history.push("/category");
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditCategory;
