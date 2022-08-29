import React, { useEffect, useMemo, useState } from "react";
import { productStyle } from "./style";
import { defaultFilter, RecordsPerPage } from "../../constant/constant";
import { useHistory } from "react-router-dom";
import {
    Typography,
    TextField,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import bookService from "../../service/book.service";
import { toast } from "react-toastify";
import categoryService from "../../service/category.service";
import FilterModel from "../../models/FilterModel";
import BaseList from "../../models/BaseList";
import UserModel from "../../models/UserModel";
import { CategoryModel } from "../../models/CategoryModel";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import Shared from "../../utils/shared";
import userService from "../../service/user.service";

const Book: React.FC = () => {
    const classes = productStyle();
    const [filters, setFilters] = useState<FilterModel>(defaultFilter);
    const [userRecords, setUserRecords] = useState<BaseList<UserModel[]>>({
        results: [],
        totalRecords: 0,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);

    const [roles, setRoles] = useState<CategoryModel[]>([]);

    useEffect(() => {
        getAllRole();
    }, []);

    const getAllRole = async (): Promise<void> => {
        await userService.getAllRoles().then((res) => {
            if (res) {
                setRoles(res.results);
            }
        });
    };

    const books: UserModel[] = useMemo((): UserModel[] => {
        if (userRecords?.results) {
            userRecords?.results.forEach((element: UserModel) => {
                element.role = roles.find(
                    (a) => a.id === element.roleid
                )?.name;
            });
            return userRecords.results;
        }
        return [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roles, userRecords]);

    const history = useHistory();
    useEffect(() => {
        const timer: NodeJS.Timeout = setTimeout(() => {
            if (filters.keyword === "") delete filters.keyword
            searchAllUsers({ ...filters });
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    const searchAllUsers = (filters: FilterModel): void => {
        userService.getAllUsers(filters).then((res) => {
            setUserRecords(res);
        });
    };

    const columns = [
        { id: "firstname", label: "First Name", minWidth: 100 },
        { id: "lastname", label: "Last Name", minWidth: 100 },
        { id: "email", label: "Email", minWidth: 100 },
        { id: "role", label: "Role", minWidth: 100 },
    ];

    const onConfirmDelete = (): void => {
        userService.delete(selectedId).then((res) => {
            toast.success(Shared.messages.DELETE_SUCCESS);
            setOpen(false);
            setFilters({ ...filters, pageIndex: 1 });
        }).catch(e => toast.error(Shared.messages.DELETE_FAIL));
    };
    return (
        <div className={classes.productWrapper}>
            <div className="container">
                <Typography variant="h1">User Page</Typography>
                <div className="btn-wrapper">
                    <TextField
                        id="text"
                        name="text"
                        placeholder="Search..."
                        variant="outlined"
                        inputProps={{ className: "small" }}
                        onChange={(e) => {
                            setFilters({ ...filters, keyword: e.target.value, pageIndex: 1 });
                        }}
                    />
                    <Button
                        type="button"
                        className="btn pink-btn"
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => history.push("/register")}
                    >
                        Add
                    </Button>
                </div>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books?.map((row: UserModel, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.firstname}</TableCell>
                                    <TableCell>{row.lastname}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            className="btn pink-btn"
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            onClick={() => {
                                                setOpen(true);
                                                setSelectedId(row.id ?? 0);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!userRecords?.results.length && (
                                <TableRow className="TableRow">
                                    <TableCell colSpan={5} className="TableCell">
                                        <Typography align="center" className="noDataText">
                                            No Users
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={RecordsPerPage}
                    component="div"
                    count={userRecords?.results.length ? userRecords.totalRecords : 0}
                    rowsPerPage={filters.pageSize || 0}
                    page={filters.pageIndex - 1}
                    onPageChange={(e, newPage) => {
                        setFilters({ ...filters, pageIndex: newPage + 1 });
                    }}
                    onRowsPerPageChange={(e) => {
                        setFilters({
                            ...filters,
                            pageIndex: 1,
                            pageSize: Number(e.target.value),
                        });
                    }}
                />
                <ConfirmationDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onConfirm={() => onConfirmDelete()}
                    title="Delete book"
                    description="Are you sure you want to delete this book?"
                />
            </div>
        </div>
    );
};

export default Book;
