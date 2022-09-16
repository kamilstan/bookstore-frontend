import {Grid, Paper, Avatar, TextField, Button, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import './LoginBox.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAccessToken, setExpirationTime, setId, setRole} from "../../redux-toolkit/features/user/user-slice";
import {SubmitHandler} from "react-hook-form";
import jwtDecode from "jwt-decode";
import {StoreState} from "../../redux-toolkit/store";
import {SyntheticEvent, useEffect, useState} from "react";


interface FormValues {
    email: string;
    password: string;
}

interface AccessToken {
    name: string;
    exp: number;
}

export const LoginBox = () => {

    const { role } = useSelector((store: StoreState) => store.user);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<FormValues>({
        email: '',
        password: '',
    });

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const submitForm = async (e:SyntheticEvent) => {

        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:8080/api/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const result = await res.json();
            if (result.accessToken) {
                const decoded = jwtDecode<AccessToken>(result.accessToken);
                dispatch(setId(result.id));
                dispatch(setAccessToken(result.accessToken));
                dispatch(setExpirationTime(decoded.exp));
                dispatch(setRole(result.role));
            }


            switch (result.role) {
                case 'admin':
                    navigate(`/admin/${result.id}`);
                    break;
                case 'customer':
                    navigate(`/customer/${result.id}`);
                    break;
            }
        } catch (err) {
            console.log(err, 'cos tu nie dziala');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role !== '') {
            switch (role) {
                case 'admin':
                    navigate(`/admin/books`);
                    break;
                case 'customer':
                    navigate(`/customer`);
                    break;
            }
        }
    });
    if (loading) {
        return <p>Wczytywanie danych...</p>
    }

    const paperStyle={padding:20, height: '70vh', width:280, margin:'20px auto'};
    const avatarStyle={backgroundColor: 'green', margin: '0 auto 10px'};


    return (
        <Grid>
           <Paper elevation={5} style={paperStyle}>
               <Grid style={{textAlign: 'center'}} >
                   <Avatar style={avatarStyle}><LoginIcon/> </Avatar>
                   <h2 style={{margin: '10px 0 30px'}}>Sign in</h2>
               </Grid>
               <form onSubmit={submitForm}>
               <TextField
                   label='Email'
                   placeholder='Enter email'
                   style={{margin:'10px 0'}}
                   fullWidth
                   required
                   name='email'
                   value={form.email}
                   onChange={e => updateForm('email', e.target.value)}
               />
               <TextField
                   label='Password'
                   placeholder='Enter password'
                   style={{margin:'10px 0'}}
                   type='password'
                   fullWidth
                   required
                   name='password'
                   value={form.password}
                   onChange={e => updateForm('password', e.target.value)}
               />
               <Button type='submit' style={{margin:'10px 0'}} color='primary' variant='contained' fullWidth>Sign in</Button>
               </form>
               <Typography>
                   <Link to='#'>
                      Forgot password ?
                   </Link>
               </Typography>
               <Typography> Do you have an account ?
                   <Link to={'/register'}>
                       Sign up
                   </Link>
               </Typography>
           </Paper>
        </Grid>
    )
}