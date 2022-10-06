import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { AddProductsData, DeleteProductsData, GetProductsData, ProductsActions, UpdateProductsData } from '../../Redux/Actions/Product_Actions';

export default function Products() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [dopen, setdOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);
    const [filterdata, setFilterData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
        setUpdate(false)
    };

    const handleDClickOpen = () => {
        setdOpen(true);
    };

    const handleDClose = () => {
        setdOpen(false);
    };

    const products = useSelector(state => state.products)

    // schema (Yup)

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name..."),
        price: yup.number().required("Please Enter price...").positive().integer(),
        quantity: yup.number().required("Please Enter quantity...").positive().integer(),
        warrenty: yup.number().required("Please Enter warrenty...").positive().integer(),
    });

    // formik (Formik)

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            warrenty: '',
        },
        validationSchema: schema,
        onSubmit: (values, action) => {
            if (update) {
                updatedata(values);
            } else {
                handleInsert(values);
            }
            handleClose();
            localdata();
        },
    });

    let dispatch = useDispatch();

    // handleInsert

    const handleInsert = (values) => {

        // let localData = JSON.parse(localStorage.getItem("products"));

        // let id = Math.floor(Math.random() * 1000);

        // let data = {
        //     id: id,
        //     ...values
        // }

        // if (localData === null) {
        //     localStorage.setItem("products", JSON.stringify([data]));
        // } else {
        //     localData.push(data);
        //     localStorage.setItem("products", JSON.stringify(localData));
        // }

        dispatch(AddProductsData(values));

        LoadData();
        handleClose();
        formik.resetForm();
    }

    // Table Columns

    const columns = [
        { field: 'name', headerName: 'NAME', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'quantity', headerName: 'Wuantity', width: 200 },
        { field: 'warrenty', headerName: 'Warrenty', width: 200 },
        {
            field: 'action',
            headerName: 'ACTION',
            width: 200,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    // Table Rows

    const LoadData = () => {

        let localData = JSON.parse(localStorage.getItem("products"));

        if (localData !== null) {
            setData(localData);
        }

    }

    useEffect(() => {
        dispatch(GetProductsData());
        // LoadData();
    }, []);

    // handleDelete

    const handleDelete = () => {

        // let localData = JSON.parse(localStorage.getItem("products"));

        // let fData = localData.filter((l) => l.id !== did);

        // localStorage.setItem("products", JSON.stringify(fData));

        dispatch(DeleteProductsData(did));

        handleDClose();
        LoadData();
    }

    // handleEdit
    const handleEdit = (params) => {
        handleClickOpen();
        setUpdate(true);
        formik.setValues(params.row);
    }

    // localdata

    const localdata = () => {
        const datap = JSON.parse(localStorage.getItem("products"));
        if (datap !== null) {
            setData(datap);
        }
    }

    // updatedata

    const updatedata = (values) => {


        // const upddata = JSON.parse(localStorage.getItem("products"))

        // const newdata = upddata.map((m) => {
        //     if (m.id === values.id) {
        //         return values;
        //     } else {
        //         return m;
        //     }
        // });

        // localStorage.setItem("products", JSON.stringify(newdata));

        dispatch(UpdateProductsData(values))

        handleClose();
        localdata();
        setUpdate(false);
    }

    // handleSearch

    const handleSearch = (val) => {

        let localData = JSON.parse(localStorage.getItem("products"));

        let fdata = localData.filter((d) => (
            d.name.toLowerCase(val).includes(val.toLowerCase()) ||
            d.price.toString().includes(val) ||
            d.quantity.toString().includes(val) ||
            d.warrenty.toString().includes(val)
        ))

        setFilterData(fdata);

    }

    const finalData = filterdata.length > 0 ? filterdata : data;

    const { handleBlur, handleChange, handleSubmit, touched, errors, values } = formik;

    return (
        <div>
            <h1 className='Mt-100'>Products</h1>

            <Button variant="outlined" onClick={handleClickOpen}>
                Add Products Data
            </Button>

            <TextField
                margin="dense"
                name="search"
                label="Search"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleSearch(e.target.value)}
            />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={products.products}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    className='Mt-100'
                />
            </div>

            <Dialog
                open={dopen}
                onClose={handleDClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure To Delete ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>
                    {
                        (update) ?
                            <p> Update Data </p>
                            :
                            <p>Add Products Data</p>
                    }

                </DialogTitle>
                <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
                                margin="dense"
                                name="name"
                                label="Enter Product Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p className='Err'> {errors.name} </p> : ''}
                            <TextField
                                value={values.price}
                                margin="dense"
                                name="price"
                                label="Enter Product Price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.price && touched.price ? <p className='Err'> {errors.price} </p> : ''}
                            <TextField
                                value={values.quantity}
                                margin="dense"
                                name="quantity"
                                label="Enter Product Quantity"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.quantity && touched.quantity ? <p className='Err'> {errors.quantity} </p> : ''}
                            <TextField
                                value={values.warrenty}
                                margin="dense"
                                name="warrenty"
                                label="Enter Product warrenty"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.warrenty && touched.warrenty ? <p className='Err'> {errors.warrenty} </p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                    (update) ?
                                        <Button type='submit'>Update</Button>
                                        :
                                        <Button type='submit'>Submit</Button>
                                }
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}
