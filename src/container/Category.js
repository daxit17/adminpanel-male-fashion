import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AddCategory, DeleteCategory, GetCategory, UpdateCategory } from '../Redux/Actions/Category_Actions';
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';
import { useState } from "react"

export default function Category() {
    const [open, setOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    let dispatch = useDispatch();

    const category = useSelector(state => state.category);

    const [dopen, setdOpen] = React.useState(false);

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handledClickOpen = () => {
        setdOpen(true);
    };

    const handledClose = () => {
        setdOpen(false);
        formik.resetForm();
        setUpdate(false);
    };

    // handleInsert

    const handleInsert = (values) => {

        dispatch(AddCategory(values));

        handleClose();
    }

    // handleDelete

    const handleDelete = (params) => {

        dispatch(DeleteCategory(did));

        handledClose();
    }

    // handleEdit

    const handleEdit = (params) => {

        handleClickOpen();

        setUpdate(true);

        formik.setValues(params.row)
    }

    const handleUpdate = (values) => {

        dispatch(UpdateCategory(values));

        handleClose();

    }

    // Schema

    let schema = yup.object().shape({
        name: yup.string().min(2).max(25).required("Please enter your name..."),
        profile_img: yup.mixed().required("Please select profile image...")
    });

    // Formik

    const formik = useFormik({
        initialValues: {
            name: '',
            profile_img: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdate(values);
            } else {
                handleInsert(values);
            }
        },
    });

    let { handleBlur, handleChange, handleSubmit, errors, touched, values, setFieldValue } = formik;

    // Table columns

    const columns = [
        { field: 'name', headerName: 'NAME', width: 400 },
        {
            field: 'profile_img',
            headerName: 'PROFILE-IMG',
            width: 400,
            renderCell: (params) => (
                <img src={params.row.profile_img} width={50} height={50} />
            )
        },
        {
            field: 'action',
            headerName: 'ACTION',
            width: 400,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => { handledClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => { handleEdit(params) }}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        },
        
    ];

    // Table Rows

    useEffect(() => {
        dispatch(GetCategory());
    }, [])

    return (
        <div>
            <Button variant="outlined" onClick={() => handleClickOpen()}>
                Add Category
            </Button>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={category.category}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>

            <Dialog
                open={dopen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handledClose}
                fullWidth
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure to delete?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handledClose}>NO</Button>
                    <Button onClick={() => handleDelete()}>YES</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Add Category</DialogTitle>
                <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="name"
                                id="name"
                                label="Enter Category Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : null}

                            <input
                                name="profile_img"
                                id="profile_img"
                                type="file"
                                onChange={(e) => setFieldValue("profile_img", e.target.files[0])}
                            />
                            {errors.profile_img && touched.profile_img ? <p>{errors.profile_img}</p> : null}

                            <DialogActions>
                                <Button onClick={handleClose}>No</Button>
                                <Button type='submit'>Yes</Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}
